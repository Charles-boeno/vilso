"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSiteContext } from "@/contexts/site-context"

export default function AdminAparenciaPage() {
  const { settings, updateSettings } = useSiteContext()
  const [backgroundColor, setBackgroundColor] = useState(settings.backgroundColor)
  const [headerColor, setHeaderColor] = useState(settings.headerColor)
  const [footerColor, setFooterColor] = useState(settings.footerColor)
  const [successMessage, setSuccessMessage] = useState("")

  // Atualizar os estados quando as configurações mudarem
  useEffect(() => {
    setBackgroundColor(settings.backgroundColor || "#ffffff")
    setHeaderColor(settings.headerColor || "#0055A4")
    setFooterColor(settings.footerColor || "#2d2d2d")
  }, [settings])

  const handleColorChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setter(e.target.value)
  }

  const handleSave = () => {
    updateSettings({
      backgroundColor,
      headerColor,
      footerColor,
    })
    setSuccessMessage("Cores atualizadas com sucesso!")

    // Limpar a mensagem após 3 segundos
    setTimeout(() => {
      setSuccessMessage("")
    }, 3000)
  }

  // Lista de cores predefinidas para o fundo
  const predefinedBackgroundColors = [
    "#ffffff", // Branco
    "#f8f9fa", // Cinza muito claro
    "#e9ecef", // Cinza claro
    "#f0f8ff", // Alice Blue
    "#f0fff0", // Honeydew
    "#fff0f5", // Lavender Blush
    "#fffacd", // Lemon Chiffon
    "#e6f7ff", // Azul muito claro
    "#e6ffe6", // Verde muito claro
    "#fff6e6", // Laranja muito claro
  ]

  // Lista de cores predefinidas para o menu
  const predefinedHeaderColors = [
    "#0055A4", // Azul (padrão)
    "#004080", // Azul escuro
    "#2c3e50", // Azul marinho
    "#27ae60", // Verde
    "#16a085", // Verde escuro
    "#e74c3c", // Vermelho
    "#c0392b", // Vermelho escuro
    "#f39c12", // Laranja
    "#d35400", // Laranja escuro
    "#333333", // Cinza escuro
  ]

  // Lista de cores predefinidas para o rodapé
  const predefinedFooterColors = [
    "#2d2d2d", // Cinza escuro (padrão)
    "#1a1a1a", // Quase preto
    "#0055A4", // Azul (igual ao menu)
    "#004080", // Azul escuro
    "#2c3e50", // Azul marinho
    "#27ae60", // Verde
    "#16a085", // Verde escuro
    "#e74c3c", // Vermelho
    "#c0392b", // Vermelho escuro
    "#333333", // Cinza escuro
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Configurações de Aparência</h1>

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}

      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 mb-6">
        <h2 className="text-lg font-semibold mb-2">Como alterar a aparência do site:</h2>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Escolha as cores para o fundo do site, menu e rodapé</li>
          <li>Use o seletor de cores ou clique em uma das cores predefinidas</li>
          <li>Visualize como as cores ficarão no site usando a pré-visualização</li>
          <li>Clique em "Salvar Alterações" para aplicar as novas cores ao site</li>
        </ol>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Cores do Site</h2>

          {/* Cor de fundo */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Cor de Fundo do Site:</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => handleColorChange(e, setBackgroundColor)}
                className="w-12 h-12 border-0 p-0 cursor-pointer"
              />
              <input
                type="text"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
                placeholder="#ffffff"
              />
            </div>
            <div className="mt-2">
              <label className="block text-xs text-gray-600 mb-1">Cores predefinidas:</label>
              <div className="flex flex-wrap gap-2">
                {predefinedBackgroundColors.map((color, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`w-8 h-8 rounded-full border ${
                      color === backgroundColor ? "ring-2 ring-blue-500 ring-offset-2" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setBackgroundColor(color)}
                    aria-label={`Cor de fundo ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Cor do menu */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Cor do Menu:</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={headerColor}
                onChange={(e) => handleColorChange(e, setHeaderColor)}
                className="w-12 h-12 border-0 p-0 cursor-pointer"
              />
              <input
                type="text"
                value={headerColor}
                onChange={(e) => setHeaderColor(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
                placeholder="#0055A4"
              />
            </div>
            <div className="mt-2">
              <label className="block text-xs text-gray-600 mb-1">Cores predefinidas:</label>
              <div className="flex flex-wrap gap-2">
                {predefinedHeaderColors.map((color, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`w-8 h-8 rounded-full border ${
                      color === headerColor ? "ring-2 ring-blue-500 ring-offset-2" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setHeaderColor(color)}
                    aria-label={`Cor do menu ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Cor do rodapé */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Cor do Rodapé:</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={footerColor}
                onChange={(e) => handleColorChange(e, setFooterColor)}
                className="w-12 h-12 border-0 p-0 cursor-pointer"
              />
              <input
                type="text"
                value={footerColor}
                onChange={(e) => setFooterColor(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
                placeholder="#2d2d2d"
              />
            </div>
            <div className="mt-2">
              <label className="block text-xs text-gray-600 mb-1">Cores predefinidas:</label>
              <div className="flex flex-wrap gap-2">
                {predefinedFooterColors.map((color, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`w-8 h-8 rounded-full border ${
                      color === footerColor ? "ring-2 ring-blue-500 ring-offset-2" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setFooterColor(color)}
                    aria-label={`Cor do rodapé ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="bg-blue-800 hover:bg-blue-900 text-white py-2 px-4 rounded-md transition-colors"
          >
            Salvar Alterações
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Pré-visualização</h2>

          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <div className="p-4 h-[400px] flex flex-col" style={{ backgroundColor }}>
              {/* Simulação do menu */}
              <div className="p-3 mb-4 rounded" style={{ backgroundColor: headerColor }}>
                <div className="flex justify-between items-center">
                  <div className="text-white font-bold">Da Silva Gas</div>
                  <div className="flex space-x-4">
                    <div className="text-white text-sm">Início</div>
                    <div className="text-white text-sm">Produtos</div>
                    <div className="text-white text-sm">Localização</div>
                    <div className="text-white text-sm">Contato</div>
                  </div>
                </div>
              </div>

              {/* Conteúdo */}
              <div className="flex-grow flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-800">Conteúdo do site com a cor de fundo selecionada</p>
                  <p className="text-sm text-gray-600 mt-2">Esta é uma pré-visualização de como o site ficará</p>
                </div>
              </div>

              {/* Simulação do rodapé */}
              <div className="p-3 mt-4 rounded" style={{ backgroundColor: footerColor }}>
                <div className="flex justify-between items-center">
                  <div className="text-white text-sm">Da Silva Gas</div>
                  <div className="text-white text-xs">© 2023 Todos os direitos reservados</div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            Nota: Esta é apenas uma pré-visualização simplificada. O resultado final pode variar ligeiramente.
          </p>
        </div>
      </div>
    </div>
  )
}

