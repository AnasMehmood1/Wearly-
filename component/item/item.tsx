"use client"

import Image from "next/image"
import Link from "next/link"

const Item = ({ product }: any) => {
  return (
    <Link href={`/product/${product._id}`} className="block relative">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-white py-4 border-t border-gray-100">
          <div className="px-4 flex justify-between items-start">
            <div>
              <h3 className="text-[15px] font-normal leading-tight">{product.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{product.itemCount || "2"} items</p>
            </div>
            <p className="text-[15px] font-normal">${product.price.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Item

