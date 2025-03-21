import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
// Importe o SiteProvider
import { SiteProvider } from "@/contexts/site-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Da Silva Gas - Revenda de Gás",
  description: "Revenda autorizada de gás com os melhores preços e entrega rápida.",
    generator: 'v0.dev'
}

// Modifique o RootLayout para incluir o SiteProvider
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <SiteProvider>
          <Header />
          <main className="min-h-screen pt-16">{children}</main>
          <Footer />
          <WhatsAppButton />
        </SiteProvider>
      </body>
    </html>
  )
}



import './globals.css'