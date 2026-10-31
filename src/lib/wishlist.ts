// Wishlist manager with custom event dispatching for real-time reactivity

const STORAGE_KEY = 'staynest_wishlist'
export const WISHLIST_CHANGE_EVENT = 'staynest_wishlist_change'

export function getWishlist(): string[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return []
    const parsed = JSON.parse(saved)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function isInWishlist(hotelId: string): boolean {
  const list = getWishlist()
  return list.includes(hotelId)
}

export function toggleWishlist(hotelId: string): boolean {
  const list = getWishlist()
  const exists = list.includes(hotelId)
  let updated: string[]

  if (exists) {
    updated = list.filter((id) => id !== hotelId)
  } else {
    updated = [...list, hotelId]
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch {
    // ignore quota errors
  }

  // Dispatch custom event to notify listeners (Navbar, Wishlist page, Cards)
  window.dispatchEvent(new CustomEvent(WISHLIST_CHANGE_EVENT, { detail: updated }))
  return !exists
}

