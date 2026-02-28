import { useState, useEffect, useCallback } from 'react'
import { STORAGE_KEY } from '../utils/constants'

function loadSeries() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return []
    const parsed = JSON.parse(data)
    return migrateRanks(parsed)
  } catch {
    return []
  }
}

function migrateRanks(series) {
  const hasRanks = series.some((s) => typeof s.rank === 'number')
  if (hasRanks) return series

  // Auto-assign ranks based on rating (highest first)
  const sorted = [...series].sort((a, b) => (b.rating || 0) - (a.rating || 0))
  return sorted.map((s, i) => ({ ...s, rank: i + 1 }))
}

function saveSeries(series) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(series))
}

export function useSeries() {
  const [series, setSeries] = useState(loadSeries)

  useEffect(() => {
    saveSeries(series)
  }, [series])

  const addSeries = useCallback((newSeries, rank) => {
    setSeries((prev) => {
      const insertRank = rank ?? prev.length + 1

      // Shift existing series that are at or below the insertion rank
      const shifted = prev.map((s) =>
        s.rank >= insertRank ? { ...s, rank: s.rank + 1 } : s
      )

      return [...shifted, { ...newSeries, id: crypto.randomUUID(), rank: insertRank }]
    })
  }, [])

  const updateSeries = useCallback((id, updates) => {
    setSeries((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    )
  }, [])

  const deleteSeries = useCallback((id) => {
    setSeries((prev) => {
      const deleted = prev.find((s) => s.id === id)
      if (!deleted) return prev.filter((s) => s.id !== id)

      // Re-compact ranks after deletion
      return prev
        .filter((s) => s.id !== id)
        .map((s) => (s.rank > deleted.rank ? { ...s, rank: s.rank - 1 } : s))
    })
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
        setSeries(migrateRanks(parsed))
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
