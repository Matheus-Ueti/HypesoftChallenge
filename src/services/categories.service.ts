import type { Category, CreateCategoryDTO } from '@/types/category'

const BASE_URL = `${import.meta.env.VITE_API_URL}/categories`

export const categoriesService = {
  getAll: async (): Promise<Category[]> => {
    const response = await fetch(BASE_URL)
    if (!response.ok) throw new Error('Erro ao buscar categorias')
    return response.json()
  },

  getById: async (id: string): Promise<Category> => {
    const response = await fetch(`${BASE_URL}/${id}`)
    if (!response.ok) throw new Error('Categoria não encontrada')
    return response.json()
  },

  create: async (data: CreateCategoryDTO): Promise<Category> => {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error('Erro ao criar categoria')
    return response.json()
  },

  remove: async (id: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
    if (!response.ok) throw new Error('Erro ao excluir categoria')
  },
}
