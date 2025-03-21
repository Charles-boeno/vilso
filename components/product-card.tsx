"use client"

import Image from "next/image"
import { Phone } from "lucide-react"
import { useSiteContext } from "@/contexts/site-context"

interface ProductCardProps {
  id: number
  name: string
  description: string
  price: number // Mantemos no tipo, mas não exibimos
  image: string
}

export default function ProductCard({ id, name, description, image }: ProductCardProps) {
  const { settings } = useSiteContext()

  // Função para formatar o número de telefone para o formato do WhatsApp
  const formatPhoneForWhatsApp = (phone: string) => {
    // Remove todos os caracteres não numéricos
    return phone.replace(/\D/g, "")
  }

  // Usar o número específico para produtos ou o número padrão como fallback
  const phoneToUse = settings.whatsappProducts || settings.phone
  const formattedPhone = formatPhoneForWhatsApp(phoneToUse)
  const whatsappMessage = encodeURIComponent(`Olá! Gostaria de fazer um pedido do produto ${name} (${description}).`)
  const whatsappLink = `https://wa.me/55${formattedPhone}?text=${whatsappMessage}`

  // Use a default image if image is empty
  const imageSource = image && image.trim() !== "" ? image : "/placeholder.svg"

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="relative h-40 bg-gray-50">
        <Image src={imageSource || "/placeholder.svg"} alt={name} fill className="object-contain" />
      </div>
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="text-base font-semibold text-blue-800">{name}</h3>
        <p className="text-gray-600 text-xs mb-2 flex-grow">{description}</p>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 hover:bg-green-700 text-white py-1.5 px-2 rounded text-sm flex items-center justify-center gap-1 transition-colors mt-auto"
        >
          <Phone size={14} />
          Pedido pelo WhatsApp
        </a>
      </div>
    </div>
  )
}

