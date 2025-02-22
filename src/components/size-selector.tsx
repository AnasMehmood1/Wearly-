"use client"

import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface SizeSelectorProps {
  sizes: string[]
  onSizeSelect: (size: string) => void
}

export function SizeSelector({ sizes, onSizeSelect }: SizeSelectorProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)

  const handleSizeChange = (size: string) => {
    setSelectedSize(size)
    onSizeSelect(size)
  }

  return (
    <div className="mt-4">
      <h3 className="text-sm font-medium text-gray-900">Size</h3>
      <RadioGroup className="mt-2 grid grid-cols-3 gap-3 sm:grid-cols-6">
        {sizes.map((size) => (
          <div key={size}>
            <RadioGroupItem
              value={size}
              id={`size-${size}`}
              className="peer sr-only"
              onClick={() => handleSizeChange(size)}
            />
            <Label
              htmlFor={`size-${size}`}
              className="flex items-center justify-center rounded-md border px-3 py-2 text-sm font-medium uppercase hover:bg-gray-50 peer-data-[state=checked]:border-black peer-data-[state=checked]:bg-black peer-data-[state=checked]:text-white"
            >
              {size}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

