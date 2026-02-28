import { useState, useMemo } from 'react'
import { Pencil, Trash2, Search } from 'lucide-react'
import { ProductForm } from '@/components/forms/ProductForm'
import {
  useProducts,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
} from '@/hooks/useProducts'
import { useCategories } from '@/hooks/useCategories'
import { Button } from '@/components/ui/button'
import { Input }  from '@/components/ui/input'
import { Badge }  from '@/components/ui/badge'
import type { Product, CreateProductDTO } from '@/types/product'

const formatPrice = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const selectCls = 'pl-3 pr-8 py-2 text-sm border border-input rounded-md outline-none focus:ring-1 focus:ring-ring bg-background text-slate-700'

const StockBadge = ({ stock }: { stock: number }) => (
  <Badge variant={stock <= 5 ? 'destructive' : 'secondary'}>
    {stock} un.
  </Badge>
)

export const Products = () => {
  const { data: products = [], isLoading, isError } = useProducts()
  const { data: categories = [] }                   = useCategories()

  const createProduct = useCreateProduct()
  const updateProduct = useUpdateProduct()
  const deleteProduct = useDeleteProduct()

  const [isOpen, setIsOpen]                 = useState(false)
  const [editing, setEditing]               = useState<Product | null>(null)
  const [search, setSearch]                 = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')

  const categoryName = (categoryId: string) =>
    categories.find((c) => c.id === categoryId)?.name ?? '-'

  const filtered = useMemo(() =>
    products.filter((p) => {
      const matchesName     = p.name.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = categoryFilter === '' || p.categoryId === categoryFilter
      return matchesName && matchesCategory
    }),
    [products, search, categoryFilter]
  )

  const handleCreate = (data: CreateProductDTO) => {
    createProduct.mutate(data, { onSuccess: () => setIsOpen(false) })
  }

  const handleEdit = (data: CreateProductDTO) => {
    if (!editing) return
    updateProduct.mutate({ id: editing.id, data }, { onSuccess: () => setEditing(null) })
  }

  const handleDelete = (id: string) => deleteProduct.mutate(id)

  return (
  <div className="space-y-6">

    {isOpen && (
      <ProductForm onClose={() => setIsOpen(false)} onSubmit={handleCreate} />
    )}

    {editing && (
      <ProductForm
        defaultValues={editing}
        onClose={() => setEditing(null)}
        onSubmit={handleEdit}
      />
    )}

    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Produtos</h1>
        <p className="text-sm text-slate-500 mt-1">Gerencie todos os produtos do sistema</p>
      </div>
      <Button onClick={() => setIsOpen(true)}>+ Novo Produto</Button>
    </div>

    <div className="flex items-center gap-3">
      <div className="relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        <Input
          className="pl-9 w-64"
          placeholder="Buscar por nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <select
        className={selectCls}
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        aria-label="Filtrar por categoria"
      >
        <option value="">Todas as categorias</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>
    </div>

    <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
      {isLoading && <p className="text-center text-sm text-slate-400 py-20">Carregando produtos...</p>}
      {isError   && <p className="text-center text-sm text-red-500 py-20">Erro ao carregar produtos. Tente novamente.</p>}

      {!isLoading && !isError && (
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              {['Nome', 'Categoria', 'Preço', 'Estoque', 'Ações'].map((h) => (
                <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-5 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={5} className="text-center text-sm text-slate-400 py-10">Nenhum produto encontrado.</td></tr>
            ) : (
              filtered.map((product) => (
                <tr key={product.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors last:border-0">
                  <td className="px-5 py-3 text-slate-700">{product.name}</td>
                  <td className="px-5 py-3 text-slate-400">{categoryName(product.categoryId)}</td>
                  <td className="px-5 py-3 text-slate-700">{formatPrice(product.price)}</td>
                  <td className="px-5 py-3"><StockBadge stock={product.stock} /></td>
                  <td className="px-5 py-3">
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" title="Editar" onClick={() => setEditing(product)}>
                        <Pencil size={15} />
                      </Button>
                      <Button variant="ghost" size="icon" title="Excluir"
                        className="text-slate-400 hover:text-red-600 hover:bg-red-50"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 size={15} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>

  </div>
  )
}