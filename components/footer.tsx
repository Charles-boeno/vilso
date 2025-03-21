"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Phone, Mail, Instagram, Facebook, MapPin } from "lucide-react"
import { useSiteContext } from "@/contexts/site-context"

export default function Footer() {
  const { settings } = useSiteContext()
  const [footerStyle, setFooterStyle] = useState<React.CSSProperties>({})

  // Atualizar o estilo quando as configurações mudarem
  useEffect(() => {
    setFooterStyle({
      backgroundColor: settings.footerColor || "#2d2d2d",
    })
  }, [settings.footerColor])

  const scrollToSection = (sectionId: string) => {
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
    <footer id="contato" className="text-white pt-10 pb-6" style={footerStyle}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo e Informações */}
          <div>
            <h3 className="text-2xl font-bold mb-4">{settings.companyName}</h3>
            <p className="mb-4">Revenda autorizada de gás com os melhores preços e entrega rápida.</p>
            <p className="text-sm text-gray-400">CNPJ: {settings.cnpj}</p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="hover:text-[#FFD700] transition-colors"
                >
                  Início
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("produtos")} className="hover:text-[#FFD700] transition-colors">
                  Produtos
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("localizacao")}
                  className="hover:text-[#FFD700] transition-colors"
                >
                  Localização
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("contato")} className="hover:text-[#FFD700] transition-colors">
                  Contato
                </button>
              </li>
              <li>
                <a href="/admin" className="hover:text-[#FFD700] transition-colors">
                  Área Administrativa
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-[#FFD700]" />
                <a href={`tel:${settings.phone}`} className="hover:text-[#FFD700] transition-colors">
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-[#FFD700]" />
                <a href={`mailto:${settings.email}`} className="hover:text-[#FFD700] transition-colors">
                  {settings.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={18} className="text-[#FFD700]" />
                <span>
                  {settings.address} - {settings.city}/{settings.state}
                </span>
              </li>
              <li className="flex items-center gap-4 mt-4">
                <a
                  href={settings.socialMedia?.instagram || "https://instagram.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <Instagram size={24} className="hover:text-[#FFD700] transition-colors" />
                </a>
                <a
                  href={settings.socialMedia?.facebook || "https://facebook.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <Facebook size={24} className="hover:text-[#FFD700] transition-colors" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} {settings.companyName}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

