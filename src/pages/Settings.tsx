// --- Estilos ---

const page      = 'space-y-6'
const pageTitle = 'text-2xl font-bold text-slate-800'
const card      = 'bg-white rounded-xl border border-slate-100 p-5'
const placeholder = 'h-48 flex items-center justify-center text-slate-400 text-sm'

// --- Componente ---

export const Settings = () => (
  <div className={page}>

    <h1 className={pageTitle}>Settings</h1>

    <div className={card}>
      <div className={placeholder}>Configurações em breve</div>
    </div>

  </div>
)