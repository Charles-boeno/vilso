"use client"

import { useState } from "react"
import { useSiteContext, type Promotion } from "@/contexts/site-context"
import Image from "next/image"

export default function AdminPromocoesPage() {
  const { promotions, updatePromotion } = useSiteContext()
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null)
  const [editedTitle, setEditedTitle] = useState("")
  const [editedImage, setEditedImage] = useState("")
  const [editedAlt, setEditedAlt] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const handleSelectPromotion = (promotion: Promotion) => {
    setSelectedPromotion(promotion)
    setEditedTitle(promotion.title)
    setEditedImage(promotion.image)
    setEditedAlt(promotion.alt)
    setSuccessMessage("")
  }

  const handleSave = () => {
    if (!selectedPromotion) return

    const updatedPromotion: Promotion = {
      ...selectedPromotion,
      title: editedTitle,
      image: editedImage,
      alt: editedAlt,
    }

    updatePromotion(updatedPromotion)
    setSuccessMessage("Promoção atualizada com sucesso!")
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Gerenciar Promoções</h1>

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}

      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 mb-6">
        <h2 className="text-lg font-semibold mb-2">Como editar promoções:</h2>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Selecione uma promoção da lista abaixo</li>
          <li>Edite o texto da promoção no campo "Título da Promoção"</li>
          <li>Para mudar a imagem, insira uma URL no campo "URL da Imagem"</li>
          <li>Clique em "Salvar Alterações" para aplicar as mudanças</li>
        </ol>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Selecione uma promoção para editar:</h2>
          <div className="space-y-4">
            {promotions.map((promotion) => (
              <div
                key={promotion.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedPromotion?.id === promotion.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => handleSelectPromotion(promotion)}
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                    <Image
                      src={promotion.image || "/placeholder.svg"}
                      alt={promotion.alt}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{promotion.title}</h3>
                    <p className="text-sm text-gray-500">Clique para editar</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedPromotion ? (
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Editar Promoção #{selectedPromotion.id}</h2>

            {/* Pré-visualização da imagem */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Pré-visualização da imagem:</label>
              <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                <Image src={editedImage || "/placeholder.svg"} alt={editedAlt} fill className="object-contain" />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título da Promoção</label>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Ex: Promoção do Mês: Gás P13"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem</label>
                <input
                  type="text"
                  value={editedImage}
                  onChange={(e) => setEditedImage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="/placeholder.svg?height=400&width=800"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Use "/placeholder.svg?height=400&width=800" para imagens de placeholder ou insira uma URL de imagem
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Texto Alternativo (para acessibilidade)
                </label>
                <input
                  type="text"
                  value={editedAlt}
                  onChange={(e) => setEditedAlt(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Descrição da imagem para leitores de tela"
                />
              </div>

              <div className="pt-4">
                <button
                  onClick={handleSave}
                  className="bg-blue-800 hover:bg-blue-900 text-white py-2 px-4 rounded-md transition-colors"
                >
                  Salvar Alterações
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 flex items-center justify-center">
            <p className="text-gray-500 text-center">Selecione uma promoção ao lado para começar a editar</p>
          </div>
        )}
      </div>
    </div>
  )
}

