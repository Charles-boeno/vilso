"use client"

import type React from "react"

import { useState } from "react"
import { changePassword } from "@/lib/auth"

export default function AdminSenhaPage() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Limpar mensagens anteriores
    setSuccessMessage("")
    setErrorMessage("")

    // Validar se as senhas novas coincidem
    if (newPassword !== confirmPassword) {
      setErrorMessage("A nova senha e a confirmação não coincidem.")
      return
    }

    // Validar comprimento mínimo da senha
    if (newPassword.length < 6) {
      setErrorMessage("A nova senha deve ter pelo menos 6 caracteres.")
      return
    }

    // Tentar alterar a senha
    const success = changePassword(currentPassword, newPassword)

    if (success) {
      setSuccessMessage("Senha alterada com sucesso!")
      // Limpar os campos
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } else {
      setErrorMessage("A senha atual está incorreta.")
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Alterar Senha de Administrador</h1>

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{errorMessage}</div>
      )}

      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 mb-6">
        <h2 className="text-lg font-semibold mb-2">Instruções para alterar a senha:</h2>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Digite sua senha atual para confirmar sua identidade</li>
          <li>Digite a nova senha (mínimo de 6 caracteres)</li>
          <li>Confirme a nova senha digitando-a novamente</li>
          <li>Clique em "Alterar Senha" para salvar as alterações</li>
        </ol>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Senha Atual
            </label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Nova Senha
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
              minLength={6}
            />
            <p className="text-xs text-gray-500 mt-1">A senha deve ter pelo menos 6 caracteres</p>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar Nova Senha
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="bg-blue-800 hover:bg-blue-900 text-white py-2 px-4 rounded-md transition-colors"
            >
              Alterar Senha
            </button>
          </div>
        </form>
      </div>

      <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-lg">
        <h3 className="text-lg font-semibold text-red-800 mb-2">Importante!</h3>
        <p className="text-red-700">
          Lembre-se de guardar sua nova senha em um local seguro. Se você esquecer sua senha, não será possível
          recuperá-la.
        </p>
      </div>
    </div>
  )
}

