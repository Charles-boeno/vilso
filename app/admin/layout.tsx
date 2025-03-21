"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { isAuthenticated, logout } from "@/lib/auth"
import Link from "next/link"
import { useSiteContext } from "@/contexts/site-context"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { settings } = useSiteContext()

  useEffect(() => {
    // Redirecionar para a página de login se não estiver autenticado
    // Exceto se já estiver na página de login
    if (!isAuthenticated() && pathname !== "/admin") {
      router.push("/admin")
    }
  }, [router, pathname])

  // Se estiver na página de login, não mostrar o layout administrativo
  if (pathname === "/admin") {
    return <>{children}</>
  }

  const handleLogout = () => {
    logout()
    router.push("/admin")
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-800 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">{settings.companyName} - Administração</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm transition-colors"
          >
            Sair
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-64 bg-white rounded-lg shadow-md p-4 h-fit">
          <nav>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/admin/dashboard"
                  className={`block px-4 py-2 rounded-md ${
                    pathname === "/admin/dashboard" ? "bg-blue-100 text-blue-800" : "hover:bg-gray-100"
                  }`}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/dashboard/promocoes"
                  className={`block px-4 py-2 rounded-md ${
                    pathname === "/admin/dashboard/promocoes" ? "bg-blue-100 text-blue-800" : "hover:bg-gray-100"
                  }`}
                >
                  Promoções
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/dashboard/produtos"
                  className={`block px-4 py-2 rounded-md ${
                    pathname === "/admin/dashboard/produtos" ? "bg-blue-100 text-blue-800" : "hover:bg-gray-100"
                  }`}
                >
                  Produtos
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/dashboard/empresa"
                  className={`block px-4 py-2 rounded-md ${
                    pathname === "/admin/dashboard/empresa" ? "bg-blue-100 text-blue-800" : "hover:bg-gray-100"
                  }`}
                >
                  Empresa
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/dashboard/aparencia"
                  className={`block px-4 py-2 rounded-md ${
                    pathname === "/admin/dashboard/aparencia" ? "bg-blue-100 text-blue-800" : "hover:bg-gray-100"
                  }`}
                >
                  Aparência
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/dashboard/senha"
                  className={`block px-4 py-2 rounded-md ${
                    pathname === "/admin/dashboard/senha" ? "bg-blue-100 text-blue-800" : "hover:bg-gray-100"
                  }`}
                >
                  Alterar Senha
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="flex-1 bg-white rounded-lg shadow-md p-6">{children}</main>
      </div>
    </div>
  )
}

