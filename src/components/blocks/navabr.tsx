"use client";

import { useState,useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { Logo } from "@/components/Logo/Logo";
import { CMSLink } from "@/components/Link";
import { ThemeToggle } from "../../components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./navigation-menu";
import { cn } from "@/lib/utils";

type Props = {
  header?: any
  siteSettings?: {
    logo?: any
    logoDark?: any
    logoWidth?: number | null
    logoHeight?: number | null
  }
}

export const Navbar = ({ header, siteSettings }: Props) => {
  const pathname = usePathname()
  const navItems = header?.navItems || []
const [isSticky, setIsSticky] = useState(false)

useEffect(() => {
  const handleScroll = () => {
    setIsSticky(window.scrollY > 60)
  }

  window.addEventListener("scroll", handleScroll)
  return () => window.removeEventListener("scroll", handleScroll)
}, [])

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  return (
<section
  className={cn(
    "left-1/2 z-50 w-[min(90%,700px)] -translate-x-1/2 rounded-4xl border backdrop-blur-md transition-all duration-300",
    isSticky
      ? "fixed top-3 bg-background/95 backdrop-blur-xl"
      : "absolute top-5 lg:top-12 bg-background/70"
  )}
>
      <div className="flex items-center justify-between px-6 py-3">

        {/* LOGO */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Logo
            logo={siteSettings?.logo}
            width={siteSettings?.logoWidth ?? undefined}
            height={siteSettings?.logoHeight ?? undefined}
            priority
          />
        </Link>

        {/* DESKTOP NAV */}
        <NavigationMenu className="max-lg:hidden">
          <NavigationMenuList>
            {navItems.map((item: any, i: number) => {
              const linkData = item?.link?.link
              const hasChildren = item?.children?.length > 0
              if (!linkData?.label) return null

              if (!hasChildren) {
                return (
                  <NavigationMenuItem key={i}>
                    <CMSLink
                      {...linkData}
                      appearance="inline"
                      className={cn(
                        "px-1.5 text-sm font-medium hover:opacity-75",
                        pathname === linkData.url && "text-muted-foreground"
                      )}
                    />
                  </NavigationMenuItem>
                )
              }

              return (
                <NavigationMenuItem key={i}>
                  <NavigationMenuTrigger className="bg-transparent px-1.5">
               
  <Link
    href={
      linkData.type === 'reference' && linkData.reference?.value?.slug
        ? `${linkData.reference.relationTo !== 'pages' ? `/${linkData.reference.relationTo}` : ''}/${linkData.reference.value.slug}`
        : linkData.url || '#'
    }
    className="bg-transparent px-1.5 text-sm font-medium hover:opacity-75"
  >
    {linkData.label}
  </Link>


                  </NavigationMenuTrigger>

                  <NavigationMenuContent>
                    <ul className="w-[300px] space-y-1 p-3">
                      {item.children.map((child: any, j: number) => {
                        const childLink = child?.link?.link
                        if (!childLink) return null

                        return (
                          <li key={j}>
                            <NavigationMenuLink asChild>
                              <CMSLink
                                {...childLink}
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

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <Link href="/login" className="max-lg:hidden">
            <Button variant="outline">Login</Button>
          </Link>

          {/* MOBILE MENU BUTTON */}
          <button
            className="relative flex size-8 lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
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
          "fixed inset-x-0 top-[calc(100%+1rem)] rounded-2xl border bg-background p-6 lg:hidden",
          isMenuOpen ? "block" : "hidden"
        )}
      >
        <nav className="flex flex-col divide-y">
          {navItems.map((item: any, i: number) => {
            const linkData = item?.link?.link
            const hasChildren = item?.children?.length > 0
            if (!linkData) return null

            return (
              <div key={i} className="py-3">
                {!hasChildren ? (
                <CMSLink {...linkData} className="block py-2" />
                ) : (
                  <>
                    <button
                      className="flex w-full items-center justify-between"
                      onClick={() =>
                        setOpenDropdown(openDropdown === linkData.label ? null : linkData.label)
                      }
                    >
                      {linkData.label}
                      <ChevronRight
                        className={cn(
                          "h-4 w-4 transition-transform",
                          openDropdown === linkData.label && "rotate-90"
                        )}
                      />
                    </button>

                    {openDropdown === linkData.label && (
                      <div className="mt-2 space-y-2 pl-4">
                        {item.children.map((child: any, j: number) => (
                        <CMSLink
  key={j}
  {...child.link.link}
  className="block py-1 text-sm text-muted-foreground hover:text-foreground"
/>
                        ))}
                      </div>
                    )}
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
