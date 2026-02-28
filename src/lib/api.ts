import axios from 'axios'
import { keycloak } from './keycloak'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5000',
})

api.interceptors.request.use((config) => {
  const token = keycloak.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})