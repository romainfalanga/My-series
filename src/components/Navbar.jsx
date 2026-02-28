import { NavLink, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()

  return (
    <nav className="bg-bg-secondary/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 text-xl font-bold text-text-primary">
          <span className="text-2xl">📺</span>
          <span>My Series</span>
        </NavLink>

        <div className="flex items-center gap-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-accent text-white'
                  : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
              }`
            }
          >
            Tableau de bord
          </NavLink>
          <NavLink
            to="/series"
            className={({ isActive }) =>
              `px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-accent text-white'
                  : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
              }`
            }
          >
            Mes séries
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-accent text-white'
                  : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
              }`
            }
          >
            Données
          </NavLink>
          <button
            onClick={() => navigate('/add')}
            className="ml-2 px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-xl text-sm font-medium transition-colors"
          >
            + Ajouter
          </button>
        </div>
      </div>
    </nav>
  )
}
