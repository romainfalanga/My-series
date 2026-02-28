import { STATUS, STATUS_LABELS } from '../utils/constants'

export default function SearchFilter({ search, onSearchChange, statusFilter, onStatusChange }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Rechercher une série..."
          className="w-full pl-10 pr-4 py-2.5 bg-bg-input border border-border rounded-xl text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-accent transition-colors"
        />
      </div>
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => onStatusChange('all')}
          className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
            statusFilter === 'all'
              ? 'bg-accent border-accent text-white'
              : 'bg-bg-input border-border text-text-secondary hover:border-accent/50'
          }`}
        >
          Toutes
        </button>
        {Object.entries(STATUS_LABELS).map(([value, label]) => (
          <button
            key={value}
            onClick={() => onStatusChange(value)}
            className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
              statusFilter === value
                ? 'bg-accent border-accent text-white'
                : 'bg-bg-input border-border text-text-secondary hover:border-accent/50'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
