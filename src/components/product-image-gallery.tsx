"use client"

import { useState } from "react"
import Image from "next/image"

interface ProductImageGalleryProps {
  images: string[]
  productName: string
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0])

  return (
    <div className="flex flex-col">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg">
        <Image
          src={mainImage || "/placeholder.svg"}
          alt={productName}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
      <div className="mt-4 grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setMainImage(image)}
            className={`relative aspect-square overflow-hidden rounded-md ${
              mainImage === image ? "ring-2 ring-black" : ""
            }`}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${productName} thumbnail ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 25vw, (max-width: 1200px) 15vw, 10vw"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

