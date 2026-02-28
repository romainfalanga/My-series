export const STATUS = {
  WATCHED: 'watched',
  TO_WATCH: 'to_watch',
  WATCHING: 'watching',
}

export const STATUS_LABELS = {
  [STATUS.WATCHED]: 'Regardée',
  [STATUS.TO_WATCH]: 'À regarder',
  [STATUS.WATCHING]: 'En cours',
}

export const REWATCH_INTERVALS = [
  { label: '6 mois', months: 6 },
  { label: '1 an', months: 12 },
  { label: '18 mois', months: 18 },
  { label: '2 ans', months: 24 },
  { label: '3 ans', months: 36 },
]

export const STORAGE_KEY = 'my-series-data'
