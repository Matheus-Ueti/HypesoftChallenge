import { useState } from 'react'
import { Pencil, Trash2, Tag } from 'lucide-react'
import { CategoryForm } from '@/components/forms/CategoryForm'
import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from '@/hooks/useCategories'
import { useProducts } from '@/hooks/useProducts'
import type { Category } from '@/types/category'

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
const feedbackMsg  = 'text-center text-sm text-slate-400 py-20'
const errorMsg     = 'text-center text-sm text-red-500 py-20'

// --- Sub-componente ---

interface CategoryCardProps {
  category:     Category
  productCount: number
  onEdit:       (category: Category) => void
  onDelete:     (id: string) => void
}

const CategoryCard = ({ category, productCount, onEdit, onDelete }: CategoryCardProps) => (
  <div className={card}>
    <div className={cardHeader}>
      <div className={iconWrapper}>
        <Tag size={16} />
      </div>
      <div className={actions}>
        <button className={actionBtn} title="Editar" onClick={() => onEdit(category)}>
          <Pencil size={14} />
        </button>
        <button className={actionBtn} title="Excluir" onClick={() => onDelete(category.id)}>
          <Trash2 size={14} />
        </button>
      </div>
    </div>

    <div>
      <p className={cardName}>{category.name}</p>
      <p className={cardDesc}>{category.description}</p>
    </div>

    <div className={cardFooter}>
      <span className={countLabel}>Produtos</span>
      <span className={countValue}>{productCount}</span>
    </div>
  </div>
)

// --- Componente ---

export const Categories = () => {
  const { data: categories = [], isLoading, isError } = useCategories()
  const { data: products = [] }                       = useProducts()

  const createCategory = useCreateCategory()
  const updateCategory = useUpdateCategory()
  const deleteCategory = useDeleteCategory()

  const [isOpen, setIsOpen]   = useState(false)
  const [editing, setEditing] = useState<Category | null>(null)

  const productCountFor = (categoryId: string) =>
    products.filter((p) => p.categoryId === categoryId).length

  const handleCreate = (data: { name: string; description?: string }) => {
    createCategory.mutate(data, { onSuccess: () => setIsOpen(false) })
  }

  const handleEdit = (data: { name: string; description?: string }) => {
    if (!editing) return
    updateCategory.mutate({ id: editing.id, data }, { onSuccess: () => setEditing(null) })
  }

  const handleDelete = (id: string) => deleteCategory.mutate(id)

  return (
  <div className={page}>

    {isOpen && (
      <CategoryForm
        onClose={() => setIsOpen(false)}
        onSubmit={handleCreate}
      />
    )}

    {editing && (
      <CategoryForm
        defaultValues={editing}
        onClose={() => setEditing(null)}
        onSubmit={handleEdit}
      />
    )}

    <div className={pageHeader}>
      <div>
        <h1 className={pageTitle}>Categorias</h1>
        <p className={pageSubtitle}>Gerencie as categorias de produtos</p>
      </div>
      <button className={btnPrimary} onClick={() => setIsOpen(true)}>+ Nova Categoria</button>
    </div>

    {isLoading && <p className={feedbackMsg}>Carregando categorias...</p>}
    {isError   && <p className={errorMsg}>Erro ao carregar categorias. Tente novamente.</p>}

    {!isLoading && !isError && (
      <div className={grid}>
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            productCount={productCountFor(category.id)}
            onEdit={setEditing}
            onDelete={handleDelete}
          />
        ))}
      </div>
    )}

  </div>
  )
}