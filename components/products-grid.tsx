"use client"

import { useState, useCallback, useRef } from "react"
import { useSiteContext } from "@/contexts/site-context"
import ProductCard from "./product-card"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function ProductsGrid() {
  const { products } = useSiteContext()
  const [scrollPosition, setScrollPosition] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollLeft = useCallback(() => {
    if (containerRef.current) {
      const container = containerRef.current
      const scrollAmount = container.clientWidth * 0.8
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" })
      setScrollPosition(Math.max(0, container.scrollLeft - scrollAmount))
    }
  }, [])

  const scrollRight = useCallback(() => {
    if (containerRef.current) {
      const container = containerRef.current
      const scrollAmount = container.clientWidth * 0.8
      container.scrollBy({ left: scrollAmount, behavior: "smooth" })
      setScrollPosition(container.scrollLeft + scrollAmount)
    }
  }, [])

  // Atualizar a posição de rolagem quando o usuário rola manualmente
  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      setScrollPosition(containerRef.current.scrollLeft)
    }
  }, [])

  return (
    <div className="relative">
      {/* Botão de navegação esquerda */}
      <button
        onClick={scrollLeft}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-blue-800 p-2 rounded-full shadow-md transition-colors ${
          scrollPosition <= 0 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={scrollPosition <= 0}
        aria-label="Produtos anteriores"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Container do carrossel */}
      <div
        ref={containerRef}
        className="flex overflow-x-auto pb-6 pt-2 px-2 -mx-2 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onScroll={handleScroll}
      >
        {products.map((product) => (
          <div key={product.id} className="flex-none w-[220px] sm:w-[250px] px-2 snap-start">
            <ProductCard {...product} />
          </div>
        ))}
      </div>

      {/* Botão de navegação direita */}
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-blue-800 p-2 rounded-full shadow-md transition-colors"
        aria-label="Próximos produtos"
      >
        <ChevronRight size={24} />
      </button>

      {/* Estilo para esconder a barra de rolagem */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}

