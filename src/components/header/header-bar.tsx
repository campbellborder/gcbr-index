'use client'

import Link from 'next/link'
import { DarkModeToggle } from './dm-toggle'
import useMobile from '@/hooks/useMobile'
import { ReactElement } from 'react'
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

function MobileNavMenu({ children }: { children: ReactElement }) {
  const mobile = useMobile()

  if (!mobile) return children
  return (
    <Sheet>
      <SheetTrigger>
        {/* <Button variant="outline" size="icon"> */}
          <Menu className='scale-[0.9]'/>
        {/* </Button> */}
        </SheetTrigger>
      <SheetContent side="left">
        {children}
      </SheetContent>
    </Sheet>
  )
}

export default function HeaderBar() {

  return (
    <header className="fixed border-b bg-inherit w-full top-0">
      <div className="container flex h-14">
        <MobileNavMenu>
          <NavigationMenu>
            <NavigationMenuList className='flex-col md:flex-row'>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/methodology" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Methodology
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/resources" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Additional Resources
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </MobileNavMenu>
        <div className='grow'></div>
        <DarkModeToggle />
      </div>
    </header>
  )
}