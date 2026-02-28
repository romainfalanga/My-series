import { useNavigate } from 'react-router-dom'
import { STATUS } from '../utils/constants'
import StarRating from './StarRating'
import StatusBadge from './StatusBadge'
import RewatchIndicator from './RewatchIndicator'

export default function SeriesCard({ series, onResetRewatch, onDelete }) {
  const navigate = useNavigate()

  return (
    <div className="bg-bg-card rounded-xl border border-border p-4 sm:p-5 hover:border-accent/50 transition-all group active:scale-[0.98]">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-text-primary truncate pr-2">
            {series.title}
          </h3>
          <div className="flex items-center gap-3 mt-1">
            <StarRating rating={series.rating} readonly size="sm" />
            <StatusBadge status={series.status} />
          </div>
        </div>
        {/* Always visible on mobile, hover-only on desktop */}
        <div className="flex gap-1 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => navigate(`/edit/${series.id}`)}
            className="p-2.5 sm:p-1.5 rounded-lg hover:bg-white/10 active:bg-white/15 text-text-secondary hover:text-text-primary transition-colors"
            title="Modifier"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(series.id)}
            className="p-2.5 sm:p-1.5 rounded-lg hover:bg-red-500/20 active:bg-red-500/30 text-text-secondary hover:text-red-400 transition-colors"
            title="Supprimer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {series.comment && (
        <p className="text-sm text-text-secondary mb-3 line-clamp-2">
          {series.comment}
        </p>
      )}

      {series.status === STATUS.WATCHED && (
        <div className="mt-3">
          <RewatchIndicator series={series} />
          {series.lastWatchedDate && series.rewatchIntervalMonths && (
            <button
              onClick={() => onResetRewatch(series.id)}
              className="mt-3 w-full py-3 sm:py-2 px-4 bg-accent hover:bg-accent-hover active:bg-accent-hover text-white rounded-lg text-sm font-medium transition-colors"
            >
              Je viens de la revoir !
            </button>
          )}
        </div>
      )}
    </div>
  )
}
