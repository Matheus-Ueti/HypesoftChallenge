// --- Estilos ---

const page        = 'space-y-6'
const pageHeader  = 'flex items-center justify-between'
const pageTitle   = 'text-2xl font-bold text-slate-800'
const pageSubtitle = 'text-sm text-slate-500 mt-1'
const btnPrimary  = 'bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors'
const card        = 'bg-white rounded-xl border border-slate-100 p-5'
const placeholder = 'h-48 flex items-center justify-center text-slate-400 text-sm'

// --- Componente ---

export const Categories = () => (
  <div className={page}>

    <div className={pageHeader}>
      <div>
        <h1 className={pageTitle}>Categories</h1>
        <p className={pageSubtitle}>Gerencie as categorias de produtos</p>
      </div>
      <button className={btnPrimary}>+ Nova Categoria</button>
    </div>

    <div className={card}>
      <div className={placeholder}>Lista de categorias em breve</div>
    </div>

  </div>
)