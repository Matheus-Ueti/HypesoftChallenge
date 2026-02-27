import { useState, useEffect } from 'react'
import { keycloak } from '../lib/keycloak'
import type { User } from '../types/auth'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    keycloak.init({ onLoad: 'login-required' }).then((authenticated) => {
      setIsAuthenticated(authenticated)

      if (authenticated && keycloak.tokenParsed) {
        setUser({
          id: keycloak.tokenParsed.sub ?? '',
          name: keycloak.tokenParsed.name ?? '',
          email: keycloak.tokenParsed.email ?? '',
          roles: keycloak.realmAccess?.roles ?? [],
        })
      }

      setIsLoading(false)
    })
  }, [])

  const logout = () => keycloak.logout()

  return { user, isAuthenticated, isLoading, logout }
}