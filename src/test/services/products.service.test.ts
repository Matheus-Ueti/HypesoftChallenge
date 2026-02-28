import { productsService } from '@/services/products.service'
import { api } from '@/lib/api'

const mockProduct = {
  id:          '1',
  name:        'Cabo USB-C',
  description: 'Cabo de 2 metros',
  price:       39.90,
  categoryId:  '1',
  stock:       10,
  createdAt:   '2026-01-01',
  updatedAt:   '2026-01-01',
}

describe('productsService', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('getAll retorna lista de produtos', async () => {
    vi.spyOn(api, 'get').mockResolvedValueOnce({ data: [mockProduct] })

    const result = await productsService.getAll()

    expect(api.get).toHaveBeenCalledWith('/products')
    expect(result).toEqual([mockProduct])
  })

  it('getAll lança erro se a API falhar', async () => {
    vi.spyOn(api, 'get').mockRejectedValueOnce(new Error('Erro ao buscar produtos'))

    await expect(productsService.getAll()).rejects.toThrow('Erro ao buscar produtos')
  })

  it('create envia POST com os dados corretos', async () => {
    vi.spyOn(api, 'post').mockResolvedValueOnce({ data: mockProduct })

    const payload = {
      name: 'Cabo USB-C', description: 'Cabo de 2 metros',
      price: 39.90, categoryId: '1', stock: 10,
    }
    const result = await productsService.create(payload)

    expect(api.post).toHaveBeenCalledWith('/products', payload)
    expect(result).toEqual(mockProduct)
  })

  it('remove envia DELETE para o endpoint correto', async () => {
    vi.spyOn(api, 'delete').mockResolvedValueOnce({ data: undefined })

    await productsService.remove('1')

    expect(api.delete).toHaveBeenCalledWith('/products/1')
  })
})
