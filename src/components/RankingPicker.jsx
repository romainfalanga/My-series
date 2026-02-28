import { useState, useRef, useEffect, forwardRef } from 'react'
import StarRating from './StarRating'

export default function RankingPicker({ existingSeries, newSeriesData, onConfirm, onBack }) {
  const sorted = [...existingSeries].sort((a, b) => (a.rank || 0) - (b.rank || 0))

  // insertPosition = index in the existing list where the new series will be inserted
  // null means not yet placed, 0 = before first, sorted.length = after last
  const [insertPosition, setInsertPosition] = useState(null)
  const insertedRef = useRef(null)

  // Scroll to the inserted card when position changes
  useEffect(() => {
    if (insertPosition !== null && insertedRef.current) {
      insertedRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [insertPosition])

  const handleConfirm = () => {
    const rank = insertPosition !== null ? insertPosition + 1 : sorted.length + 1
    onConfirm(rank)
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Header */}
      <div className="mb-4 sm:mb-5">
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-1">
          Classement
        </h2>
        <p className="text-sm text-text-secondary">
          Placez <span className="text-accent font-medium">{newSeriesData.title}</span> dans
          votre classement en tapant sur un emplacement.
        </p>
      </div>

      {/* New series preview card */}
      <div className="mb-4 p-3 rounded-xl bg-accent/10 border border-accent/40 flex items-center gap-3">
        <span className="w-8 h-8 rounded-full bg-accent text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
          {insertPosition !== null ? insertPosition + 1 : '?'}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-accent truncate">{newSeriesData.title}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <StarRating rating={newSeriesData.rating} readonly size="sm" />
            <span className="text-[10px] font-semibold text-accent/60 uppercase">Nouveau</span>
          </div>
        </div>
      </div>

      {/* Ranked list with insertion slots */}
      <div className="max-h-[50vh] overflow-y-auto overscroll-contain -mx-1 px-1 pb-2">
        {/* Slot before first item */}
        <InsertSlot
          position={0}
          active={insertPosition === 0}
          onSelect={() => setInsertPosition(0)}
          label="Placer en #1"
        />

        {/* Inserted card at position 0 */}
        {insertPosition === 0 && (
          <NewSeriesCard
            ref={insertedRef}
            data={newSeriesData}
            rank={1}
          />
        )}

        {sorted.map((item, index) => {
          // If new series is inserted at or before this index, shift rank by 1
          const displayRank = insertPosition !== null && insertPosition <= index
            ? index + 2
            : index + 1

          return (
            <div key={item.id}>
              {/* Existing series row */}
              <div className="flex items-center gap-3 rounded-xl border border-border bg-bg-card p-3 sm:p-3.5">
                <span className="w-7 h-7 rounded-full bg-white/5 text-text-secondary text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {displayRank}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">{item.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <StarRating rating={item.rating} readonly size="sm" />
                  </div>
                </div>
              </div>

              {/* Slot after this item */}
              <InsertSlot
                position={index + 1}
                active={insertPosition === index + 1}
                onSelect={() => setInsertPosition(index + 1)}
                label={`Placer en #${index + 2}`}
              />

              {/* Inserted card after this item */}
              {insertPosition === index + 1 && (
                <NewSeriesCard
                  ref={insertedRef}
                  data={newSeriesData}
                  rank={index + 2}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Confirm / Back */}
      <div className="mt-5 space-y-3">
        {insertPosition !== null && (
          <p className="text-center text-sm text-text-secondary">
            Position choisie : <span className="text-accent font-bold">#{insertPosition + 1}</span> sur {sorted.length + 1}
          </p>
        )}
        <div className="flex gap-3">
          <button
            onClick={handleConfirm}
            disabled={insertPosition === null}
            className="flex-1 py-3.5 sm:py-3 bg-accent hover:bg-accent-hover active:bg-accent-hover disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors"
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

/* Insertion slot – tappable zone between existing series */
function InsertSlot({ position, active, onSelect, label }) {
  if (active) return null // Don't show slot when the card is already inserted here

  return (
    <button
      type="button"
      onClick={onSelect}
      className="group w-full py-2 my-1 flex items-center gap-2 outline-none"
    >
      <div className="flex-1 h-0.5 bg-border group-hover:bg-accent/50 group-active:bg-accent transition-colors rounded" />
      <span className="text-[11px] font-medium text-text-secondary group-hover:text-accent group-active:text-accent transition-colors whitespace-nowrap px-2 py-1 rounded-lg group-hover:bg-accent/10 group-active:bg-accent/10">
        {label}
      </span>
      <div className="flex-1 h-0.5 bg-border group-hover:bg-accent/50 group-active:bg-accent transition-colors rounded" />
    </button>
  )
}

/* The new series card rendered in-place in the list */
const NewSeriesCard = forwardRef(function NewSeriesCard({ data, rank }, ref) {
  return (
    <div
      ref={ref}
      className="flex items-center gap-3 rounded-xl border-2 border-accent bg-accent/10 p-3 sm:p-3.5 my-1 ring-2 ring-accent/20 animate-in"
    >
      <span className="w-7 h-7 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
        {rank}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-accent truncate">
          {data.title}
          <span className="ml-2 text-[10px] text-accent/60 uppercase">Nouveau</span>
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <StarRating rating={data.rating} readonly size="sm" />
        </div>
      </div>
    </div>
  )
})
