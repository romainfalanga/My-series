import { useState } from 'react'

export default function StarRating({ rating = 0, onChange, readonly = false, size = 'md' }) {
  const [hovered, setHovered] = useState(0)
  const sizeClass = size === 'sm' ? 'text-lg' : 'text-2xl'

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          className={`${sizeClass} transition-colors ${
            readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'
          } ${
            star <= (hovered || rating) ? 'text-yellow-400' : 'text-gray-600'
          }`}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => !readonly && setHovered(star)}
          onMouseLeave={() => !readonly && setHovered(0)}
        >
          ★
        </button>
      ))}
    </div>
  )
}
