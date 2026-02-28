import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from './components/layout/MainLayout'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { Dashboard } from './pages/Dashboard'
import { Products } from './pages/Product'
import { Categories } from './pages/Categories'
import { Settings } from './pages/Settings'
import { AuthContext } from './contexts/AuthContext'
import { useAuth } from './hooks/useAuth'

// --- Estilos ---

const loadingScreen = 'flex h-screen items-center justify-center bg-slate-50'
const loadingText   = 'text-sm text-slate-500'

// --- Componente ---

export const App = () => {
  const { isAuthenticated, isLoading, logout } = useAuth()

  if (isLoading) {
    return (
      <div className={loadingScreen}>
        <p className={loadingText}>Carregando...</p>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ logout }}>
      <BrowserRouter>
        <Routes>

          {/* Rotas protegidas */}
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route element={<MainLayout />}>
              <Route path="/"           element={<Dashboard />} />
              <Route path="/products"   element={<Products />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/settings"   element={<Settings />} />
            </Route>
          </Route>

          {/* Rota não encontrada → volta para home */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}
