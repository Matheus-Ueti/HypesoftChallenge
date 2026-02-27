import { useState } from 'react'
import { Pencil, Trash2, Tag } from 'lucide-react'
import { CategoryForm } from '@/components/forms/CategoryForm'
import { MOCK_CATEGORIES } from '@/utils/mocks'

// --- Tipos ---

interface CategoryWithCount {
  id: string
  name: string
  description: string
  productCount: number
}

// --- Dados simulados ---
// Serão substituídos pelos dados reais da API via TanStack Query

const INITIAL_CATEGORIES: CategoryWithCount[] = MOCK_CATEGORIES.map((cat, i) => ({
  ...cat,
  productCount: [34, 28, 22, 18, 14, 11, 9, 8][i] ?? 0,
}))

// --- Estilos ---

const page         = 'space-y-6'
const pageHeader   = 'flex items-center justify-between'
const pageTitle    = 'text-2xl font-bold text-slate-800'
const pageSubtitle = 'text-sm text-slate-500 mt-1'
const btnPrimary   = 'bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors'
const grid         = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
const card         = 'bg-white rounded-xl border border-slate-100 p-5 flex flex-col gap-4'
const cardHeader   = 'flex items-start justify-between'
const iconWrapper  = 'p-2.5 rounded-lg bg-indigo-50 text-indigo-600'
const actions      = 'flex gap-1'
const actionBtn    = 'p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors'
const cardName     = 'text-sm font-semibold text-slate-800'
const cardDesc     = 'text-xs text-slate-400 leading-relaxed'
const cardFooter   = 'flex items-center justify-between pt-2 border-t border-slate-50'
const countLabel   = 'text-xs text-slate-400'
const countValue   = 'text-xs font-semibold text-indigo-600'

// --- Sub-componente ---

interface CategoryCardProps extends CategoryWithCount {
  onDelete: (id: string) => void
}

const CategoryCard = ({ id, name, description, productCount, onDelete }: CategoryCardProps) => (
  <div className={card}>
    <div className={cardHeader}>
      <div className={iconWrapper}>
        <Tag size={16} />
      </div>
      <div className={actions}>
        <button className={actionBtn} title="Editar">
          <Pencil size={14} />
        </button>
        <button className={actionBtn} title="Excluir" onClick={() => onDelete(id)}>
          <Trash2 size={14} />
        </button>
      </div>
    </div>

    <div>
      <p className={cardName}>{name}</p>
      <p className={cardDesc}>{description}</p>
    </div>

    <div className={cardFooter}>
      <span className={countLabel}>Produtos</span>
      <span className={countValue}>{productCount}</span>
    </div>
  </div>
)

// --- Componente ---

export const Categories = () => {
  const [isOpen, setIsOpen]       = useState(false)
  const [categories, setCategories] = useState(INITIAL_CATEGORIES)

  const handleCreate = (data: { name: string; description?: string }) => {
    const newCategory: CategoryWithCount = {
      id:           String(Date.now()),
      name:         data.name,
      description:  data.description ?? '',
      productCount: 0,
    }
    setCategories((prev) => [...prev, newCategory])
    setIsOpen(false)
  }

  const handleDelete = (id: string) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id))
  }

  return (
  <div className={page}>

    {isOpen && (
      <CategoryForm
        onClose={() => setIsOpen(false)}
        onSubmit={handleCreate}
      />
    )}

    <div className={pageHeader}>
      <div>
        <h1 className={pageTitle}>Categorias</h1>
        <p className={pageSubtitle}>Gerencie as categorias de produtos</p>
      </div>
      <button className={btnPrimary} onClick={() => setIsOpen(true)}>+ Nova Categoria</button>
    </div>

    <div className={grid}>
      {categories.map((category) => (
        <CategoryCard key={category.id} {...category} onDelete={handleDelete} />
      ))}
    </div>

  </div>
  )
}