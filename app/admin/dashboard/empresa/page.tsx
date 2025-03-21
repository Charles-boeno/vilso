"use client"

import { useEffect, useState } from "react"
import { useSiteContext } from "@/contexts/site-context"

export default function AdminEmpresaPage() {
  const { settings, updateSettings } = useSiteContext()
  const [companyName, setCompanyName] = useState(settings.companyName || "")
  const [address, setAddress] = useState(settings.address || "")
  const [city, setCity] = useState(settings.city || "")
  const [state, setState] = useState(settings.state || "")
  const [zipCode, setZipCode] = useState(settings.zipCode || "")
  const [phone, setPhone] = useState(settings.phone || "")
  const [email, setEmail] = useState(settings.email || "")
  const [cnpj, setCnpj] = useState(settings.cnpj || "")
  const [whatsappProducts, setWhatsappProducts] = useState(settings.whatsappProducts || "")
  const [instagram, setInstagram] = useState(settings.socialMedia?.instagram || "")
  const [facebook, setFacebook] = useState(settings.socialMedia?.facebook || "")
  const [weekdays, setWeekdays] = useState(settings.workingHours?.weekdays || "")
  const [saturday, setSaturday] = useState(settings.workingHours?.saturday || "")
  const [sunday, setSunday] = useState(settings.workingHours?.sunday || "")
  const [mapEmbedUrl, setMapEmbedUrl] = useState(settings.mapEmbedUrl || "")
  const [successMessage, setSuccessMessage] = useState("")

  // Atualizar os estados quando as configurações mudarem
  useEffect(() => {
    setCompanyName(settings.companyName || "")
    setAddress(settings.address || "")
    setCity(settings.city || "")
    setState(settings.state || "")
    setZipCode(settings.zipCode || "")
    setPhone(settings.phone || "")
    setEmail(settings.email || "")
    setCnpj(settings.cnpj || "")
    setWhatsappProducts(settings.whatsappProducts || "")
    setInstagram(settings.socialMedia?.instagram || "")
    setFacebook(settings.socialMedia?.facebook || "")
    setWeekdays(settings.workingHours?.weekdays || "")
    setSaturday(settings.workingHours?.saturday || "")
    setSunday(settings.workingHours?.sunday || "")
    setMapEmbedUrl(settings.mapEmbedUrl || "")
  }, [settings])

  const handleSave = () => {
    updateSettings({
      companyName,
      address,
      city,
      state,
      zipCode,
      phone,
      email,
      cnpj,
      whatsappProducts,
      // Ensure mapEmbedUrl is not an empty string
      mapEmbedUrl: mapEmbedUrl.trim() === "" ? null : mapEmbedUrl,
      socialMedia: {
        instagram,
        facebook,
      },
      workingHours: {
        weekdays,
        saturday,
        sunday,
      },
    })

    setSuccessMessage("Informações da empresa atualizadas com sucesso!")

    // Limpar a mensagem após 3 segundos
    setTimeout(() => {
      setSuccessMessage("")
    }, 3000)
  }

  // Get a valid map URL for preview
  const getMapPreviewUrl = () => {
    if (mapEmbedUrl && mapEmbedUrl.trim() !== "") {
      return mapEmbedUrl
    }
    return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1975132509186!2d-46.6522202!3d-23.5646162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzUyLjciUyA0NsKwMzknMDguMCJX!5e0!3m2!1spt-BR!2sbr!4v1616000000000!5m2!1spt-BR!2sbr"
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Informações da Empresa</h1>

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}

      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 mb-6">
        <h2 className="text-lg font-semibold mb-2">Como alterar as informações da empresa:</h2>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Edite os campos abaixo com as informações atualizadas da empresa</li>
          <li>Verifique se todos os dados estão corretos</li>
          <li>Clique em "Salvar Alterações" para aplicar as mudanças</li>
        </ol>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Dados da Empresa</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Empresa</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Ex: Da Silva Gas"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CNPJ</label>
              <input
                type="text"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Ex: 00.000.000/0001-00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Ex: Av. Paulista, 1000 - Bela Vista"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Ex: São Paulo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Ex: SP"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CEP</label>
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Ex: 01310-100"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Ex: (11) 99999-9999"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp para Pedidos de Produtos</label>
              <input
                type="text"
                value={whatsappProducts}
                onChange={(e) => setWhatsappProducts(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Ex: (11) 99999-9999"
              />
              <p className="text-xs text-gray-500 mt-1">
                Este número será usado especificamente para pedidos de produtos
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Ex: contato@dasilvagas.com.br"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Link do Instagram</label>
              <input
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Ex: https://instagram.com/dasilvagas"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Link do Facebook</label>
              <input
                type="text"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Ex: https://facebook.com/dasilvagas"
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Horário de Funcionamento</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Segunda a Sexta</label>
              <input
                type="text"
                value={weekdays}
                onChange={(e) => setWeekdays(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Ex: 08:00 - 18:00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sábado</label>
              <input
                type="text"
                value={saturday}
                onChange={(e) => setSaturday(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Ex: 08:00 - 12:00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Domingo</label>
              <input
                type="text"
                value={sunday}
                onChange={(e) => setSunday(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Ex: Fechado"
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Localização no Mapa</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL de Incorporação do Google Maps</label>
            <input
              type="text"
              value={mapEmbedUrl}
              onChange={(e) => setMapEmbedUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Ex: https://www.google.com/maps/embed?pb=..."
            />
            <p className="text-xs text-gray-500 mt-1">
              Cole aqui o código de incorporação do Google Maps. Para obter este código:
              <ol className="list-decimal list-inside mt-1">
                <li>Acesse o Google Maps e busque seu endereço</li>
                <li>Clique em "Compartilhar"</li>
                <li>Selecione "Incorporar um mapa"</li>
                <li>Copie apenas a URL que está dentro de src="..."</li>
              </ol>
            </p>
          </div>

          {/* Pré-visualização do mapa */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Pré-visualização do Mapa:</label>
            <div className="border border-gray-300 rounded-md overflow-hidden h-[200px]">
              <iframe
                src={getMapPreviewUrl()}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Pré-visualização do mapa"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleSave}
            className="bg-blue-800 hover:bg-blue-900 text-white py-2 px-4 rounded-md transition-colors"
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  )
}

