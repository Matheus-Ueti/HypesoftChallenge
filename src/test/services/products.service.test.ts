import { productsService } from '@/services/products.service'

const BASE_URL = `${import.meta.env.VITE_API_URL}/products`

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
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('getAll retorna lista de produtos', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(JSON.stringify([mockProduct]), { status: 200 })
    )
    const result = await productsService.getAll()
    expect(fetch).toHaveBeenCalledWith(BASE_URL)
    expect(result).toEqual([mockProduct])
  })

  it('getAll lança erro se a resposta não for ok', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(null, { status: 500 })
    )
    await expect(productsService.getAll()).rejects.toThrow('Erro ao buscar produtos')
  })

  it('create envia POST com os dados corretos', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(JSON.stringify(mockProduct), { status: 200 })
    )
    const payload = {
      name: 'Cabo USB-C', description: 'Cabo de 2 metros',
      price: 39.90, categoryId: '1', stock: 10,
    }
    const result = await productsService.create(payload)
    expect(fetch).toHaveBeenCalledWith(BASE_URL, expect.objectContaining({
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    }))
    expect(result).toEqual(mockProduct)
  })

  it('remove envia DELETE para o endpoint correto', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(null, { status: 200 })
    )
    await productsService.remove('1')
    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/1`, { method: 'DELETE' })
  })
})
