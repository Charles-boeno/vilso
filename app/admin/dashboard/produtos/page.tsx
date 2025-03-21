"use client"

import { useState } from "react"
import { useSiteContext, type Product } from "@/contexts/site-context"
import Image from "next/image"

export default function AdminProdutosPage() {
  const { products, updateProduct } = useSiteContext()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [editedName, setEditedName] = useState("")
  const [editedDescription, setEditedDescription] = useState("")
  const [editedImage, setEditedImage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product)
    setEditedName(product.name)
    setEditedDescription(product.description)
    setEditedImage(product.image)
    setSuccessMessage("")
  }

  const handleSave = () => {
    if (!selectedProduct) return

    const updatedProduct: Product = {
      ...selectedProduct,
      name: editedName,
      description: editedDescription,
      price: selectedProduct.price, // Mantemos o preço original
      image: editedImage,
    }

    updateProduct(updatedProduct)
    setSuccessMessage("Produto atualizado com sucesso!")
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Gerenciar Produtos</h1>

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}

      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 mb-6">
        <h2 className="text-lg font-semibold mb-2">Como editar produtos:</h2>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Selecione um produto da lista abaixo</li>
          <li>Edite o nome e descrição nos campos correspondentes</li>
          <li>Para mudar a imagem, insira uma URL no campo "URL da Imagem"</li>
          <li>Clique em "Salvar Alterações" para aplicar as mudanças</li>
        </ol>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Selecione um produto para editar:</h2>
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {products.map((product) => (
              <div
                key={product.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedProduct?.id === product.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => handleSelectProduct(product)}
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedProduct ? (
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Editar Produto #{selectedProduct.id}</h2>

            {/* Pré-visualização da imagem */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Pré-visualização da imagem:</label>
              <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                <Image src={editedImage || "/placeholder.svg"} alt={editedName} fill className="object-contain" />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Produto</label>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Ex: Botijão P13"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <input
                  type="text"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Ex: Gás Ultragaz - 13kg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem</label>
                <input
                  type="text"
                  value={editedImage}
                  onChange={(e) => setEditedImage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="/placeholder.svg?height=200&width=200"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Use "/placeholder.svg?height=200&width=200" para imagens de placeholder ou insira uma URL de imagem
                </p>
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
            <p className="text-gray-500 text-center">Selecione um produto ao lado para começar a editar</p>
          </div>
        )}
      </div>
    </div>
  )
}

