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
import type { Product, CreateProductDTO } from '@/types/product'

const formatPrice = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

// --- Estilos ---

const page            = 'space-y-6'
const pageHeader      = 'flex items-center justify-between'
const pageTitle       = 'text-2xl font-bold text-slate-800'
const pageSubtitle    = 'text-sm text-slate-500 mt-1'
const btnPrimary      = 'bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors'
const card            = 'bg-white rounded-xl border border-slate-100 overflow-hidden'
const table           = 'w-full text-sm'
const thead           = 'bg-slate-50 border-b border-slate-100'
const th              = 'text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-5 py-3'
const tr              = 'border-b border-slate-50 hover:bg-slate-50 transition-colors last:border-0'
const td              = 'px-5 py-3 text-slate-700'
const tdMuted         = 'px-5 py-3 text-slate-400'
const badgeNormal     = 'text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600'
const badgeDanger     = 'text-xs font-medium px-2 py-0.5 rounded-full bg-red-50 text-red-500'
const actionBtn       = 'p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors'
const actionBtnDanger = 'p-1.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors'
const searchWrapper   = 'relative'
const searchIcon      = 'absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none'
const searchInput     = 'pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition w-64'
const emptyRow        = 'text-center text-sm text-slate-400 py-10'
const filtersRow      = 'flex items-center gap-3'
const select          = 'pl-3 pr-8 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition bg-white text-slate-700'
const feedbackMsg     = 'text-center text-sm text-slate-400 py-20'
const errorMsg        = 'text-center text-sm text-red-500 py-20'

// --- Sub-componentes ---

const StockBadge = ({ stock }: { stock: number }) => (
  <span className={stock <= 5 ? badgeDanger : badgeNormal}>
    {stock} un.
  </span>
)

// --- Componente ---

export const Products = () => {
  const { data: products = [], isLoading, isError } = useProducts()
  const { data: categories = [] }                   = useCategories()

  const createProduct = useCreateProduct()
  const updateProduct = useUpdateProduct()
  const deleteProduct = useDeleteProduct()

  const [isOpen, setIsOpen]               = useState(false)
  const [editing, setEditing]             = useState<Product | null>(null)
  const [search, setSearch]               = useState('')
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
  <div className={page}>

    {isOpen && (
      <ProductForm
        onClose={() => setIsOpen(false)}
        onSubmit={handleCreate}
      />
    )}

    {editing && (
      <ProductForm
        defaultValues={editing}
        onClose={() => setEditing(null)}
        onSubmit={handleEdit}
      />
    )}

    <div className={pageHeader}>
      <div>
        <h1 className={pageTitle}>Produtos</h1>
        <p className={pageSubtitle}>Gerencie todos os produtos do sistema</p>
      </div>
      <button className={btnPrimary} onClick={() => setIsOpen(true)}>+ Novo Produto</button>
    </div>

    <div className={filtersRow}>
      <div className={searchWrapper}>
        <Search size={15} className={searchIcon} />
        <input
          className={searchInput}
          placeholder="Buscar por nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <select
        className={select}
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

    <div className={card}>
      {isLoading && <p className={feedbackMsg}>Carregando produtos...</p>}
      {isError   && <p className={errorMsg}>Erro ao carregar produtos. Tente novamente.</p>}

      {!isLoading && !isError && (
        <table className={table}>
          <thead className={thead}>
            <tr>
              <th className={th}>Nome</th>
              <th className={th}>Categoria</th>
              <th className={th}>Preço</th>
              <th className={th}>Estoque</th>
              <th className={th}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={5} className={emptyRow}>Nenhum produto encontrado.</td></tr>
            ) : (
              filtered.map((product) => (
                <tr key={product.id} className={tr}>
                  <td className={td}>{product.name}</td>
                  <td className={tdMuted}>{categoryName(product.categoryId)}</td>
                  <td className={td}>{formatPrice(product.price)}</td>
                  <td className={td}><StockBadge stock={product.stock} /></td>
                  <td className={td}>
                    <div className="flex gap-1">
                      <button className={actionBtn} title="Editar" onClick={() => setEditing(product)}>
                        <Pencil size={15} />
                      </button>
                      <button className={actionBtnDanger} title="Excluir" onClick={() => handleDelete(product.id)}>
                        <Trash2 size={15} />
                      </button>
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