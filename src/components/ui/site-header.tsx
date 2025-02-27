"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ShoppingCart, User, LogOut, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CartPanel } from "@/components/ui/cart-panel"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,

} from "@/components/ui/navigation-menu"
import {jwtDecode} from "jwt-decode"; // Import jwt-decode
import { JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  role: string;
}

export function SiteHeader() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log("Token from localStorage:", token);
    if (token) {
      try {
        const decodedToken = jwtDecode<CustomJwtPayload>(token);
        if (decodedToken.role === "admin") {
          setIsAdmin(true);
        }
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error decoding token:", error);
        setIsAdmin(false);
        setIsLoggedIn(false);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    setIsAdmin(false)
  }

  const navItems = ["Women", "Men", "Product"]
  const secondaryNavItems = ["New", "Clothing", "Dresses", "Beauty", "Accessories", "Sale"]

  return (
    <header className="w-full border-b">
      <div className="container">
        <div className="flex h-20 md:h-35 items-center justify-between">
          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    className="text-lg font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </Link>
                ))}
                {!isLoggedIn ? (
                  <Link href="/sign-up" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="default" size="sm" className="w-full">
                      Sign Up
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => {
                      handleLogout()
                      setIsMobileMenuOpen(false)
                    }}
                    className="w-full"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Logout
                  </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item}>
                    <Link href={`/${item.toLowerCase()}`} legacyBehavior passHref>
                      <NavigationMenuTrigger>{item}</NavigationMenuTrigger>
                    </Link>
                    
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Logo */}
          <Link href="/" className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold">
          Wearly 
          </Link>

          {/* Icons and Auth */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(true)}>
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Shopping Cart</span>
            </Button>

            {!isLoggedIn ? (
              <Link href="/sign-up">
                <Button variant="default" size="sm" className="hidden md:inline-flex">
                  Sign Up
                </Button>
              </Link>
            ) : (
              <Button variant="default" size="sm" onClick={handleLogout} className="hidden md:inline-flex">
                <LogOut className="h-5 w-5 md:mr-2" />
                <span className="hidden md:inline">Logout</span>
              </Button>
            )}

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

        {/* Secondary Navigation - Desktop Only */}
        <nav className="w-full hidden md:flex items-center justify-center bg-black text-white">
          <ul className="flex gap-8 py-4">
            {secondaryNavItems.map((item) => (
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

