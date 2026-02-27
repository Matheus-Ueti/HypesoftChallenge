import { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { ProductForm } from '@/components/forms/ProductForm'

// --- Tipos ---

interface Product {
  id: number
  name: string
  category: string
  price: number
  stock: number
}

// --- Dados simulados ---
// Serão substituídos pelos dados reais da API via TanStack Query

const PRODUCTS: Product[] = [
  { id: 1,  name: 'Cabo USB-C 2m',       category: 'Eletrônicos', price: 39.90,  stock: 2   },
  { id: 2,  name: 'Camiseta Básica P',    category: 'Vestuário',   price: 59.90,  stock: 4   },
  { id: 3,  name: 'Óleo de Motor 5W30',   category: 'Ferramentas', price: 89.90,  stock: 3   },
  { id: 4,  name: 'Fone Bluetooth XR',    category: 'Eletrônicos', price: 249.90, stock: 1   },
  { id: 5,  name: 'Protetor Solar FPS50', category: 'Cosméticos',  price: 34.90,  stock: 5   },
  { id: 6,  name: 'Notebook Slim 14"',    category: 'Eletrônicos', price: 3499.90,stock: 12  },
  { id: 7,  name: 'Calça Jeans Slim',     category: 'Vestuário',   price: 129.90, stock: 22  },
  { id: 8,  name: 'Whey Protein 1kg',     category: 'Alimentos',   price: 159.90, stock: 18  },
]

const formatPrice  = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

// --- Estilos ---

const page         = 'space-y-6'
const pageHeader   = 'flex items-center justify-between'
const pageTitle    = 'text-2xl font-bold text-slate-800'
const pageSubtitle = 'text-sm text-slate-500 mt-1'
const btnPrimary   = 'bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors'
const card         = 'bg-white rounded-xl border border-slate-100 overflow-hidden'

const table       = 'w-full text-sm'
const thead       = 'bg-slate-50 border-b border-slate-100'
const th          = 'text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-5 py-3'
const tr          = 'border-b border-slate-50 hover:bg-slate-50 transition-colors last:border-0'
const td          = 'px-5 py-3 text-slate-700'
const tdMuted     = 'px-5 py-3 text-slate-400'

const badgeNormal = 'text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600'
const badgeDanger = 'text-xs font-medium px-2 py-0.5 rounded-full bg-red-50 text-red-500'

const actionBtn   = 'p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors'

// --- Sub-componente ---

const StockBadge = ({ stock }: { stock: number }) => (
  <span className={stock <= 5 ? badgeDanger : badgeNormal}>
    {stock} un.
  </span>
)

// --- Componente ---

export const Products = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
  <div className={page}>

    {isOpen && (
      <ProductForm
        onClose={() => setIsOpen(false)}
        onSubmit={(data) => {
          console.log('Novo produto:', data)
          setIsOpen(false)
        }}
      />
    )}

    <div className={pageHeader}>
      <div>
        <h1 className={pageTitle}>Produtos</h1>
        <p className={pageSubtitle}>Gerencie todos os produtos do sistema</p>
      </div>
      <button className={btnPrimary} onClick={() => setIsOpen(true)}>+ Novo Produto</button>
    </div>

    <div className={card}>
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
          {PRODUCTS.map((product) => (
            <tr key={product.id} className={tr}>
              <td className={td}>{product.name}</td>
              <td className={tdMuted}>{product.category}</td>
              <td className={td}>{formatPrice(product.price)}</td>
              <td className={td}><StockBadge stock={product.stock} /></td>
              <td className={td}>
                <div className="flex gap-1">
                  <button className={actionBtn} title="Editar">
                    <Pencil size={15} />
                  </button>
                  <button className={actionBtn} title="Excluir">
                    <Trash2 size={15} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  </div>
  )
}