export interface Product {
  id: string
  name: string
  description: string
  price: number
  categoryId: string
  stock: number
  createdAt: string
  updatedAt: string
}

export interface CreateProductDTO {
  name: string
  description: string
  price: number
  categoryId: string
  stock: number
}

export type UpdateProductDTO = Partial<CreateProductDTO>