import SeriesForm from '../components/SeriesForm'

export default function AddSeries({ onAdd }) {
  return (
    <div className="py-4">
      <h1 className="text-2xl font-bold text-text-primary mb-8 text-center">
        Ajouter une série
      </h1>
      <SeriesForm onSubmit={onAdd} />
    </div>
  )
}
