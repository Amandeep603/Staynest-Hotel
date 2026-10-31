import React from 'react'
import { cn } from '../../lib/utils'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
  children: React.ReactNode
  className?: string
  clean?: boolean // if true, omit horizontal padding
}

export const Container: React.FC<ContainerProps> = ({
  as: Component = 'div',
  children,
  className,
  clean = false,
  ...props
}) => {
  return (
    <Component
      className={cn(
        'max-w-[1200px] mx-auto w-full',
        !clean && 'px-4 sm:px-6 lg:px-8',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

