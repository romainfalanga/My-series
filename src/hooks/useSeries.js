import { useState, useEffect, useCallback } from 'react'
import { STORAGE_KEY } from '../utils/constants'

function loadSeries() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

function saveSeries(series) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(series))
}

export function useSeries() {
  const [series, setSeries] = useState(loadSeries)

  useEffect(() => {
    saveSeries(series)
  }, [series])

  const addSeries = useCallback((newSeries) => {
    setSeries((prev) => [...prev, { ...newSeries, id: crypto.randomUUID() }])
  }, [])

  const updateSeries = useCallback((id, updates) => {
    setSeries((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    )
  }, [])

  const deleteSeries = useCallback((id) => {
    setSeries((prev) => prev.filter((s) => s.id !== id))
  }, [])

  const resetRewatch = useCallback((id) => {
    setSeries((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, lastWatchedDate: new Date().toISOString().split('T')[0] }
          : s
      )
    )
  }, [])

  const importData = useCallback((data) => {
    try {
      const parsed = typeof data === 'string' ? JSON.parse(data) : data
      if (Array.isArray(parsed)) {
        setSeries(parsed)
        return true
      }
      return false
    } catch {
      return false
    }
  }, [])

  const exportData = useCallback(() => {
    return JSON.stringify(series, null, 2)
  }, [series])

  return {
    series,
    addSeries,
    updateSeries,
    deleteSeries,
    resetRewatch,
    importData,
    exportData,
  }
}
