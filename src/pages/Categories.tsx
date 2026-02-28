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
import { Button } from '@/components/ui/button'
import type { Category } from '@/types/category'

interface CategoryCardProps {
  category:     Category
  productCount: number
  onEdit:       (category: Category) => void
  onDelete:     (id: string) => void
}

const CategoryCard = ({ category, productCount, onEdit, onDelete }: CategoryCardProps) => (
  <div className="bg-white rounded-xl border border-slate-100 p-5 flex flex-col gap-4">
    <div className="flex items-start justify-between">
      <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-600">
        <Tag size={16} />
      </div>
      <div className="flex gap-1">
        <Button variant="ghost" size="icon" title="Editar" onClick={() => onEdit(category)}>
          <Pencil size={14} />
        </Button>
        <Button variant="ghost" size="icon" title="Excluir" onClick={() => onDelete(category.id)}>
          <Trash2 size={14} />
        </Button>
      </div>
    </div>
    <div>
      <p className="text-sm font-semibold text-slate-800">{category.name}</p>
      <p className="text-xs text-slate-400 leading-relaxed">{category.description}</p>
    </div>
    <div className="flex items-center justify-between pt-2 border-t border-slate-50">
      <span className="text-xs text-slate-400">Produtos</span>
      <span className="text-xs font-semibold text-indigo-600">{productCount}</span>
    </div>
  </div>
)

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
  <div className="space-y-6">

    {isOpen && (
      <CategoryForm onClose={() => setIsOpen(false)} onSubmit={handleCreate} />
    )}

    {editing && (
      <CategoryForm
        defaultValues={editing}
        onClose={() => setEditing(null)}
        onSubmit={handleEdit}
      />
    )}

    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Categorias</h1>
        <p className="text-sm text-slate-500 mt-1">Gerencie as categorias de produtos</p>
      </div>
      <Button onClick={() => setIsOpen(true)}>+ Nova Categoria</Button>
    </div>

    {isLoading && <p className="text-center text-sm text-slate-400 py-20">Carregando categorias...</p>}
    {isError   && <p className="text-center text-sm text-red-500 py-20">Erro ao carregar categorias. Tente novamente.</p>}

    {!isLoading && !isError && (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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