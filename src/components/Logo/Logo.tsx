import clsx from 'clsx'
import React from 'react'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

interface Props {
  logo?: MediaType
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
           /* ✅ PASS ONLY ID OR URL — NEVER THE OBJECT */
        resource={logo}

        fill                      
        priority={priority}
        imgClassName="object-contain"
      />
    </div>
  )
}
