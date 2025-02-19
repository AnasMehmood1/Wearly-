import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"

type CartPanelProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export function CartPanel({ isOpen, setIsOpen }: CartPanelProps) {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetClose asChild>
            <Button variant="ghost" size="icon">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </SheetClose>
        </SheetHeader>
        <div className="mt-8">
          {/* Add your cart items here */}
          <p>Your cart is empty.</p>
        </div>
      </SheetContent>
    </Sheet>
  )
}

