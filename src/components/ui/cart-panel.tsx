import { useState, useEffect } from "react"
import { X, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import Image from "next/image"
import Link from "next/link" // ✅ Import Next.js Link

type CartPanelProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export function CartPanel({ isOpen, setIsOpen }: CartPanelProps) {
  const [cartItems, setCartItems] = useState<any[]>([])
      
  // Load cart items from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems") || "[]")
    setCartItems(storedCart)
  }, [isOpen])

  // Remove item from cart
  const removeFromCart = (id: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== id)
    setCartItems(updatedCart)
    localStorage.setItem("cartItems", JSON.stringify(updatedCart))
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader className="flex justify-between items-center">
          <SheetTitle>Your Cart</SheetTitle>
          <SheetClose asChild>
            <Button variant="ghost" size="icon">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </SheetClose>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div key={`${item.id}-${index}`} className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-4">
                  <Image src={item.image} alt={item.name} width={50} height={50} className="rounded-md" />
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">${item.price} x {item.quantity}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                  <Trash className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          )}
        </div>

        <div className="mt-6">  
          <div className="flex justify-between">  
            <p className="text-sm text-gray-500">Subtotal</p>
            <p className="text-sm font-medium">${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</p>  
          </div>
        </div>

        {/* ✅ Fixed Checkout Button */}
        <div className="mt-6">
          <Link href="/checkout" passHref>
            <Button className="w-full">Checkout</Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}
