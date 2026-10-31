import { spawn } from 'node:child_process'
import { writeFileSync, mkdirSync, mkdtempSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const PORT = 9333
const OUT_DIR = 'e:\\Hotel Website\\qa_reports'
mkdirSync(OUT_DIR, { recursive: true })

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

class CDPClient {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl)
    this.id = 1
    this.callbacks = new Map()
    this.events = []
    this.consoleErrors = []
  }

  init() {
    return new Promise((resolve, reject) => {
      this.ws.onopen = () => resolve()
      this.ws.onerror = (e) => reject(e)
      this.ws.onmessage = (msg) => {
        const data = JSON.parse(msg.data)
        if (data.method === 'Runtime.consoleAPICalled') {
          if (data.params.type === 'error') {
            this.consoleErrors.push(data.params.args.map((a) => a.value || a.description).join(' '))
          }
        }
        if (data.id && this.callbacks.has(data.id)) {
          const cb = this.callbacks.get(data.id)
          this.callbacks.delete(data.id)
          if (data.error) cb.reject(data.error)
          else cb.resolve(data.result)
        }
      }
    })
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.id++
      this.callbacks.set(id, { resolve, reject })
      this.ws.send(JSON.stringify({ id, method, params }))
    })
  }

  close() {
    this.ws.close()
  }
}

async function runQA() {
  const tempProfile = mkdtempSync(join(tmpdir(), 'chrome_qa_'))
  console.log('Using temp profile:', tempProfile)
  console.log('Launching Chrome with remote debugging on port', PORT)

  const chrome = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${tempProfile}`,
  ])

  // Wait for port to open
  let targets = null
  for (let i = 0; i < 30; i++) {
    await sleep(400)
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/list`)
      targets = await res.json()
      if (targets && targets.length > 0) break
    } catch {}
  }

  if (!targets || targets.length === 0) {
    console.error('Failed to connect to Chrome target on port', PORT)
    chrome.kill()
    process.exit(1)
  }

  const pageTarget = targets.find((t) => t.type === 'page') || targets[0]
  console.log('Connected to target:', pageTarget.webSocketDebuggerUrl)

  const cdp = new CDPClient(pageTarget.webSocketDebuggerUrl)
  await cdp.init()

  await cdp.send('Page.enable')
  await cdp.send('Runtime.enable')

  const viewports = [
    { name: '1440px (Desktop)', width: 1440, height: 900 },
    { name: '1024px (Tablet Land / Small Desk)', width: 1024, height: 800 },
    { name: '768px (Tablet Port)', width: 768, height: 1024 },
    { name: '390px (Mobile)', width: 390, height: 844 },
  ]

  const pages = [
    { name: 'Home', url: 'http://localhost:5173/' },
    { name: 'Hotels', url: 'http://localhost:5173/hotels' },
    { name: 'HotelDetails', url: 'http://localhost:5173/hotels/aloha-on-the-ganges' },
  ]

  const auditReport = []

  for (const page of pages) {
    console.log(`\n================ Testing ${page.name} (${page.url}) ================`)
    await cdp.send('Page.navigate', { url: page.url })
    await sleep(1500) // Wait for render and images to load

    for (const vp of viewports) {
      console.log(`\n  Checking ${vp.name} [${vp.width}x${vp.height}]...`)
      await cdp.send('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.width < 768,
      })
      await sleep(500)

      // Scroll through page to trigger lazy loaded images
      await cdp.send('Runtime.evaluate', {
        expression: `(async () => {
          window.scrollTo(0, document.body.scrollHeight / 2);
          await new Promise(r => setTimeout(r, 200));
          window.scrollTo(0, document.body.scrollHeight);
          await new Promise(r => setTimeout(r, 200));
          window.scrollTo(0, 0);
          await new Promise(r => setTimeout(r, 200));
        })()`,
        awaitPromise: true,
      })

      // 1. Check Horizontal Scroll / Overflow
      const overflowEval = await cdp.send('Runtime.evaluate', {
        expression: `(() => {
          const docEl = document.documentElement;
          const body = document.body;
          const scrollW = Math.max(docEl.scrollWidth, body.scrollWidth);
          const clientW = window.innerWidth;
          const hasOverflow = scrollW > clientW + 1; // 1px margin
          
          let offendingElements = [];
          if (hasOverflow) {
            document.querySelectorAll('*').forEach(el => {
              const r = el.getBoundingClientRect();
              if (r.right > clientW + 1) {
                offendingElements.push({
                  tag: el.tagName,
                  className: el.className ? String(el.className).slice(0, 50) : '',
                  right: Math.round(r.right),
                  expectedMax: clientW
                });
              }
            });
          }
          return { hasOverflow, scrollW, clientW, offendingElements: offendingElements.slice(0, 5) };
        })()`,
        returnByValue: true,
      })

      // 2. Check Broken Images via fetch status
      const brokenImgEval = await cdp.send('Runtime.evaluate', {
        expression: `(async () => {
          const imgs = Array.from(document.querySelectorAll('img'));
          const broken = [];
          for (const img of imgs) {
            if (!img.src) {
              broken.push({ src: '', alt: img.alt || '', reason: 'Missing src attribute' });
              continue;
            }
            try {
              const res = await fetch(img.src, { method: 'HEAD' });
              if (!res.ok) {
                broken.push({ src: img.src.slice(-50), alt: img.alt || '', status: res.status });
              }
            } catch (err) {
              broken.push({ src: img.src.slice(-50), alt: img.alt || '', error: String(err) });
            }
          }
          return { total: imgs.length, broken };
        })()`,
        awaitPromise: true,
        returnByValue: true,
      })

      // 3. Check Price vs Button overlaps in cards
      const overlapEval = await cdp.send('Runtime.evaluate', {
        expression: `(() => {
          const results = [];
          const cards = document.querySelectorAll('article, .bg-white.rounded-2xl, .bg-white.rounded-xl');
          cards.forEach((card, idx) => {
            const priceEl = card.querySelector('div.text-xl, div.text-2xl, div.text-lg, span.text-xl, span.text-2xl, [class*="price"]');
            const buttonEl = card.querySelector('a, button');
            if (priceEl && buttonEl && priceEl !== buttonEl) {
              const r1 = priceEl.getBoundingClientRect();
              const r2 = buttonEl.getBoundingClientRect();
              const overlap = !(r1.right <= r2.left || r1.left >= r2.right || r1.bottom <= r2.top || r1.top >= r2.bottom);
              if (overlap && r1.width > 0 && r2.width > 0) {
                results.push({ cardIdx: idx, priceText: priceEl.textContent.trim().slice(0, 20), buttonText: buttonEl.textContent.trim().slice(0, 20) });
              }
            }
          });
          return results;
        })()`,
        returnByValue: true,
      })

      // Capture screenshot
      const shot = await cdp.send('Page.captureScreenshot', { format: 'png' })
      const shotFileName = `${page.name.toLowerCase()}-${vp.width}.png`
      writeFileSync(join(OUT_DIR, shotFileName), Buffer.from(shot.data, 'base64'))

      const vpResult = {
        page: page.name,
        viewport: vp.name,
        screenshot: shotFileName,
        overflow: overflowEval.result.value,
        brokenImages: brokenImgEval.result.value,
        overlaps: overlapEval.result.value,
        consoleErrors: [...cdp.consoleErrors],
      }
      auditReport.push(vpResult)

      console.log(`    - Screenshot saved: ${shotFileName}`)
      console.log(`    - Horizontal Overflow: ${vpResult.overflow.hasOverflow ? 'FAIL' : 'PASS'} (scrollWidth: ${vpResult.overflow.scrollW}px, window: ${vpResult.overflow.clientW}px)`)
      if (vpResult.overflow.hasOverflow) {
        console.log('      Offending elements:', vpResult.overflow.offendingElements)
      }
      console.log(`    - Broken Images: ${vpResult.brokenImages.broken.length}/${vpResult.brokenImages.total}`)
      console.log(`    - Price/Button Overlaps: ${vpResult.overlaps.length === 0 ? 'PASS (0)' : 'FAIL (' + vpResult.overlaps.length + ')'}`)
      console.log(`    - Console Errors: ${vpResult.consoleErrors.length}`)
    }
  }

  cdp.close()
  chrome.kill()

  writeFileSync(join(OUT_DIR, 'qa-summary.json'), JSON.stringify(auditReport, null, 2))
  console.log('\nQA Complete! Summary written to qa_reports/qa-summary.json')
}

runQA().catch((err) => {
  console.error('QA Error:', err)
  process.exit(1)
})
