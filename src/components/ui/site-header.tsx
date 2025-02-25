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
  const [isAdmin, setIsAdmin] = useState(false)

  
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Raw token from localStorage:", token);
  
    if (token) {
      try {
        const parsedToken = JSON.parse(token); // Convert string to object
        console.log("Parsed token:", parsedToken);
  
        if (parsedToken?.user?.role === "admin") {
          console.log("User is admin");
          setIsAdmin(true);
        } else {
          console.log("User is not admin");
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error parsing token:", error);
        setIsAdmin(false);
      }
    }
  }, []);
  
  return (
    <header className="w-full border-b">
      <div className="container">
        {/* Top Navigation */}
        <div className="flex h-16 items-center justify-between">
          <div className="flex gap-6">
            <NavigationMenu>
              <NavigationMenuList>
                  <NavigationMenuItem >
                    <Link href="/women">
                    <NavigationMenuTrigger>Women</NavigationMenuTrigger>
                    </Link>
                  </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <NavigationMenu>
              <NavigationMenuList>
                  <NavigationMenuItem >
                    <Link href="/men">
                    <NavigationMenuTrigger>Men</NavigationMenuTrigger>
                    </Link>
                  </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <NavigationMenu>
              <NavigationMenuList>
                  <NavigationMenuItem >
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
            <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(true)}>
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Shopping Cart</span>
            </Button>
            <Link href="/sign-up">
              <Button variant="default" size="sm">
                Sign Up
              </Button>
            </Link>

            {isAdmin && (
              <Button variant="ghost" size="icon">
                <Link href="/admin">      
                <User className="h-5 w-5" />
                <span className="sr-only">Admin Settings</span>
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Secondary Navigation */}
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