import { getRewatchInfo, formatRemainingTime, formatDate } from '../utils/dates'

const statusConfig = {
  ready: {
    dot: 'bg-red-500',
    bg: 'bg-red-500/10 border-red-500/30',
    text: 'text-red-400',
    label: 'À revoir !',
  },
  soon: {
    dot: 'bg-yellow-500',
    bg: 'bg-yellow-500/10 border-yellow-500/30',
    text: 'text-yellow-400',
    label: 'Bientôt',
  },
  waiting: {
    dot: 'bg-green-500',
    bg: 'bg-green-500/10 border-green-500/30',
    text: 'text-green-400',
    label: 'En attente',
  },
}

export default function RewatchIndicator({ series, compact = false }) {
  const info = getRewatchInfo(series)
  if (info.status === 'unknown') return null

  const config = statusConfig[info.status]

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <span className={`w-2.5 h-2.5 rounded-full ${config.dot}`} />
        <span className={`text-sm ${config.text}`}>
          {info.status === 'ready'
            ? config.label
            : formatRemainingTime(info.daysRemaining)}
        </span>
      </div>
    )
  }

  return (
    <div className={`rounded-lg border p-3 ${config.bg}`}>
      <div className="flex items-center gap-2 mb-1">
        <span className={`w-2.5 h-2.5 rounded-full ${config.dot}`} />
        <span className={`font-medium ${config.text}`}>{config.label}</span>
      </div>
      <p className="text-sm text-text-secondary">
        {info.status === 'ready' ? (
          <>Prête depuis {formatRemainingTime(Math.abs(info.daysRemaining))}</>
        ) : (
          <>Revisionnage le {formatDate(info.rewatchDate)} ({formatRemainingTime(info.daysRemaining)})</>
        )}
      </p>
    </div>
  )
}
