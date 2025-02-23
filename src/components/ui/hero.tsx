"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-20iKFG19RoeQYqqIcTEwdrZrpRDzRG.png",
    title: "Conscious Choices",
    subtitle: "Explore, discover, and get inspired—your style journey begins here",
    cta: "Shop Now",
  },
  {
    image: "/placeholder.svg?height=600&width=1200",
    title: "Summer Collection",
    subtitle: "Discover the latest trends in sustainable fashion",
    cta: "View Collection",
  },
  {
    image: "/placeholder.svg?height=600&width=1200",
    title: "New Arrivals",
    subtitle: "Be the first to wear our latest designs",
    cta: "Shop New",
  },
]

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, []) // Removed nextSlide from dependencies

  return (
    <div className="relative w-full h-[600px] overflow-hidden bg-gray-100">
      {/* Main Heading */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 text-center">
        <h1 className="text-4xl font-bold mb-2">Fashion E-verse Hub</h1>
        <p className="text-gray-600">Explore, discover, and get inspired—your style journey begins here</p>
      </div>

      {/* Slider */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-32 left-16 text-white max-w-xl">
              <h2 className="text-5xl font-bold mb-4">{slide.title}</h2>
              <p className="text-xl mb-6">{slide.subtitle}</p>
              <Button size="lg" variant="default" className="bg-white text-black hover:bg-gray-100">
                {slide.cta}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 hover:bg-white"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 hover:bg-white"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? "bg-white w-8" : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Bottom Image */}
      <div className="absolute bottom-16 left-16 z-10 w-48 h-64 rounded-lg overflow-hidden shadow-lg">
        <Image src="/placeholder.svg?height=256&width=192" alt="Featured Product" fill className="object-cover" />
      </div>
    </div>
  )
}

