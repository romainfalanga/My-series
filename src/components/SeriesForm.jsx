import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { STATUS, STATUS_LABELS, REWATCH_INTERVALS } from '../utils/constants'
import StarRating from './StarRating'

const emptyForm = {
  title: '',
  rating: 0,
  status: STATUS.WATCHED,
  comment: '',
  lastWatchedDate: '',
  rewatchIntervalMonths: 12,
  customInterval: '',
}

export default function SeriesForm({ initialData, onSubmit }) {
  const navigate = useNavigate()
  const [form, setForm] = useState(emptyForm)
  const [useCustomInterval, setUseCustomInterval] = useState(false)

  useEffect(() => {
    if (initialData) {
      const isCustom = !REWATCH_INTERVALS.some(
        (i) => i.months === initialData.rewatchIntervalMonths
      )
      setForm({
        ...emptyForm,
        ...initialData,
        customInterval: isCustom ? String(initialData.rewatchIntervalMonths || '') : '',
      })
      setUseCustomInterval(isCustom && !!initialData.rewatchIntervalMonths)
    }
  }, [initialData])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title.trim()) return

    const data = {
      ...form,
      title: form.title.trim(),
      comment: form.comment.trim(),
      rewatchIntervalMonths: useCustomInterval
        ? parseInt(form.customInterval) || 12
        : form.rewatchIntervalMonths,
    }
    delete data.customInterval
    onSubmit(data)
    navigate('/')
  }

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  return (
    <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 max-w-lg mx-auto">
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-2">
          Titre de la série *
        </label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => update('title', e.target.value)}
          placeholder="Ex: Breaking Bad"
          required
          className="w-full px-4 py-3 bg-bg-input border border-border rounded-xl text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-secondary mb-2">
          Note personnelle
        </label>
        <StarRating rating={form.rating} onChange={(r) => update('rating', r)} />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-secondary mb-2">
          Statut
        </label>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(STATUS_LABELS).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => update('status', value)}
              className={`py-3 sm:py-2.5 px-3 rounded-xl text-sm font-medium border transition-all active:scale-95 ${
                form.status === value
                  ? 'bg-accent border-accent text-white'
                  : 'bg-bg-input border-border text-text-secondary hover:border-accent/50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-secondary mb-2">
          Commentaire
        </label>
        <textarea
          value={form.comment}
          onChange={(e) => update('comment', e.target.value)}
          placeholder="Notes personnelles sur cette série..."
          rows={3}
          className="w-full px-4 py-3 bg-bg-input border border-border rounded-xl text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-accent transition-colors resize-none"
        />
      </div>

      {form.status === STATUS.WATCHED && (
        <>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Date du dernier visionnage
            </label>
            <input
              type="date"
              value={form.lastWatchedDate}
              onChange={(e) => update('lastWatchedDate', e.target.value)}
              className="w-full px-4 py-3 bg-bg-input border border-border rounded-xl text-text-primary focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Intervalle de revisionnage
            </label>
            {/* Horizontal scroll on mobile, wrap on desktop */}
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-x-visible scrollbar-hide mb-3">
              {REWATCH_INTERVALS.map((interval) => (
                <button
                  key={interval.months}
                  type="button"
                  onClick={() => {
                    update('rewatchIntervalMonths', interval.months)
                    setUseCustomInterval(false)
                  }}
                  className={`py-2.5 sm:py-2 px-4 rounded-xl text-sm font-medium border transition-all whitespace-nowrap flex-shrink-0 active:scale-95 ${
                    !useCustomInterval && form.rewatchIntervalMonths === interval.months
                      ? 'bg-accent border-accent text-white'
                      : 'bg-bg-input border-border text-text-secondary hover:border-accent/50'
                  }`}
                >
                  {interval.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setUseCustomInterval(true)}
                className={`py-2.5 sm:py-2 px-4 rounded-xl text-sm font-medium border transition-all whitespace-nowrap flex-shrink-0 active:scale-95 ${
                  useCustomInterval
                    ? 'bg-accent border-accent text-white'
                    : 'bg-bg-input border-border text-text-secondary hover:border-accent/50'
                }`}
              >
                Personnalisé
              </button>
            </div>
            {useCustomInterval && (
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={form.customInterval}
                  onChange={(e) => update('customInterval', e.target.value)}
                  placeholder="Nombre"
                  className="w-24 px-4 py-3 bg-bg-input border border-border rounded-xl text-text-primary focus:outline-none focus:border-accent transition-colors"
                />
                <span className="text-text-secondary text-sm">mois</span>
              </div>
            )}
          </div>
        </>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="flex-1 py-3.5 sm:py-3 bg-accent hover:bg-accent-hover active:bg-accent-hover text-white rounded-xl font-medium transition-colors"
        >
          {initialData ? 'Enregistrer' : 'Ajouter la série'}
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-6 py-3.5 sm:py-3 bg-bg-input border border-border text-text-secondary rounded-xl font-medium hover:border-accent/50 active:bg-white/5 transition-colors"
        >
          Annuler
        </button>
      </div>
    </form>
  )
}
