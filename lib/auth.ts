// Credenciais padrão (serão usadas apenas na primeira vez)
const DEFAULT_USERNAME = "admin"
const DEFAULT_PASSWORD = "admin123"

// Inicializar a senha no localStorage se não existir
if (typeof window !== "undefined") {
  if (!localStorage.getItem("adminPassword")) {
    localStorage.setItem("adminPassword", DEFAULT_PASSWORD)
  }
}

// Verificar se o usuário está autenticado
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false

  const token = localStorage.getItem("adminToken")
  return token === "authenticated"
}

// Fazer login
export function login(username: string, password: string): boolean {
  // Verificar se o nome de usuário é o padrão
  if (username !== DEFAULT_USERNAME) return false

  // Obter a senha atual do localStorage
  const currentPassword = localStorage.getItem("adminPassword") || DEFAULT_PASSWORD

  if (password === currentPassword) {
    localStorage.setItem("adminToken", "authenticated")
    return true
  }
  return false
}

// Fazer logout
export function logout(): void {
  localStorage.removeItem("adminToken")
}

// Alterar a senha do administrador
export function changePassword(currentPassword: string, newPassword: string): boolean {
  // Verificar se a senha atual está correta
  const storedPassword = localStorage.getItem("adminPassword") || DEFAULT_PASSWORD

  if (currentPassword === storedPassword) {
    localStorage.setItem("adminPassword", newPassword)
    return true
  }
  return false
}

