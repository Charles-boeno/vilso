"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { useSiteContext } from "@/contexts/site-context"

export default function Header() {
  const { settings } = useSiteContext()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [headerStyle, setHeaderStyle] = useState<React.CSSProperties>({})

  // Atualizar o estilo quando as configurações mudarem
  useEffect(() => {
    setHeaderStyle({
      backgroundColor: settings.headerColor || "#0055A4",
    })
  }, [settings.headerColor])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const scrollToSection = (sectionId: string) => {
    // Fechar o menu móvel após clicar
    setIsMenuOpen(false)

    // Encontrar o elemento pelo ID
    const element = document.getElementById(sectionId)

    if (element) {
      // Calcular a posição considerando o header fixo
      const headerHeight = 64 // altura do header em pixels (h-16)
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight

      // Rolar até a seção com animação suave
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 text-white z-50 shadow-md" style={headerStyle}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button onClick={() => scrollToSection("top")} className="flex items-center text-xl font-bold">
              {settings.companyName}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:text-[#FFD700] transition-colors"
            >
              Início
            </button>
            <button onClick={() => scrollToSection("produtos")} className="hover:text-[#FFD700] transition-colors">
              Produtos
            </button>
            <button onClick={() => scrollToSection("localizacao")} className="hover:text-[#FFD700] transition-colors">
              Localização
            </button>
            <button onClick={() => scrollToSection("contato")} className="hover:text-[#FFD700] transition-colors">
              Contato
            </button>
          </nav>

          {/* Mobile Navigation Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden" style={headerStyle}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="block w-full text-left px-3 py-2 text-white hover:bg-opacity-20 hover:bg-white rounded-md"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection("produtos")}
              className="block w-full text-left px-3 py-2 text-white hover:bg-opacity-20 hover:bg-white rounded-md"
            >
              Produtos
            </button>
            <button
              onClick={() => scrollToSection("localizacao")}
              className="block w-full text-left px-3 py-2 text-white hover:bg-opacity-20 hover:bg-white rounded-md"
            >
              Localização
            </button>
            <button
              onClick={() => scrollToSection("contato")}
              className="block w-full text-left px-3 py-2 text-white hover:bg-opacity-20 hover:bg-white rounded-md"
            >
              Contato
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

