import React from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'secondary' | 'light-blue'
  size?: 'sm' | 'md' | 'lg'
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
  loading?: boolean
  to?: string
  href?: string
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      leftIcon,
      rightIcon,
      fullWidth = false,
      loading = false,
      disabled,
      children,
      to,
      href,
      type = 'button',
      ...props
    },
    ref
  ) => {
    // Base rules: rounded-lg, text 14px semibold, whitespace-nowrap, inline-flex items-center gap-2, hover & focus-visible
    const baseStyles =
      'inline-flex items-center justify-center font-semibold text-[14px] rounded-lg whitespace-nowrap transition-all duration-200 select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1257D6]/50 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

    // Variants matching project design tokens
    const variantStyles = {
      primary:
        'bg-[#1257D6] hover:bg-[#0D47A1] active:bg-[#0B57D0] text-white shadow-xs hover:shadow active:scale-[0.99]',
      outline:
        'bg-white hover:bg-[#EAF1FD] text-[#1257D6] border border-[#1257D6] hover:border-[#0D47A1] shadow-2xs active:scale-[0.99]',
      ghost:
        'bg-transparent hover:bg-slate-100 text-slate-700 hover:text-[#1257D6] active:bg-slate-200',
      secondary:
        'bg-slate-100 hover:bg-slate-200 text-[#0F172A] active:scale-[0.99]',
      'light-blue':
        'bg-[#F4F8FE] hover:bg-[#EAF1FD] text-[#1257D6] border border-[#D0E1FD] shadow-2xs active:scale-[0.99]',
    }

    // Heights: Default 40px, small 36px, large 48px
    const sizeStyles = {
      sm: 'h-[36px] px-3.5 gap-1.5 text-[13px]',
      md: 'h-[40px] px-4 sm:px-5 gap-2 text-[14px]',
      lg: 'h-[48px] px-6 gap-2.5 text-[15px]',
    }

    const combinedClassName = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      fullWidth && 'w-full',
      className
    )

    // Render as react-router Link if `to` is provided
    if (to && !disabled) {
      return (
        <Link to={to} className={combinedClassName}>
          {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
        </Link>
      )
    }

    // Render as external anchor if `href` is provided
    if (href && !disabled) {
      return (
        <a href={href} className={combinedClassName}>
          {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
        </a>
      )
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        className={combinedClassName}
        {...props}
      >
        {loading ? (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
        ) : (
          leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!loading && rightIcon && (
          <span className="inline-flex shrink-0">{rightIcon}</span>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
