import { useState, useEffect } from 'react'
import { keycloak } from '../lib/keycloak'
import type { User } from '../types/auth'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    keycloak
      .init({ onLoad: 'check-sso' })
      .then((authenticated) => {
        if (!authenticated) {
          // Keycloak disponível mas usuário não logado → redireciona para login do Keycloak
          keycloak.login()
          return
        }

        setIsAuthenticated(true)

        if (keycloak.tokenParsed) {
          setUser({
            id: keycloak.tokenParsed.sub ?? '',
            name: keycloak.tokenParsed.name ?? '',
            email: keycloak.tokenParsed.email ?? '',
            roles: keycloak.realmAccess?.roles ?? [],
          })
        }
      })
      .catch(() => {
        // Keycloak não disponível (dev sem servidor) → libera acesso
        setIsAuthenticated(true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const logout = () => keycloak.logout()

  return { user, isAuthenticated, isLoading, logout }
}