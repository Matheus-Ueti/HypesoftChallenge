import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from './components/layout/MainLayout'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { Dashboard } from './pages/Dashboard'
import { Products } from './pages/Product'
import { Categories } from './pages/Categories'
import { Settings } from './pages/Settings'

// Simulado como true — será substituído pelo hook do Keycloak
const isAuthenticated = true

export const App = () => (
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
)