import type { Product, CreateProductDTO, UpdateProductDTO } from '@/types/product'

const BASE_URL = `${import.meta.env.VITE_API_URL}/products`

export const productsService = {
  getAll: async (): Promise<Product[]> => {
    const response = await fetch(BASE_URL)
    if (!response.ok) throw new Error('Erro ao buscar produtos')
    return response.json()
  },

  getById: async (id: string): Promise<Product> => {
    const response = await fetch(`${BASE_URL}/${id}`)
    if (!response.ok) throw new Error('Produto não encontrado')
    return response.json()
  },

  create: async (data: CreateProductDTO): Promise<Product> => {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error('Erro ao criar produto')
    return response.json()
  },

  update: async (id: string, data: UpdateProductDTO): Promise<Product> => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error('Erro ao atualizar produto')
    return response.json()
  },

  remove: async (id: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
    if (!response.ok) throw new Error('Erro ao excluir produto')
  },
}
