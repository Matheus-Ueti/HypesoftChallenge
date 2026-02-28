import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X } from 'lucide-react'
import { useCategories } from '@/hooks/useCategories'
import type { Product } from '@/types/product'

// --- Schema ---

const schema = z.object({
  name:        z.string().min(1, 'Nome é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  price:       z.number({ message: 'Informe um preço válido' }).positive('Preço deve ser maior que zero'),
  stock:       z.number({ message: 'Informe um valor válido' }).int().min(0, 'Estoque não pode ser negativo'),
  categoryId:  z.string().min(1, 'Selecione uma categoria'),
})

type FormData = z.infer<typeof schema>

// --- Tipos ---

interface ProductFormProps {
  defaultValues?: Partial<Product>
  onSubmit: (data: FormData) => void
  onClose: () => void
}

// --- Estilos ---

const overlay    = 'fixed inset-0 bg-black/40 flex items-center justify-center z-50'
const modal      = 'bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl'
const header     = 'flex items-center justify-between mb-6'
const title      = 'text-lg font-semibold text-slate-800'
const closeBtn   = 'p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors'
const form       = 'flex flex-col gap-4'
const fieldGroup = 'flex flex-col gap-1'
const label      = 'text-sm font-medium text-slate-700'
const input      = 'border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition'
const inputError = 'border border-red-300 rounded-lg px-3 py-2 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-red-200 transition'
const errorMsg   = 'text-xs text-red-500'
const row        = 'grid grid-cols-2 gap-3'
const footer     = 'flex justify-end gap-2 mt-2'
const btnCancel  = 'px-4 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-100 transition-colors'
const btnSubmit  = 'px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors'

// --- Componente ---

export const ProductForm = ({ defaultValues, onSubmit, onClose }: ProductFormProps) => {
  const { data: categories = [] } = useCategories()

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name:        defaultValues?.name        ?? '',
      description: defaultValues?.description ?? '',
      price:       defaultValues?.price       ?? 0,
      stock:       defaultValues?.stock       ?? 0,
      categoryId:  defaultValues?.categoryId  ?? '',
    },
  })

  const isEditing = !!defaultValues?.id

  return (
    <div className={overlay} onClick={onClose}>
      <div className={modal} onClick={(e) => e.stopPropagation()}>

        <div className={header}>
          <h2 className={title}>{isEditing ? 'Editar Produto' : 'Novo Produto'}</h2>
          <button className={closeBtn} onClick={onClose}><X size={18} /></button>
        </div>

        <form className={form} onSubmit={handleSubmit(onSubmit)}>

          <div className={fieldGroup}>
            <label htmlFor="name" className={label}>Nome</label>
            <input id="name" className={errors.name ? inputError : input} {...register('name')} />
            {errors.name && <span className={errorMsg}>{errors.name.message}</span>}
          </div>

          <div className={fieldGroup}>
            <label htmlFor="description" className={label}>Descrição</label>
            <textarea
              id="description"
              rows={2}
              className={errors.description ? inputError : input}
              {...register('description')}
            />
            {errors.description && <span className={errorMsg}>{errors.description.message}</span>}
          </div>

          <div className={row}>
            <div className={fieldGroup}>
              <label htmlFor="price" className={label}>Preço (R$)</label>
              <input id="price" type="number" step="0.01" className={errors.price ? inputError : input} {...register('price', { valueAsNumber: true })} />
              {errors.price && <span className={errorMsg}>{errors.price.message}</span>}
            </div>
            <div className={fieldGroup}>
              <label htmlFor="stock" className={label}>Estoque</label>
              <input id="stock" type="number" className={errors.stock ? inputError : input} {...register('stock', { valueAsNumber: true })} />
              {errors.stock && <span className={errorMsg}>{errors.stock.message}</span>}
            </div>
          </div>

          <div className={fieldGroup}>
            <label htmlFor="categoryId" className={label}>Categoria</label>
            <select id="categoryId" className={errors.categoryId ? inputError : input} {...register('categoryId')}>
              <option value="">Selecione...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            {errors.categoryId && <span className={errorMsg}>{errors.categoryId.message}</span>}
          </div>

          <div className={footer}>
            <button type="button" className={btnCancel} onClick={onClose}>Cancelar</button>
            <button type="submit" className={btnSubmit}>{isEditing ? 'Salvar' : 'Criar'}</button>
          </div>

        </form>
      </div>
    </div>
  )
}
