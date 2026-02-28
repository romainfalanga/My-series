import { NavLink, useNavigate, useLocation } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Accueil', icon: HomeIcon },
  { to: '/series', label: 'Séries', icon: ListIcon },
  { to: '/add', label: 'Ajouter', icon: PlusIcon, isAction: true },
  { to: '/settings', label: 'Données', icon: DataIcon },
]

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <>
      {/* Desktop top navbar */}
      <nav className="hidden sm:block bg-bg-secondary/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2 text-lg font-bold text-text-primary">
            <span className="text-xl">📺</span>
            <span>My Series</span>
          </NavLink>

          <div className="flex items-center gap-1">
            <a
              href="https://fr.tipeee.com/romain-falanga"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black rounded-xl text-sm font-medium transition-colors flex items-center gap-1.5"
            >
              <HeartIcon className="w-4 h-4" />
              Faire un don
            </a>
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

      {/* Mobile top header - minimal */}
      <header className="sm:hidden bg-bg-secondary/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
        <div className="px-4 h-12 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2 text-lg font-bold text-text-primary">
            <span className="text-xl">📺</span>
            <span>My Series</span>
          </NavLink>
          <a
            href="https://fr.tipeee.com/romain-falanga"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-400 text-black rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
          >
            <HeartIcon className="w-3.5 h-3.5" />
            Faire un don
          </a>
        </div>
      </header>

      {/* Mobile bottom tab bar */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-bg-secondary/95 backdrop-blur-md border-t border-border pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-stretch justify-around h-16">
          {navItems.map(({ to, label, icon: Icon, isAction }) => {
            const isActive = location.pathname === to

            if (isAction) {
              return (
                <button
                  key={to}
                  onClick={() => navigate(to)}
                  className="flex flex-col items-center justify-center gap-0.5 min-w-[64px] px-2 -mt-3"
                >
                  <span className="w-12 h-12 rounded-full bg-accent flex items-center justify-center shadow-lg shadow-accent/30">
                    <Icon className="w-6 h-6 text-white" />
                  </span>
                </button>
              )
            }

            return (
              <NavLink
                key={to}
                to={to}
                className="flex flex-col items-center justify-center gap-0.5 min-w-[64px] px-2 active:bg-white/5 transition-colors"
              >
                <Icon className={`w-6 h-6 ${isActive ? 'text-accent' : 'text-text-secondary'}`} />
                <span className={`text-[10px] font-medium ${isActive ? 'text-accent' : 'text-text-secondary'}`}>
                  {label}
                </span>
              </NavLink>
            )
          })}
        </div>
      </nav>
    </>
  )
}

function HomeIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  )
}

function ListIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
  )
}

function PlusIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  )
}

function HeartIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
    </svg>
  )
}

function DataIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>
  )
}
