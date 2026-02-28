import { createContext, useContext } from 'react'

// --- Tipos ---

interface AuthContextValue {
  logout: () => void
}

// --- Contexto ---

export const AuthContext = createContext<AuthContextValue>({ logout: () => {} })

export const useAuthContext = () => useContext(AuthContext)
