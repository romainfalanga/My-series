import { STATUS, STATUS_LABELS } from '../utils/constants'

const statusStyles = {
  [STATUS.WATCHED]: 'bg-green-500/20 text-green-400 border-green-500/30',
  [STATUS.TO_WATCH]: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  [STATUS.WATCHING]: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
}

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyles[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  )
}
