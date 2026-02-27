import { Outlet } from 'react-router-dom'
import { Sidebar } from './sidebar'
import { Header } from './header'

// --- Estilos ---

const layout  = 'flex h-screen bg-slate-50'
const content = 'flex flex-col flex-1 overflow-hidden'
const main    = 'flex-1 overflow-y-auto p-6'

// --- Componente ---

export const MainLayout = () => (
  <div className={layout}>
    <Sidebar />
    <div className={content}>
      <Header />
      <main className={main}>
        <Outlet />
      </main>
    </div>
  </div>
)
