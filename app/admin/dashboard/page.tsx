"use client"

import { useState } from "react"

export default function AdminDashboardPage() {
  const [resetMessage, setResetMessage] = useState("")

  const handleResetLocalStorage = () => {
    if (typeof window !== "undefined") {
      if (confirm("Tem certeza que deseja redefinir todas as configurações? Esta ação não pode ser desfeita.")) {
        try {
          localStorage.clear()
          setResetMessage("Configurações redefinidas com sucesso. Recarregue a página para aplicar as mudanças.")
        } catch (error) {
          console.error("Erro ao limpar localStorage:", error)
          setResetMessage("Erro ao redefinir configurações. Tente novamente.")
        }
      }
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Painel Administrativo</h1>

      {resetMessage && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          {resetMessage}
          <button onClick={() => window.location.reload()} className="ml-4 underline">
            Recarregar agora
          </button>
        </div>
      )}

      <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 mb-6">
        <h2 className="text-xl font-semibold mb-4">Bem-vindo à área administrativa</h2>
        <p className="text-gray-700 mb-4">Aqui você pode gerenciar facilmente o conteúdo do seu site.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-lg mb-2">Gerenciar Promoções</h3>
            <p className="text-gray-600 mb-3">Edite os textos e imagens das promoções exibidas no carrossel.</p>
            <a
              href="/admin/dashboard/promocoes"
              className="inline-block bg-blue-800 hover:bg-blue-900 text-white py-2 px-4 rounded-md transition-colors"
            >
              Editar Promoções
            </a>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-lg mb-2">Gerenciar Produtos</h3>
            <p className="text-gray-600 mb-3">Atualize nomes, descrições e imagens dos produtos.</p>
            <a
              href="/admin/dashboard/produtos"
              className="inline-block bg-blue-800 hover:bg-blue-900 text-white py-2 px-4 rounded-md transition-colors"
            >
              Editar Produtos
            </a>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-lg mb-2">Informações da Empresa</h3>
            <p className="text-gray-600 mb-3">Atualize nome, endereço e contatos da empresa.</p>
            <a
              href="/admin/dashboard/empresa"
              className="inline-block bg-blue-800 hover:bg-blue-900 text-white py-2 px-4 rounded-md transition-colors"
            >
              Editar Informações
            </a>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-lg mb-2">Configurar Aparência</h3>
            <p className="text-gray-600 mb-3">Personalize a aparência do site, incluindo a cor de fundo.</p>
            <a
              href="/admin/dashboard/aparencia"
              className="inline-block bg-blue-800 hover:bg-blue-900 text-white py-2 px-4 rounded-md transition-colors"
            >
              Configurar Aparência
            </a>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-lg mb-2">Segurança</h3>
            <p className="text-gray-600 mb-3">Altere a senha de acesso à área administrativa.</p>
            <a
              href="/admin/dashboard/senha"
              className="inline-block bg-blue-800 hover:bg-blue-900 text-white py-2 px-4 rounded-md transition-colors"
            >
              Alterar Senha
            </a>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-100 mb-6">
        <h2 className="text-xl font-semibold mb-4">Instruções de Uso</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg">Como editar promoções:</h3>
            <ol className="list-decimal list-inside ml-4 mt-2 space-y-1">
              <li>Acesse a seção "Editar Promoções"</li>
              <li>Selecione a promoção que deseja modificar</li>
              <li>Altere o texto da promoção conforme necessário</li>
              <li>Atualize a URL da imagem para mudar a imagem exibida</li>
              <li>Clique em "Salvar Alterações"</li>
            </ol>
          </div>

          <div>
            <h3 className="font-semibold text-lg">Como editar produtos:</h3>
            <ol className="list-decimal list-inside ml-4 mt-2 space-y-1">
              <li>Acesse a seção "Editar Produtos"</li>
              <li>Selecione o produto que deseja modificar</li>
              <li>Atualize o nome e descrição conforme necessário</li>
              <li>Altere a URL da imagem para mudar a imagem do produto</li>
              <li>Clique em "Salvar Alterações"</li>
            </ol>
          </div>

          <div>
            <h3 className="font-semibold text-lg">Como editar informações da empresa:</h3>
            <ol className="list-decimal list-inside ml-4 mt-2 space-y-1">
              <li>Acesse a seção "Empresa"</li>
              <li>Atualize o nome, endereço e informações de contato</li>
              <li>Modifique os horários de funcionamento conforme necessário</li>
              <li>Atualize o link do mapa para mostrar a localização correta</li>
              <li>Clique em "Salvar Alterações" para aplicar</li>
            </ol>
          </div>

          <div>
            <h3 className="font-semibold text-lg">Como personalizar a aparência:</h3>
            <ol className="list-decimal list-inside ml-4 mt-2 space-y-1">
              <li>Acesse a seção "Aparência"</li>
              <li>Escolha cores para o fundo do site, menu e rodapé</li>
              <li>Visualize as alterações na pré-visualização</li>
              <li>Clique em "Salvar Alterações" para aplicar</li>
            </ol>
          </div>

          <div>
            <h3 className="font-semibold text-lg">Como alterar a senha de administrador:</h3>
            <ol className="list-decimal list-inside ml-4 mt-2 space-y-1">
              <li>Acesse a seção "Alterar Senha"</li>
              <li>Digite sua senha atual para confirmar sua identidade</li>
              <li>Digite e confirme sua nova senha</li>
              <li>Clique em "Alterar Senha" para salvar</li>
            </ol>
          </div>

          <div className="mt-4 p-3 bg-yellow-100 rounded-md text-yellow-800 text-sm">
            <strong>Dica:</strong> Todas as alterações são salvas automaticamente e aparecem imediatamente no site.
          </div>
        </div>
      </div>

      <div className="bg-red-50 p-6 rounded-lg border border-red-100">
        <h2 className="text-xl font-semibold mb-4 text-red-800">Opções Avançadas</h2>
        <p className="text-red-700 mb-4">
          Estas opções são para uso avançado e podem causar perda de dados. Use com cautela.
        </p>
        <button
          onClick={handleResetLocalStorage}
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors"
        >
          Redefinir Todas as Configurações
        </button>
        <p className="text-sm text-red-600 mt-2">
          Esta ação irá restaurar todas as configurações para os valores padrão. Você perderá todas as personalizações.
        </p>
      </div>
    </div>
  )
}

