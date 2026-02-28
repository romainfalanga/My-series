import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { STATUS } from '../utils/constants'
import { getRewatchInfo } from '../utils/dates'
import SeriesCard from '../components/SeriesCard'

export default function Dashboard({ series, onResetRewatch, onDelete }) {
  const navigate = useNavigate()

  const { ready, soon, waiting, wishlist } = useMemo(() => {
    const ready = []
    const soon = []
    const waiting = []
    const wishlist = []

    for (const s of series) {
      if (s.status === STATUS.TO_WATCH) {
        wishlist.push(s)
        continue
      }
      if (s.status === STATUS.WATCHING) continue
      if (s.status === STATUS.WATCHED) {
        const info = getRewatchInfo(s)
        if (info.status === 'ready') ready.push({ series: s, info })
        else if (info.status === 'soon') soon.push({ series: s, info })
        else if (info.status === 'waiting') waiting.push({ series: s, info })
        else ready.push({ series: s, info }) // unknown = show in ready section
      }
    }

    ready.sort((a, b) => (a.info.daysRemaining ?? 0) - (b.info.daysRemaining ?? 0))
    soon.sort((a, b) => a.info.daysRemaining - b.info.daysRemaining)
    waiting.sort((a, b) => a.info.daysRemaining - b.info.daysRemaining)
    wishlist.sort((a, b) => (b.rating || 0) - (a.rating || 0))

    return { ready, soon, waiting, wishlist }
  }, [series])

  const isEmpty = series.length === 0

  if (isEmpty) {
    return (
      <div className="text-center py-20">
        <p className="text-6xl mb-4">📺</p>
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Bienvenue sur My Series !
        </h2>
        <p className="text-text-secondary mb-8 max-w-md mx-auto">
          Ajoutez vos séries préférées et l'app vous dira quand il sera temps de les revoir.
        </p>
        <button
          onClick={() => navigate('/add')}
          className="px-6 py-3 bg-accent hover:bg-accent-hover text-white rounded-xl font-medium transition-colors"
        >
          Ajouter ma première série
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      {ready.length > 0 && (
        <Section
          title="À revoir maintenant"
          dot="bg-red-500"
          count={ready.length}
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ready.map(({ series: s }) => (
              <SeriesCard
                key={s.id}
                series={s}
                onResetRewatch={onResetRewatch}
                onDelete={onDelete}
              />
            ))}
          </div>
        </Section>
      )}

      {soon.length > 0 && (
        <Section title="Bientôt prêtes" dot="bg-yellow-500" count={soon.length}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {soon.map(({ series: s }) => (
              <SeriesCard
                key={s.id}
                series={s}
                onResetRewatch={onResetRewatch}
                onDelete={onDelete}
              />
            ))}
          </div>
        </Section>
      )}

      {waiting.length > 0 && (
        <Section title="En attente" dot="bg-green-500" count={waiting.length}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {waiting.map(({ series: s }) => (
              <SeriesCard
                key={s.id}
                series={s}
                onResetRewatch={onResetRewatch}
                onDelete={onDelete}
              />
            ))}
          </div>
        </Section>
      )}

      {wishlist.length > 0 && (
        <Section title="Wishlist" dot="bg-blue-500" count={wishlist.length}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {wishlist.map((s) => (
              <SeriesCard
                key={s.id}
                series={s}
                onResetRewatch={onResetRewatch}
                onDelete={onDelete}
              />
            ))}
          </div>
        </Section>
      )}
    </div>
  )
}

function Section({ title, dot, count, children }) {
  return (
    <section>
      <div className="flex items-center gap-3 mb-4">
        <span className={`w-3 h-3 rounded-full ${dot}`} />
        <h2 className="text-xl font-bold text-text-primary">{title}</h2>
        <span className="text-sm text-text-secondary bg-white/5 px-2.5 py-0.5 rounded-full">
          {count}
        </span>
      </div>
      {children}
    </section>
  )
}
