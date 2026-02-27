import { Package, DollarSign, AlertTriangle, Tag } from 'lucide-react'

// --- Tipos ---

interface MetricCardProps {
  title: string
  value: string
  icon: React.ReactNode
  highlight?: boolean
}

// --- Dados simulados ---
// Serão substituídos pelos dados reais da API via TanStack Query

const METRICS = [
  { title: 'Total de Produtos', value: '124',       icon: <Package size={20} />,      highlight: false },
  { title: 'Valor do Estoque',  value: 'R$ 48.320', icon: <DollarSign size={20} />,   highlight: false },
  { title: 'Categorias',        value: '8',          icon: <Tag size={20} />,          highlight: false },
  { title: 'Estoque Baixo',     value: '7',          icon: <AlertTriangle size={20} />, highlight: true  },
]

// --- Sub-componente ---

const MetricCard = ({ title, value, icon, highlight = false }: MetricCardProps) => (
  <div className="bg-white rounded-xl border border-slate-100 p-5 flex items-center gap-4">
    <div className={`p-3 rounded-lg ${highlight ? 'bg-red-50 text-red-500' : 'bg-indigo-50 text-indigo-600'}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-slate-500">{title}</p>
      <p className={`text-2xl font-bold ${highlight ? 'text-red-500' : 'text-slate-800'}`}>{value}</p>
    </div>
  </div>
)

// --- Componente principal ---

export const Dashboard = () => (
  <div className="space-y-6">

    <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>

    {/* Cards de métricas */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {METRICS.map((metric) => (
        <MetricCard key={metric.title} {...metric} />
      ))}
    </div>

    {/* Gráfico e alertas — próxima etapa */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="bg-white rounded-xl border border-slate-100 p-5">
        <p className="text-sm font-semibold text-slate-700 mb-4">Produtos por Categoria</p>
        <div className="h-48 flex items-center justify-center text-slate-400 text-sm">
          Gráfico em breve
        </div>
      </div>
      <div className="bg-white rounded-xl border border-slate-100 p-5">
        <p className="text-sm font-semibold text-slate-700 mb-4">Alertas de Estoque Baixo</p>
        <div className="h-48 flex items-center justify-center text-slate-400 text-sm">
          Lista em breve
        </div>
      </div>
    </div>

  </div>
)
