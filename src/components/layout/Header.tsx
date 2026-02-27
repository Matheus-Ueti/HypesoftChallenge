import { Search, Bell } from 'lucide-react'

// --- Estilos ---

const header      = 'h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6'
const searchBar   = 'flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2 w-72'
const searchInput = 'bg-transparent text-sm text-slate-600 outline-none w-full placeholder:text-slate-400'
const bellButton  = 'text-slate-400 hover:text-slate-600 transition-colors'

// --- Componente ---

export const Header = () => (
  <header className={header}>
    <div className={searchBar}>
      <Search size={16} className="text-slate-400" />
      <input type="text" placeholder="Search..." className={searchInput} />
    </div>
    <button className={bellButton}>
      <Bell size={20} />
    </button>
  </header>
)
