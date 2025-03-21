"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

// Tipos de dados
export interface Promotion {
  id: number
  title: string
  image: string
  alt: string
}

export interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
}

// Interface SiteSettings
export interface SiteSettings {
  backgroundColor: string
  headerColor: string
  footerColor: string
  companyName: string
  address: string
  city: string
  state: string
  zipCode: string
  phone: string
  email: string
  cnpj: string
  whatsappProducts: string
  mapEmbedUrl: string
  socialMedia: {
    instagram: string
    facebook: string
  }
  workingHours: {
    weekdays: string
    saturday: string
    sunday: string
  }
}

// Dados iniciais para promoções
const initialPromotions: Promotion[] = [
  {
    id: 1,
    title: "Promoção do Mês: Gás P13",
    image: "/placeholder.svg?height=400&width=800",
    alt: "Promoção de gás P13",
  },
  {
    id: 2,
    title: "Frete Grátis para compras acima de R$ 150,00!",
    image: "/placeholder.svg?height=400&width=800",
    alt: "Promoção de frete grátis",
  },
  {
    id: 3,
    title: "Novos clientes ganham 10% de desconto!",
    image: "/placeholder.svg?height=400&width=800",
    alt: "Promoção para novos clientes",
  },
]

// Dados iniciais para produtos
const initialProducts: Product[] = [
  {
    id: 1,
    name: "Botijão P13",
    description: "Gás Ultragaz - 13kg",
    price: 80.0,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Botijão P45",
    description: "Gás Ultragaz - 45kg",
    price: 350.0,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Botijão P20",
    description: "Gás Ultragaz - 20kg",
    price: 160.0,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Botijão P08",
    description: "Gás Ultragaz - 8kg",
    price: 70.0,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    name: "Botijão P13 + Regulador",
    description: "Kit completo com regulador",
    price: 120.0,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    name: "Regulador de Pressão",
    description: "Para botijões residenciais",
    price: 35.0,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 7,
    name: "Mangueira de Gás",
    description: "1,5m com abraçadeiras",
    price: 25.0,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 8,
    name: "Kit Instalação Completo",
    description: "Mangueira, regulador e abraçadeiras",
    price: 55.0,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 9,
    name: "Botijão P13 Recarga",
    description: "Apenas recarga (traga seu botijão)",
    price: 75.0,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 10,
    name: "Botijão P45 Recarga",
    description: "Apenas recarga (traga seu botijão)",
    price: 320.0,
    image: "/placeholder.svg?height=200&width=200",
  },
]

// Configurações iniciais
const initialSettings: SiteSettings = {
  backgroundColor: "#ffffff", // Cor de fundo padrão (branco)
  headerColor: "#0055A4", // Cor do menu padrão (azul)
  footerColor: "#2d2d2d", // Cor do rodapé padrão (cinza escuro)
  companyName: "Da Silva Gas",
  address: "Av. Paulista, 1000 - Bela Vista",
  city: "São Paulo",
  state: "SP",
  zipCode: "01310-100",
  phone: "(11) 99999-9999",
  email: "contato@dasilvagas.com.br",
  cnpj: "00.000.000/0001-00",
  whatsappProducts: "(11) 99999-9999",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1975132509186!2d-46.6522202!3d-23.5646162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzUyLjciUyA0NsKwMzknMDguMCJX!5e0!3m2!1spt-BR!2sbr!4v1616000000000!5m2!1spt-BR!2sbr",
  socialMedia: {
    instagram: "https://instagram.com/dasilvagas",
    facebook: "https://facebook.com/dasilvagas",
  },
  workingHours: {
    weekdays: "08:00 - 18:00",
    saturday: "08:00 - 12:00",
    sunday: "Fechado",
  },
}

// Interface do contexto
interface SiteContextType {
  promotions: Promotion[]
  products: Product[]
  settings: SiteSettings
  updatePromotion: (promotion: Promotion) => void
  updateProduct: (product: Product) => void
  updateSettings: (settings: Partial<SiteSettings>) => void
}

// Criação do contexto
const SiteContext = createContext<SiteContextType | undefined>(undefined)

// Hook para usar o contexto
export function useSiteContext() {
  const context = useContext(SiteContext)
  if (context === undefined) {
    throw new Error("useSiteContext must be used within a SiteProvider")
  }
  return context
}

// Provider do contexto
export function SiteProvider({ children }: { children: ReactNode }) {
  const [promotions, setPromotions] = useState<Promotion[]>(initialPromotions)
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [settings, setSettings] = useState<SiteSettings>(initialSettings)
  const [isInitialized, setIsInitialized] = useState(false)

  // Carregar dados do localStorage ao iniciar
  useEffect(() => {
    if (typeof window !== "undefined" && !isInitialized) {
      try {
        console.log("Carregando dados do localStorage...")

        const storedPromotions = localStorage.getItem("promotions")
        const storedProducts = localStorage.getItem("products")
        const storedSettings = localStorage.getItem("siteSettings")

        if (storedPromotions) {
          console.log("Promoções encontradas no localStorage")
          setPromotions(JSON.parse(storedPromotions))
        }

        if (storedProducts) {
          console.log("Produtos encontrados no localStorage")
          setProducts(JSON.parse(storedProducts))
        }

        if (storedSettings) {
          console.log("Configurações encontradas no localStorage")
          // Garantir que todas as propriedades existam
          const parsedSettings = JSON.parse(storedSettings)
          setSettings({
            ...initialSettings,
            ...parsedSettings,
            // Garantir que socialMedia e workingHours existam
            socialMedia: {
              ...initialSettings.socialMedia,
              ...(parsedSettings.socialMedia || {}),
            },
            workingHours: {
              ...initialSettings.workingHours,
              ...(parsedSettings.workingHours || {}),
            },
          })
        }

        setIsInitialized(true)
      } catch (error) {
        console.error("Erro ao carregar dados do localStorage:", error)
        // Em caso de erro, usar os dados iniciais
      }
    }
  }, [isInitialized])

  // Salvar dados no localStorage quando mudam
  useEffect(() => {
    if (typeof window !== "undefined" && isInitialized) {
      try {
        console.log("Salvando promoções no localStorage...")
        localStorage.setItem("promotions", JSON.stringify(promotions))
      } catch (error) {
        console.error("Erro ao salvar promoções:", error)
      }
    }
  }, [promotions, isInitialized])

  useEffect(() => {
    if (typeof window !== "undefined" && isInitialized) {
      try {
        console.log("Salvando produtos no localStorage...")
        localStorage.setItem("products", JSON.stringify(products))
      } catch (error) {
        console.error("Erro ao salvar produtos:", error)
      }
    }
  }, [products, isInitialized])

  useEffect(() => {
    if (typeof window !== "undefined" && isInitialized) {
      try {
        console.log("Salvando configurações no localStorage...")
        localStorage.setItem("siteSettings", JSON.stringify(settings))

        // Aplicar a cor de fundo ao elemento body
        document.body.style.backgroundColor = settings.backgroundColor
      } catch (error) {
        console.error("Erro ao salvar configurações:", error)
      }
    }
  }, [settings, isInitialized])

  // Função para atualizar uma promoção
  const updatePromotion = (updatedPromotion: Promotion) => {
    console.log("Atualizando promoção:", updatedPromotion)
    setPromotions((prevPromotions) =>
      prevPromotions.map((promo) => (promo.id === updatedPromotion.id ? updatedPromotion : promo)),
    )
  }

  // Função para atualizar um produto
  const updateProduct = (updatedProduct: Product) => {
    console.log("Atualizando produto:", updatedProduct)
    setProducts((prevProducts) =>
      prevProducts.map((product) => (product.id === updatedProduct.id ? updatedProduct : product)),
    )
  }

  // Função para atualizar as configurações
  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    console.log("Atualizando configurações:", newSettings)
    setSettings((prevSettings) => {
      // Tratamento especial para objetos aninhados
      const updatedSettings = { ...prevSettings, ...newSettings }

      // Se socialMedia estiver sendo atualizado parcialmente
      if (newSettings.socialMedia) {
        updatedSettings.socialMedia = {
          ...prevSettings.socialMedia,
          ...newSettings.socialMedia,
        }
      }

      // Se workingHours estiver sendo atualizado parcialmente
      if (newSettings.workingHours) {
        updatedSettings.workingHours = {
          ...prevSettings.workingHours,
          ...newSettings.workingHours,
        }
      }

      return updatedSettings
    })
  }

  return (
    <SiteContext.Provider
      value={{
        promotions,
        products,
        settings,
        updatePromotion,
        updateProduct,
        updateSettings,
      }}
    >
      {children}
    </SiteContext.Provider>
  )
}

