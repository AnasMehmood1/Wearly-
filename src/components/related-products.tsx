"use client"

import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/types/product"

interface RelatedProductsProps {
  products: Product[]
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`} className="group">
            <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                width={300}
                height={300}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">${product.price.toFixed(2)}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

