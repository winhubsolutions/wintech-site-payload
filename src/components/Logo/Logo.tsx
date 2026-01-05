import clsx from 'clsx'
import React from 'react'
import { Media } from '@/components/Media'

interface Props {
  logo?: any
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

export const Logo = ({
  logo,
  width = 120,
  height = 32,
  className,
  priority = false,
}: Props) => {
  if (!logo) return null

  return (
    <div
      className={clsx('relative', className)}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <Media
        resource={logo}
        fill                      // ✅ REQUIRED
        priority={priority}
        imgClassName="object-contain"
      />
    </div>
  )
}
