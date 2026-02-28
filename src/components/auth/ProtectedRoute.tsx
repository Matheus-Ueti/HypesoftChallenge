import { Navigate, Outlet } from 'react-router-dom'

interface ProtectedRouteProps {
  isAuthenticated: boolean
}

export const ProtectedRoute = ({ isAuthenticated }: ProtectedRouteProps) => {
  if (!isAuthenticated) return <Navigate to="/" replace />

  return <Outlet />
}
