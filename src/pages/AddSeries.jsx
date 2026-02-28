import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SeriesForm from '../components/SeriesForm'
import RankingPicker from '../components/RankingPicker'

export default function AddSeries({ onAdd, series }) {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState(null)

  const handleFormSubmit = (data) => {
    setFormData(data)
    if (series.length === 0) {
      // No existing series, just add at rank 1
      onAdd(data, 1)
      navigate('/')
    } else {
      setStep(2)
    }
  }

  const handleRankConfirm = (rank) => {
    onAdd(formData, rank)
    navigate('/')
  }

  if (step === 2 && formData) {
    return (
      <div className="py-2 sm:py-4">
        <RankingPicker
          existingSeries={series}
          newSeriesData={formData}
          onConfirm={handleRankConfirm}
          onBack={() => setStep(1)}
        />
      </div>
    )
  }

  return (
    <div className="py-2 sm:py-4">
      <h1 className="text-xl sm:text-2xl font-bold text-text-primary mb-6 sm:mb-8 text-center">
        Ajouter une série
      </h1>
      <SeriesForm
        onSubmit={handleFormSubmit}
        submitLabel={series.length > 0 ? 'Suivant — Classement' : 'Ajouter la série'}
        navigateOnSubmit={false}
      />
    </div>
  )
}
