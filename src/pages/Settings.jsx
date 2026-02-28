import { useRef, useState } from 'react'

export default function Settings({ onImport, onExport, seriesCount }) {
  const fileInputRef = useRef(null)
  const [message, setMessage] = useState(null)

  const handleExport = () => {
    const data = onExport()
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `my-series-backup-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
    setMessage({ type: 'success', text: 'Données exportées avec succès !' })
  }

  const handleImport = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const success = onImport(event.target.result)
      if (success) {
        setMessage({ type: 'success', text: 'Données importées avec succès !' })
      } else {
        setMessage({ type: 'error', text: 'Fichier invalide. Vérifiez le format JSON.' })
      }
      fileInputRef.current.value = ''
    }
    reader.readAsText(file)
  }

  return (
    <div className="max-w-lg mx-auto space-y-6 sm:space-y-8">
      <h1 className="text-xl sm:text-2xl font-bold text-text-primary">Gestion des données</h1>

      <div className="bg-bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-4">
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-text-primary mb-1">Exporter</h2>
          <p className="text-sm text-text-secondary mb-4">
            Téléchargez une sauvegarde de vos {seriesCount} séries au format JSON.
          </p>
          <button
            onClick={handleExport}
            disabled={seriesCount === 0}
            className="w-full py-3 bg-accent hover:bg-accent-hover active:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors"
          >
            Exporter mes données
          </button>
        </div>

        <hr className="border-border" />

        <div>
          <h2 className="text-base sm:text-lg font-semibold text-text-primary mb-1">Importer</h2>
          <p className="text-sm text-text-secondary mb-4">
            Restaurez vos données depuis un fichier JSON. Attention, cela remplacera les données actuelles.
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-3 bg-bg-input border border-border text-text-primary rounded-xl font-medium hover:border-accent/50 active:bg-white/5 transition-colors"
          >
            Importer un fichier JSON
          </button>
        </div>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl text-sm font-medium ${
            message.type === 'success'
              ? 'bg-green-500/10 text-green-400 border border-green-500/30'
              : 'bg-red-500/10 text-red-400 border border-red-500/30'
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  )
}
