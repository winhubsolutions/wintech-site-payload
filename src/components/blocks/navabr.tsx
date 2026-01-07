'use client'

import type { Header, SiteSetting, Media as PayloadMedia } from '@/payload-types'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight } from 'lucide-react'

import { Logo } from '@/components/Logo/Logo'
import { CMSLink } from '@/components/Link'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './navigation-menu'
import { cn } from '@/lib/utils'

/* ------------------------------------------------------------------ */
/* Helpers */
/* ------------------------------------------------------------------ */

const resolveReferenceHref = (link: any): string => {
  if (link.type !== 'reference') {
    return link.url ?? '#'
  }

  const value = link.reference?.value

  const slug = typeof value === 'object' && value !== null && 'slug' in value ? value.slug : null

  if (!slug) return '#'

  return `${link.reference?.relationTo !== 'pages' ? `/${link.reference?.relationTo}` : ''}/${slug}`
}

/* ------------------------------------------------------------------ */
/* Props */
/* ------------------------------------------------------------------ */

type Props = {
  header?: Header | null
  siteSettings?: SiteSetting | null
}

/* ------------------------------------------------------------------ */
/* Component */
/* ------------------------------------------------------------------ */

export const Navbar = ({ header, siteSettings }: Props) => {
  const pathname = usePathname()
  const navItems = header?.navItems ?? []

  const [isSticky, setIsSticky] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      className={cn(
        'left-1/2 z-50 w-[min(90%,700px)] -translate-x-1/2 rounded-4xl border backdrop-blur-md transition-all duration-300',
        isSticky
          ? 'fixed top-3 bg-background/95 backdrop-blur-xl'
          : 'absolute top-5 lg:top-12 bg-background/70',
      )}
    >
      <div className="flex items-center justify-between px-6 py-3">
        {/* LOGO */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Logo
            logo={siteSettings?.logo as PayloadMedia | undefined}
            width={siteSettings?.logoWidth ?? undefined}
            height={siteSettings?.logoHeight ?? undefined}
            priority
          />
        </Link>

        {/* DESKTOP NAV */}
        <NavigationMenu className="max-lg:hidden">
          <NavigationMenuList>
            {navItems.map((item, i) => {
              const linkData = item?.link?.link
              if (!linkData?.label) return null

              const hasChildren = !!item.children?.length
              const href = resolveReferenceHref(linkData)

              if (!hasChildren) {
                return (
                  <NavigationMenuItem key={i}>
                    <CMSLink
                      {...linkData}
                      appearance="inline"
                      className={cn(
                        'px-1.5 text-sm font-medium hover:opacity-75',
                        pathname === href && 'text-muted-foreground',
                      )}
                    />
                  </NavigationMenuItem>
                )
              }

              return (
                <NavigationMenuItem key={i}>
                  <NavigationMenuTrigger className="bg-transparent px-1.5">
                    <Link href={href} className="px-1.5 text-sm font-medium hover:opacity-75">
                      {linkData.label}
                    </Link>
                  </NavigationMenuTrigger>

                  <NavigationMenuContent>
                    <ul className="w-[300px] space-y-1 p-3">
                      {item.children?.map((child, j) => {
                        const childLink = child?.link?.link
                        if (!childLink) return null

                        return (
                          <li key={j}>
                            <NavigationMenuLink asChild>
                              <CMSLink
                                {...childLink}
                                appearance="inline"
                                className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                              />
                            </NavigationMenuLink>
                          </li>
                        )
                      })}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              )
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* RIGHT */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <Link href="/login" className="max-lg:hidden">
            <Button variant="outline">Login</Button>
          </Link>

          <button
            className="relative flex size-8 lg:hidden"
            onClick={() => setIsMenuOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
              <span className="h-0.5 w-5 bg-current" />
              <span className="h-0.5 w-5 bg-current" />
              <span className="h-0.5 w-5 bg-current" />
            </div>
          </button>
        </div>
      </div>

      {/* MOBILE NAV */}
      <div
        className={cn(
          'bg-background fixed inset-x-0 top-[calc(100%+1rem)] flex flex-col rounded-2xl border p-6 transition-all duration-300 ease-in-out lg:hidden',
          isMenuOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-4 opacity-0',
        )}
      >
        <nav className="divide-border flex flex-1 flex-col divide-y">
          {navItems.map((item, i) => {
            const linkData = item?.link?.link
            if (!linkData?.label) return null

            const hasChildren = !!item.children?.length

            return (
              <div key={i} className="py-4 first:pt-0 last:pb-0">
                {!hasChildren ? (
                  <CMSLink {...linkData} appearance="inline" className="block py-2" />
                ) : (
                  <>
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === linkData.label ? null : linkData.label)
                      }
                      className="text-primary flex w-full items-center justify-between text-base font-medium"
                    >
                      {linkData.label}
                      <ChevronRight
                        className={cn(
                          'h-4 w-4 transition-transform',
                          openDropdown === linkData.label && 'rotate-90',
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        'overflow-hidden transition-all duration-300',
                        openDropdown === linkData.label
                          ? 'mt-4 max-h-[1000px] opacity-100'
                          : 'max-h-0 opacity-0',
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="bg-muted/50 space-y-3 rounded-lg p-4">
                        {openDropdown === linkData.label && (
                          <div className="mt-2 space-y-2 pl-4">
                            {item.children?.map((child, j) => {
                              const childLink = child?.link?.link
                              if (!childLink) return null

                              return (
                                <CMSLink
                                  key={j}
                                  {...childLink}
                                  appearance="inline"
                                  className="block py-1 text-sm text-muted-foreground hover:text-foreground"
                                />
                              )
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </nav>
      </div>
    </section>
  )
}
