import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

// --- Tipos ---

export interface CategoryChartData {
  categoria: string
  produtos: number
}

interface CategoryChartProps {
  data: CategoryChartData[]
}

// --- Componente ---

export const CategoryChart = ({ data }: CategoryChartProps) => (
  <ResponsiveContainer width="100%" height={220}>
    <BarChart data={data} barSize={28}>
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
