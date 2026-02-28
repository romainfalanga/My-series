import { useState, useRef, useCallback, useEffect } from 'react'
import StarRating from './StarRating'

export default function RankingPicker({ existingSeries, newSeriesData, onConfirm, onBack }) {
  // Build initial list: existing sorted by rank + new series at the end
  const buildInitialList = () => {
    const sorted = [...existingSeries].sort((a, b) => (a.rank || 0) - (b.rank || 0))
    const newItem = { ...newSeriesData, _isNew: true, _tempId: '__new__' }
    return [...sorted, newItem]
  }

  const [items, setItems] = useState(buildInitialList)
  const [dragIndex, setDragIndex] = useState(null)
  const [overIndex, setOverIndex] = useState(null)
  const listRef = useRef(null)
  const itemRefs = useRef([])
  const dragStartY = useRef(0)
  const dragCurrentY = useRef(0)
  const scrollInterval = useRef(null)

  // Cleanup scroll interval on unmount
  useEffect(() => {
    return () => {
      if (scrollInterval.current) clearInterval(scrollInterval.current)
    }
  }, [])

  const getItemIndexAtY = useCallback((clientY) => {
    for (let i = 0; i < itemRefs.current.length; i++) {
      const el = itemRefs.current[i]
      if (!el) continue
      const rect = el.getBoundingClientRect()
      const midY = rect.top + rect.height / 2
      if (clientY < midY) return i
    }
    return itemRefs.current.length - 1
  }, [])

  const autoScroll = useCallback((clientY) => {
    const container = listRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const threshold = 60
    const speed = 8

    if (scrollInterval.current) {
      clearInterval(scrollInterval.current)
      scrollInterval.current = null
    }

    if (clientY - rect.top < threshold) {
      scrollInterval.current = setInterval(() => {
        container.scrollTop -= speed
      }, 16)
    } else if (rect.bottom - clientY < threshold) {
      scrollInterval.current = setInterval(() => {
        container.scrollTop += speed
      }, 16)
    }
  }, [])

  const handleDragStart = useCallback((index, clientY) => {
    setDragIndex(index)
    setOverIndex(index)
    dragStartY.current = clientY
    dragCurrentY.current = clientY
  }, [])

  const handleDragMove = useCallback((clientY) => {
    if (dragIndex === null) return
    dragCurrentY.current = clientY
    const targetIndex = getItemIndexAtY(clientY)
    setOverIndex(targetIndex)
    autoScroll(clientY)
  }, [dragIndex, getItemIndexAtY, autoScroll])

  const handleDragEnd = useCallback(() => {
    if (dragIndex !== null && overIndex !== null && dragIndex !== overIndex) {
      setItems((prev) => {
        const next = [...prev]
        const [moved] = next.splice(dragIndex, 1)
        next.splice(overIndex, 0, moved)
        return next
      })
    }
    setDragIndex(null)
    setOverIndex(null)
    if (scrollInterval.current) {
      clearInterval(scrollInterval.current)
      scrollInterval.current = null
    }
  }, [dragIndex, overIndex])

  // Pointer events for both mouse and touch
  const handlePointerDown = useCallback((e, index) => {
    e.preventDefault()
    handleDragStart(index, e.clientY)

    const onPointerMove = (e2) => {
      e2.preventDefault()
      handleDragMove(e2.clientY)
    }
    const onPointerUp = () => {
      handleDragEnd()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
    }
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
  }, [handleDragStart, handleDragMove, handleDragEnd])

  const handleConfirm = () => {
    const newIndex = items.findIndex((item) => item._isNew)
    const rank = newIndex + 1
    onConfirm(rank)
  }

  const newIndex = items.findIndex((item) => item._isNew)

  return (
    <div className="max-w-lg mx-auto">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-1">
          Classement
        </h2>
        <p className="text-sm text-text-secondary">
          Glissez <span className="text-accent font-medium">{newSeriesData.title}</span> à
          la position souhaitée dans votre classement.
        </p>
      </div>

      <div
        ref={listRef}
        className="space-y-1.5 max-h-[60vh] overflow-y-auto overscroll-contain pb-2 -mx-1 px-1"
      >
        {items.map((item, index) => {
          const isNew = item._isNew
          const isDragging = dragIndex === index
          const isDropTarget = dragIndex !== null && overIndex === index && dragIndex !== index

          return (
            <div
              key={isNew ? '__new__' : item.id}
              ref={(el) => (itemRefs.current[index] = el)}
              className={`
                flex items-center gap-3 rounded-xl border p-3 sm:p-3.5 transition-all select-none
                ${isNew
                  ? 'bg-accent/10 border-accent/40 ring-2 ring-accent/20'
                  : 'bg-bg-card border-border'
                }
                ${isDragging ? 'opacity-40 scale-95' : ''}
                ${isDropTarget ? 'border-accent border-2 translate-y-0.5' : ''}
              `}
            >
              {/* Drag handle */}
              <button
                type="button"
                onPointerDown={(e) => handlePointerDown(e, index)}
                className="touch-none p-2 -m-1 rounded-lg text-text-secondary hover:text-text-primary hover:bg-white/5 active:bg-white/10 cursor-grab active:cursor-grabbing flex-shrink-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                </svg>
              </button>

              {/* Rank number */}
              <span className={`
                w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0
                ${isNew ? 'bg-accent text-white' : 'bg-white/5 text-text-secondary'}
              `}>
                {index + 1}
              </span>

              {/* Series info */}
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${isNew ? 'text-accent' : 'text-text-primary'}`}>
                  {item.title}
                  {isNew && <span className="ml-2 text-xs text-accent/70">NOUVEAU</span>}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <StarRating rating={item.rating} readonly size="sm" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 space-y-3">
        <p className="text-center text-sm text-text-secondary">
          Position actuelle : <span className="text-accent font-bold">#{newIndex + 1}</span> sur {items.length}
        </p>
        <div className="flex gap-3">
          <button
            onClick={handleConfirm}
            className="flex-1 py-3.5 sm:py-3 bg-accent hover:bg-accent-hover active:bg-accent-hover text-white rounded-xl font-medium transition-colors"
          >
            Confirmer le classement
          </button>
          <button
            onClick={onBack}
            className="px-5 py-3.5 sm:py-3 bg-bg-input border border-border text-text-secondary rounded-xl font-medium hover:border-accent/50 active:bg-white/5 transition-colors"
          >
            Retour
          </button>
        </div>
      </div>
    </div>
  )
}
