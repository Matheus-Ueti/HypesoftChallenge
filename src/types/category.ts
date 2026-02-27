export interface Category {
  id: string
  name: string
  description?: string
  createdAt: string
}

export interface CreateCategoryDTO {
  name: string
  description?: string
}