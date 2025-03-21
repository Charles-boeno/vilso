"use client"

import { Phone } from "lucide-react"
import { useSiteContext } from "@/contexts/site-context"

export default function WhatsAppButton() {
  const { settings } = useSiteContext()

  // Função para formatar o número de telefone para o formato do WhatsApp
  const formatPhoneForWhatsApp = (phone: string) => {
    // Remove todos os caracteres não numéricos
    return phone.replace(/\D/g, "")
  }

  const openWhatsApp = () => {
    const formattedPhone = formatPhoneForWhatsApp(settings.phone)
    const message = encodeURIComponent("Olá! Gostaria de saber mais sobre os produtos de gás.")
    window.open(`https://wa.me/55${formattedPhone}?text=${message}`, "_blank")
  }

  return (
    <button
      onClick={openWhatsApp}
      className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition-colors z-50"
      aria-label="Contato via WhatsApp"
    >
      <Phone size={24} />
    </button>
  )
}

