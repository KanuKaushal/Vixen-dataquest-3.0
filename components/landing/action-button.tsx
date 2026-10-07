'use client'

import { motion, MotionConfig } from 'framer-motion'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const MotionLink = motion.create(Link)
const MotionAnchor = motion.a

type ActionButtonProps = {
  href: string
  variant: 'primary' | 'ghost'
  size?: 'md' | 'sm'
  className?: string
  children: ReactNode
}

export function ActionButton({ href, variant, size = 'md', className, children }: ActionButtonProps) {
  const classes = cn(
    buttonVariants({ variant: variant === 'primary' ? 'default' : 'ghost' }),
    'rounded-md font-medium transition-colors duration-150',
    size === 'md' ? 'h-10 px-4 text-[15px]' : 'h-8 px-3 text-[13px]',
    variant === 'primary'
      ? 'bg-accent font-semibold text-foreground hover:bg-accent-hover'
      : 'border-border text-foreground hover:bg-muted',
    className,
  )

  const motionProps = {
    whileTap: { scale: 0.97 },
    whileHover: variant === 'primary' ? { y: -1 } : undefined,
    transition: { duration: 0.15, ease: 'easeOut' as const },
  }

  return (
    <MotionConfig reducedMotion="user">
      {href.startsWith('#') ? (
        <MotionAnchor href={href} className={classes} {...motionProps}>
          {children}
        </MotionAnchor>
      ) : (
        <MotionLink href={href} className={classes} {...motionProps}>
          {children}
        </MotionLink>
      )}
    </MotionConfig>
  )
}
