"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ShoppingCart, User, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { CartPanel } from "@/components/ui/cart-panel"





export function SiteHeader() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  // Add state for authentication (to be implemented)
  const isAuthenticated = false
  const isAdmin = true // Set to true to show the admin icon
  const [cartItems, setCartItems] = useState<any[]>([])

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems") || "[]")
    setCartItems(storedCart)
  }, [])

  return (
    <header className="w-full border-b">
      <div className="container">
        {/* Top Navigation */}
        <div className="flex h-16 items-center justify-between">
          <div className="flex gap-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/product/women">
                    <NavigationMenuTrigger>Women</NavigationMenuTrigger>
                  </Link>
                
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/product/men">  <NavigationMenuTrigger>Men</NavigationMenuTrigger></Link>
          
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/product">
                    <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                  </Link>
             
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            VistaMart
          </Link>

          {/* Icons and Auth */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(true)} className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Shopping Cart</span>
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-black rounded-full">
                {cartItems.length}
              </span>
            </Button>
            {isAuthenticated ? (
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Button>
            ) : (
              <Button variant="default" size="sm">
                Sign Up
              </Button>
            )}
            {isAdmin && (
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Admin Settings</span>
              </Button>
            )}
          </div>
        </div>

        {/* Secondary Navigation - Now with black background */}
        <nav className="flex items-center justify-center bg-black text-white">
          <ul className="flex gap-8 py-4">
            {["New", "Clothing", "Dresses", "Beauty", "Accessories", "Sale"].map((item) => (
              <li key={item}>
                <Link href="#" className="text-sm font-medium transition-colors hover:text-gray-300">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Cart Panel */}
      <CartPanel isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
    </header>
  )
}

