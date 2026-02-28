export function addMonths(date, months) {
  const result = new Date(date)
  result.setMonth(result.getMonth() + months)
  return result
}

export function getRewatchInfo(series) {
  if (!series.lastWatchedDate || !series.rewatchIntervalMonths) {
    return { status: 'unknown', daysRemaining: null, rewatchDate: null }
  }

  const rewatchDate = addMonths(new Date(series.lastWatchedDate), series.rewatchIntervalMonths)
  const now = new Date()
  const diffMs = rewatchDate.getTime() - now.getTime()
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays <= 0) {
    return { status: 'ready', daysRemaining: diffDays, rewatchDate }
  } else if (diffDays <= 30) {
    return { status: 'soon', daysRemaining: diffDays, rewatchDate }
  } else {
    return { status: 'waiting', daysRemaining: diffDays, rewatchDate }
  }
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function formatRemainingTime(days) {
  if (days <= 0) return 'Maintenant !'
  if (days === 1) return '1 jour'
  if (days < 30) return `${days} jours`
  const months = Math.floor(days / 30)
  const remainingDays = days % 30
  if (months < 12) {
    if (remainingDays === 0) return `${months} mois`
    return `${months} mois et ${remainingDays}j`
  }
  const years = Math.floor(months / 12)
  const remainingMonths = months % 12
  if (remainingMonths === 0) return `${years} an${years > 1 ? 's' : ''}`
  return `${years} an${years > 1 ? 's' : ''} et ${remainingMonths} mois`
}
