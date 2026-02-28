import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSeries } from './hooks/useSeries'
import Navbar from './components/Navbar'
import ConfirmModal from './components/ConfirmModal'
import Dashboard from './pages/Dashboard'
import SeriesList from './pages/SeriesList'
import AddSeries from './pages/AddSeries'
import EditSeries from './pages/EditSeries'
import Settings from './pages/Settings'

export default function App() {
  const {
    series,
    addSeries,
    updateSeries,
    deleteSeries,
    resetRewatch,
    importData,
    exportData,
  } = useSeries()

  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const handleDelete = (id) => {
    setDeleteConfirm(id)
  }

  const confirmDelete = () => {
    if (deleteConfirm) {
      deleteSeries(deleteConfirm)
      setDeleteConfirm(null)
    }
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-bg-primary">
        <Navbar />
        <main className="max-w-5xl mx-auto px-4 py-4 pb-24 sm:py-8 sm:pb-8">
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  series={series}
                  onResetRewatch={resetRewatch}
                  onDelete={handleDelete}
                />
              }
            />
            <Route
              path="/series"
              element={
                <SeriesList
                  series={series}
                  onResetRewatch={resetRewatch}
                  onDelete={handleDelete}
                />
              }
            />
            <Route
              path="/add"
              element={<AddSeries onAdd={addSeries} series={series} />}
            />
            <Route
              path="/edit/:id"
              element={
                <EditSeries series={series} onUpdate={updateSeries} />
              }
            />
            <Route
              path="/settings"
              element={
                <Settings
                  onImport={importData}
                  onExport={exportData}
                  seriesCount={series.length}
                />
              }
            />
          </Routes>
        </main>
      </div>

      {deleteConfirm && (
        <ConfirmModal
          message="Êtes-vous sûr de vouloir supprimer cette série ?"
          onConfirm={confirmDelete}
          onCancel={() => setDeleteConfirm(null)}
        />
      )}
    </BrowserRouter>
  )
}
