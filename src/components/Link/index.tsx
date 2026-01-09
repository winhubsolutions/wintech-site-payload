import { Button } from '@/components/ui/button'
//import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'
import { cn } from '@/lib/utils'

import type { Page, Post, Service } from '@/payload-types'

type CMSLinkType = {
  appearance?:
    | 'inline'
    | 'default'
    | 'link'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | null
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts' | 'services'
    value: Page | Post | Service | string | number
  } | null
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg' | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

const collectionRouteMap = {
  pages: '',
  posts: '/posts',
  services: '/services',
} as const

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
  } = props

  let href: string | null = null

  if (
    type === 'reference' &&
    reference &&
    typeof reference.value === 'object' &&
    'slug' in reference.value &&
    reference.value.slug
  ) {
    const prefix = collectionRouteMap[reference.relationTo] ?? ''
    href = `${prefix}/${reference.value.slug}`.replace('//', '/')
  } else {
    href = url ?? null
  }

  if (!href) return null

  const size = sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  if (appearance === 'inline') {
    return (
      <Link href={href} className={cn(className)} {...newTabProps}>
        {label}
        {children}
      </Link>
    )
  }

  return (
    <Button asChild size={size} variant={appearance} className={className}>
      <Link href={href} {...newTabProps}>
        {label}
        {children}
      </Link>
    </Button>
  )
}
