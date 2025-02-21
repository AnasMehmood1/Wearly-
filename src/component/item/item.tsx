"use client"

import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"




const Item = ({ product }: any) => {
  return (
    <div className="group relative w-full sm:w-[300px] bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      {/* Image Section */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h2 className="text-lg font-semibold line-clamp-1 mb-1">{product.name}</h2>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">{product.description}</p>

        {/* Price & Action */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          <Button size="sm" className="group/button">
            <ShoppingCart className="h-4 w-4 mr-2 transition-transform group-hover/button:scale-110" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Item

