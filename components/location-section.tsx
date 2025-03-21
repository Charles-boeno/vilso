"use client"

import { useEffect, useState } from "react"
import { MapPin, Clock } from "lucide-react"
import { useSiteContext } from "@/contexts/site-context"

export default function LocationSection() {
  const { settings } = useSiteContext()
  const [mapUrl, setMapUrl] = useState<string | null>(null)

  // Atualizar o URL do mapa quando as configurações mudarem
  useEffect(() => {
    // Use null instead of empty string if mapEmbedUrl is empty
    const url =
      settings.mapEmbedUrl ||
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1975132509186!2d-46.6522202!3d-23.5646162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzUyLjciUyA0NsKwMzknMDguMCJX!5e0!3m2!1spt-BR!2sbr!4v1616000000000!5m2!1spt-BR!2sbr"
    setMapUrl(url.trim() === "" ? null : url)
  }, [settings.mapEmbedUrl])

  const openGoogleMaps = () => {
    const query = encodeURIComponent(
      `${settings.companyName}, ${settings.address}, ${settings.city}, ${settings.state}`,
    )
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, "_blank")
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="h-[300px] md:h-full relative">
          {mapUrl && (
            <iframe
              src={mapUrl || "/placeholder.svg"}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Localização ${settings.companyName}`}
            ></iframe>
          )}
          {!mapUrl && (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <p className="text-gray-500">Mapa não disponível</p>
            </div>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-bold text-blue-800 mb-4">Venha nos visitar</h3>

          <div className="flex items-start gap-3 mb-4">
            <MapPin className="text-blue-800 mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold">Endereço:</p>
              <p>{settings.address}</p>
              <p>
                {settings.city} - {settings.state}, {settings.zipCode}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 mb-6">
            <Clock className="text-blue-800 mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold">Horário de Funcionamento:</p>
              <p>Segunda a Sexta: {settings.workingHours?.weekdays || "08:00 - 18:00"}</p>
              <p>Sábado: {settings.workingHours?.saturday || "08:00 - 12:00"}</p>
              <p>Domingo: {settings.workingHours?.sunday || "Fechado"}</p>
            </div>
          </div>

          <button
            onClick={openGoogleMaps}
            className="bg-blue-800 hover:bg-blue-900 text-white py-2 px-4 rounded flex items-center justify-center gap-2 transition-colors w-full md:w-auto"
          >
            <MapPin size={18} />
            Como Chegar
          </button>
        </div>
      </div>
    </div>
  )
}

