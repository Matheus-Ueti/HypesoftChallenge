import { Outlet } from 'react-router-dom'
import { Sidebar } from './SideBar'
import { Header } from './Header'
import { useAuthContext } from '@/contexts/AuthContext'

const layout  = 'flex h-screen bg-slate-50'
const content = 'flex flex-col flex-1 overflow-hidden'
const main    = 'flex-1 overflow-y-auto p-6'

export const MainLayout = () => {
  const { logout } = useAuthContext()

  return (
    <div className={layout}>
      <Sidebar />
      <div className={content}>
        <Header onLogout={logout} />
        <main className={main}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
