import { createContext, useContext } from 'react'
interface AuthContextValue {
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue>({ logout: () => {} })
export const useAuthContext = () => useContext(AuthContext)
