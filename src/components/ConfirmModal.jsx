export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-bg-card border border-border rounded-2xl p-6 max-w-sm w-full">
        <p className="text-text-primary mb-6">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors"
          >
            Confirmer
          </button>
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 bg-bg-input border border-border text-text-secondary rounded-xl font-medium hover:border-accent/50 transition-colors"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  )
}
