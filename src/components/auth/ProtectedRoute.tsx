import { Navigate, Outlet } from 'react-router-dom'

// --- Tipos ---

interface ProtectedRouteProps {
  isAuthenticated: boolean
}

// --- Componente ---

// Por enquanto a autenticação é simulada.
// Quando o Keycloak estiver integrado, basta trocar o valor de isAuthenticated.

export const ProtectedRoute = ({ isAuthenticated }: ProtectedRouteProps) => {
  if (!isAuthenticated) return <Navigate to="/" replace />

  return <Outlet />
}
