import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { cn } from '../../lib/utils'

export interface SectionHeaderProps {
  title: string
  subtitle?: string
  tag?: string
  actionText?: string
  actionHref?: string
  onAction?: () => void
  align?: 'left' | 'center'
  className?: string
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  tag,
  actionText,
  actionHref,
  onAction,
  align = 'left',
  className,
}) => {
  const isCentered = align === 'center'

  const renderAction = () => {
    if (!actionText || (!actionHref && !onAction)) return null

    const content = (
      <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#1257D6] hover:text-[#0D47A1] transition-colors group cursor-pointer whitespace-nowrap">
        <span>{actionText}</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
      </span>
    )

    if (actionHref) {
      return (
        <Link to={actionHref} className="shrink-0 self-start sm:self-end">
          {content}
        </Link>
      )
    }

    return (
      <button
        type="button"
        onClick={onAction}
        className="shrink-0 self-start sm:self-end cursor-pointer"
      >
        {content}
      </button>
    )
  }

  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6',
        isCentered && 'sm:items-center text-center',
        className
      )}
    >
      <div className={cn('min-w-0', isCentered && 'mx-auto')}>
        {tag && (
          <p className="text-[12px] font-bold uppercase tracking-wider text-[#1257D6] mb-1">
            {tag}
          </p>
        )}
        <h2 className="text-[24px] sm:text-[28px] font-bold tracking-tight text-[#0F172A] leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-[14px] sm:text-[15px] text-[#64748B] mt-1 leading-normal">
            {subtitle}
          </p>
        )}
      </div>

      {renderAction()}
    </div>
  )
}
