import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X } from 'lucide-react'
import type { Category } from '@/types/category'

// --- Schema ---

const schema = z.object({
  name:        z.string().min(1, 'Nome é obrigatório'),
  description: z.string().optional(),
})

type FormData = z.infer<typeof schema>

// --- Tipos ---

interface CategoryFormProps {
  defaultValues?: Partial<Category>
  onSubmit: (data: FormData) => void
  onClose: () => void
}

// --- Estilos ---

const overlay   = 'fixed inset-0 bg-black/40 flex items-center justify-center z-50'
const modal     = 'bg-white rounded-2xl w-full max-w-md p-6 shadow-xl'
const header    = 'flex items-center justify-between mb-6'
const title     = 'text-lg font-semibold text-slate-800'
const closeBtn  = 'p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors'
const form      = 'flex flex-col gap-4'
const fieldGroup = 'flex flex-col gap-1'
const label     = 'text-sm font-medium text-slate-700'
const input     = 'border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition'
const inputError = 'border border-red-300 rounded-lg px-3 py-2 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-red-200 transition'
const errorMsg  = 'text-xs text-red-500'
const footer    = 'flex justify-end gap-2 mt-2'
const btnCancel = 'px-4 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-100 transition-colors'
const btnSubmit = 'px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors'

// --- Componente ---

export const CategoryForm = ({ defaultValues, onSubmit, onClose }: CategoryFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name:        defaultValues?.name        ?? '',
      description: defaultValues?.description ?? '',
    },
  })

  const isEditing = !!defaultValues?.id

  return (
    <div className={overlay} onClick={onClose}>
      <div className={modal} onClick={(e) => e.stopPropagation()}>

        <div className={header}>
          <h2 className={title}>{isEditing ? 'Editar Categoria' : 'Nova Categoria'}</h2>
          <button className={closeBtn} onClick={onClose}><X size={18} /></button>
        </div>

        <form className={form} onSubmit={handleSubmit(onSubmit)}>

          <div className={fieldGroup}>
            <label htmlFor="name" className={label}>Nome</label>
            <input id="name" className={errors.name ? inputError : input} {...register('name')} />
            {errors.name && <span className={errorMsg}>{errors.name.message}</span>}
          </div>

          <div className={fieldGroup}>
            <label htmlFor="description" className={label}>Descrição (opcional)</label>
            <textarea
              id="description"
              rows={2}
              className={input}
              {...register('description')}
            />
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
