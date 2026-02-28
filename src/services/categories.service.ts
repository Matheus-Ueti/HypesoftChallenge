import { api } from '@/lib/api'
import type { Category, CreateCategoryDTO, UpdateCategoryDTO } from '@/types/category'

const BASE = '/categories'

export const categoriesService = {
  getAll:  (): Promise<Category[]>  => api.get<Category[]>(BASE).then((r) => r.data),
  getById: (id: string)             => api.get<Category>(`${BASE}/${id}`).then((r) => r.data),
  create:  (data: CreateCategoryDTO)           => api.post<Category>(BASE, data).then((r) => r.data),
  update:  (id: string, data: UpdateCategoryDTO) => api.put<Category>(`${BASE}/${id}`, data).then((r) => r.data),
  remove:  (id: string)             => api.delete(`${BASE}/${id}`).then(() => undefined),
}
