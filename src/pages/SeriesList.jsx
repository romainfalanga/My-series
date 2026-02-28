import { useState, useMemo } from 'react'
import SearchFilter from '../components/SearchFilter'
import SeriesCard from '../components/SeriesCard'

export default function SeriesList({ series, onResetRewatch, onDelete }) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('rating')

  const filtered = useMemo(() => {
    let result = [...series]

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter((s) => s.title.toLowerCase().includes(q))
    }

    if (statusFilter !== 'all') {
      result = result.filter((s) => s.status === statusFilter)
    }

    if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0))
    } else if (sortBy === 'title') {
      result.sort((a, b) => a.title.localeCompare(b.title, 'fr'))
    }

    return result
  }, [series, search, statusFilter, sortBy])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">Mes séries</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-text-secondary">Trier par :</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-bg-input border border-border rounded-xl px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent"
          >
            <option value="rating">Note</option>
            <option value="title">Titre</option>
          </select>
        </div>
      </div>

      <SearchFilter
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-text-secondary">
            {series.length === 0
              ? 'Aucune série ajoutée.'
              : 'Aucune série ne correspond à votre recherche.'}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => (
            <SeriesCard
              key={s.id}
              series={s}
              onResetRewatch={onResetRewatch}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}
