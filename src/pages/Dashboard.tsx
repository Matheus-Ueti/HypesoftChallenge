import React, { useMemo } from 'react'
import { Package, DollarSign, AlertTriangle, Tag } from 'lucide-react'
import { CategoryChart } from '@/components/charts/CategoryChart'
import { useProducts } from '@/hooks/useProducts'
import { useCategories } from '@/hooks/useCategories'

const LOW_STOCK_THRESHOLD = 10

const formatCurrency = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

// --- Tipos ---

interface MetricCardProps {
  title:      string
  value:      string
  icon:       React.ReactNode
  highlight?: boolean
}

// --- Estilos ---

const page         = 'space-y-6'
const pageTitle    = 'text-2xl font-bold text-slate-800'
const metricsGrid  = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'
const bottomGrid   = 'grid grid-cols-1 lg:grid-cols-2 gap-4'
const card         = 'bg-white rounded-xl border border-slate-100 p-5'
const cardRow      = 'flex items-center gap-4'
const iconNormal   = 'p-3 rounded-lg bg-indigo-50 text-indigo-600'
const iconDanger   = 'p-3 rounded-lg bg-red-50 text-red-500'
const cardTitle    = 'text-sm text-slate-500'
const cardValue    = 'text-2xl font-bold text-slate-800'
const cardDanger   = 'text-2xl font-bold text-red-500'
const sectionTitle = 'text-sm font-semibold text-slate-700 mb-4'
const alertRow     = 'flex items-center justify-between py-2 border-b border-slate-50 last:border-0'
const alertName    = 'text-sm font-medium text-slate-700'
const alertCat     = 'text-xs text-slate-400'
const alertBadge   = 'text-xs font-semibold px-2 py-0.5 rounded-full bg-red-50 text-red-500'
const feedbackMsg  = 'text-center text-sm text-slate-400 py-10'

// --- Sub-componentes ---

const MetricCard = ({ title, value, icon, highlight = false }: MetricCardProps) => (
  <div className={card}>
    <div className={cardRow}>
      <div className={highlight ? iconDanger : iconNormal}>{icon}</div>
      <div>
        <p className={cardTitle}>{title}</p>
        <p className={highlight ? cardDanger : cardValue}>{value}</p>
      </div>
    </div>
  </div>
)

// --- Componente principal ---

export const Dashboard = () => {
  const { data: products   = [], isLoading: loadingProducts   } = useProducts()
  const { data: categories = [], isLoading: loadingCategories } = useCategories()

  const isLoading = loadingProducts || loadingCategories

  const totalStockValue = useMemo(
    () => products.reduce((sum, p) => sum + p.price * p.stock, 0),
    [products]
  )

  const lowStockProducts = useMemo(
    () => products.filter((p) => p.stock < LOW_STOCK_THRESHOLD).sort((a, b) => a.stock - b.stock),
    [products]
  )

  const chartData = useMemo(
    () => categories.map((cat) => ({
      categoria: cat.name,
      produtos:  products.filter((p) => p.categoryId === cat.id).length,
    })),
    [categories, products]
  )

  const categoryName = (categoryId: string) =>
    categories.find((c) => c.id === categoryId)?.name ?? '-'

  const metrics: MetricCardProps[] = [
    { title: 'Total de Produtos', value: String(products.length),          icon: <Package size={20} /> },
    { title: 'Valor do Estoque',  value: formatCurrency(totalStockValue),  icon: <DollarSign size={20} /> },
    { title: 'Categorias',        value: String(categories.length),        icon: <Tag size={20} /> },
    { title: 'Estoque Baixo',     value: String(lowStockProducts.length),  icon: <AlertTriangle size={20} />, highlight: true },
  ]

  return (
    <div className={page}>

      <h1 className={pageTitle}>Dashboard</h1>

      {isLoading ? (
        <p className={feedbackMsg}>Carregando dados...</p>
      ) : (
        <>
          <div className={metricsGrid}>
            {metrics.map((metric) => (
              <MetricCard key={metric.title} {...metric} />
            ))}
          </div>

          <div className={bottomGrid}>
            <div className={card}>
              <p className={sectionTitle}>Produtos por Categoria</p>
              <CategoryChart data={chartData} />
            </div>
            <div className={card}>
              <p className={sectionTitle}>Alertas de Estoque Baixo</p>
              {lowStockProducts.length === 0 ? (
                <p className={feedbackMsg}>Nenhum produto com estoque baixo.</p>
              ) : (
                lowStockProducts.slice(0, 5).map((item) => (
                  <div key={item.id} className={alertRow}>
                    <div>
                      <p className={alertName}>{item.name}</p>
                      <p className={alertCat}>{categoryName(item.categoryId)}</p>
                    </div>
                    <span className={alertBadge}>{item.stock} un.</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}

    </div>
  )
}
