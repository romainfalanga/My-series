export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onCancel}
    >
      <div
        className="bg-bg-card border border-border sm:rounded-2xl rounded-t-2xl p-6 sm:max-w-sm w-full pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:pb-6"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-text-primary mb-6 text-center sm:text-left">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 py-3 sm:py-2.5 bg-red-500 hover:bg-red-600 active:bg-red-600 text-white rounded-xl font-medium transition-colors"
          >
            Confirmer
          </button>
          <button
            onClick={onCancel}
            className="flex-1 py-3 sm:py-2.5 bg-bg-input border border-border text-text-secondary rounded-xl font-medium hover:border-accent/50 active:bg-white/5 transition-colors"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  )
}
