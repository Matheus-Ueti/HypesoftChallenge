import { Pencil, Trash2, Tag } from 'lucide-react'

// --- Tipos ---

interface Category {
  id: number
  name: string
  description: string
  productCount: number
}

// --- Dados simulados ---
// Serão substituídos pelos dados reais da API via TanStack Query

const CATEGORIES: Category[] = [
  { id: 1, name: 'Eletrônicos',  description: 'Dispositivos e acessórios eletrônicos', productCount: 34 },
  { id: 2, name: 'Vestuário',    description: 'Roupas, calçados e acessórios',          productCount: 28 },
  { id: 3, name: 'Alimentos',    description: 'Produtos alimentícios e bebidas',        productCount: 22 },
  { id: 4, name: 'Ferramentas',  description: 'Ferramentas e equipamentos',             productCount: 18 },
  { id: 5, name: 'Cosméticos',   description: 'Beleza e cuidados pessoais',             productCount: 14 },
  { id: 6, name: 'Esportes',     description: 'Artigos esportivos e fitness',           productCount: 11 },
  { id: 7, name: 'Livros',       description: 'Livros, revistas e papelaria',           productCount: 9  },
  { id: 8, name: 'Outros',       description: 'Produtos variados não categorizados',    productCount: 8  },
]

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

const CategoryCard = ({ name, description, productCount }: Category) => (
  <div className={card}>
    <div className={cardHeader}>
      <div className={iconWrapper}>
        <Tag size={16} />
      </div>
      <div className={actions}>
        <button className={actionBtn} title="Editar">
          <Pencil size={14} />
        </button>
        <button className={actionBtn} title="Excluir">
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

export const Categories = () => (
  <div className={page}>

    <div className={pageHeader}>
      <div>
        <h1 className={pageTitle}>Categorias</h1>
        <p className={pageSubtitle}>Gerencie as categorias de produtos</p>
      </div>
      <button className={btnPrimary}>+ Nova Categoria</button>
    </div>

    <div className={grid}>
      {CATEGORIES.map((category) => (
        <CategoryCard key={category.id} {...category} />
      ))}
    </div>

  </div>
)