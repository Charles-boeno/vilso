"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useSiteContext } from "@/contexts/site-context"

export default function PromotionsCarousel() {
  const { promotions } = useSiteContext()
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === promotions.length - 1 ? 0 : prev + 1))
  }, [promotions])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? promotions.length - 1 : prev - 1))
  }, [promotions])

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [nextSlide])

  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg">
      <div className="relative h-[300px] md:h-[400px] w-full">
        {promotions.map((promotion, index) => {
          // Use a default image if image is empty
          const imageSource =
            promotion.image && promotion.image.trim() !== "" ? promotion.image : "/placeholder.svg?height=400&width=800"

          return (
            <div
              key={promotion.id}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <Image
                src={imageSource || "/placeholder.svg"}
                alt={promotion.alt}
                fill
                className="object-cover" // Mantemos object-cover para o carrossel principal
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl md:text-2xl font-bold">{promotion.title}</h3>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        aria-label="Slide anterior"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        aria-label="Próximo slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {promotions.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

