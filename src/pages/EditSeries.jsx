import { useParams, useNavigate } from 'react-router-dom'
import SeriesForm from '../components/SeriesForm'

export default function EditSeries({ series, onUpdate }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const current = series.find((s) => s.id === id)

  if (!current) {
    return (
      <div className="text-center py-20">
        <p className="text-text-secondary">Série introuvable.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-6 py-2 bg-accent hover:bg-accent-hover text-white rounded-xl transition-colors"
        >
          Retour
        </button>
      </div>
    )
  }

  return (
    <div className="py-4">
      <h1 className="text-2xl font-bold text-text-primary mb-8 text-center">
        Modifier la série
      </h1>
      <SeriesForm
        initialData={current}
        onSubmit={(data) => onUpdate(id, data)}
      />
    </div>
  )
}
