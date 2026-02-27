import React from 'react'
import { Package, DollarSign, AlertTriangle, Tag } from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'

// --- Tipos ---

interface MetricCardProps {
  title: string
  value: string
  icon: React.ReactNode
  highlight?: boolean
}

interface CategoryData {
  categoria: string
  produtos: number
}

interface LowStockItem {
  nome: string
  categoria: string
  estoque: number
}

// --- Dados simulados ---
// Serão substituídos pelos dados reais da API via TanStack Query

const METRICS: MetricCardProps[] = [
  { title: 'Total de Produtos', value: '124',       icon: <Package size={20} /> },
  { title: 'Valor do Estoque',  value: 'R$ 48.320', icon: <DollarSign size={20} /> },
  { title: 'Categorias',        value: '8',          icon: <Tag size={20} /> },
  { title: 'Estoque Baixo',     value: '7',          icon: <AlertTriangle size={20} />, highlight: true },
]

const CATEGORY_DATA: CategoryData[] = [
  { categoria: 'Eletrônicos',  produtos: 34 },
  { categoria: 'Vestuário',    produtos: 28 },
  { categoria: 'Alimentos',    produtos: 22 },
  { categoria: 'Ferramentas',  produtos: 18 },
  { categoria: 'Cosméticos',   produtos: 14 },
  { categoria: 'Outros',       produtos: 8  },
]

const LOW_STOCK_ITEMS: LowStockItem[] = [
  { nome: 'Cabo USB-C 2m',      categoria: 'Eletrônicos', estoque: 2 },
  { nome: 'Camiseta Básica P',  categoria: 'Vestuário',   estoque: 4 },
  { nome: 'Óleo de Motor 5W30', categoria: 'Ferramentas', estoque: 3 },
  { nome: 'Fone Bluetooth XR',  categoria: 'Eletrônicos', estoque: 1 },
  { nome: 'Protetor Solar FPS', categoria: 'Cosméticos',  estoque: 5 },
]

// --- Estilos ---

const page        = 'space-y-6'
const pageTitle   = 'text-2xl font-bold text-slate-800'
const metricsGrid = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'
const bottomGrid  = 'grid grid-cols-1 lg:grid-cols-2 gap-4'
const card        = 'bg-white rounded-xl border border-slate-100 p-5'
const cardRow     = 'flex items-center gap-4'
const iconNormal  = 'p-3 rounded-lg bg-indigo-50 text-indigo-600'
const iconDanger  = 'p-3 rounded-lg bg-red-50 text-red-500'
const cardTitle   = 'text-sm text-slate-500'
const cardValue   = 'text-2xl font-bold text-slate-800'
const cardDanger  = 'text-2xl font-bold text-red-500'
const sectionTitle = 'text-sm font-semibold text-slate-700 mb-4'

const alertRow      = 'flex items-center justify-between py-2 border-b border-slate-50 last:border-0'
const alertName     = 'text-sm font-medium text-slate-700'
const alertCategory = 'text-xs text-slate-400'
const alertBadge    = 'text-xs font-semibold px-2 py-0.5 rounded-full bg-red-50 text-red-500'

// --- Sub-componentes ---

const MetricCard = ({ title, value, icon, highlight = false }: MetricCardProps) => (
  <div className={card}>
    <div className={cardRow}>
      <div className={highlight ? iconDanger : iconNormal}>
        {icon}
      </div>
      <div>
        <p className={cardTitle}>{title}</p>
        <p className={highlight ? cardDanger : cardValue}>{value}</p>
      </div>
    </div>
  </div>
)

const CategoryChart = () => (
  <ResponsiveContainer width="100%" height={220}>
    <BarChart data={CATEGORY_DATA} barSize={28}>
      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
      <XAxis
        dataKey="categoria"
        tick={{ fontSize: 11, fill: '#94a3b8' }}
        axisLine={false}
        tickLine={false}
      />
      <YAxis
        tick={{ fontSize: 11, fill: '#94a3b8' }}
        axisLine={false}
        tickLine={false}
      />
      <Tooltip
        contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}
        cursor={{ fill: '#f8fafc' }}
      />
      <Bar dataKey="produtos" fill="#6366f1" radius={[4, 4, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
)

const LowStockList = () => (
  <div>
    {LOW_STOCK_ITEMS.map((item) => (
      <div key={item.nome} className={alertRow}>
        <div>
          <p className={alertName}>{item.nome}</p>
          <p className={alertCategory}>{item.categoria}</p>
        </div>
        <span className={alertBadge}>{item.estoque} un.</span>
      </div>
    ))}
  </div>
)

// --- Componente principal ---

export const Dashboard = () => (
  <div className={page}>

    <h1 className={pageTitle}>Dashboard</h1>

    <div className={metricsGrid}>
      {METRICS.map((metric) => (
        <MetricCard key={metric.title} {...metric} />
      ))}
    </div>

    <div className={bottomGrid}>
      <div className={card}>
        <p className={sectionTitle}>Produtos por Categoria</p>
        <CategoryChart />
      </div>
      <div className={card}>
        <p className={sectionTitle}>Alertas de Estoque Baixo</p>
        <LowStockList />
      </div>
    </div>

  </div>
)
