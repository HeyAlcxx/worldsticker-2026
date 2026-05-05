import { useState, useRef, useEffect } from 'react'
import { STATUSES } from '../hooks/useAlbum'

const STATUS_CLASSES = {
  tengo:       'border-green-500 bg-green-500/10',
  sobra:       'border-amber-500 bg-amber-500/10',
  intercambio: 'border-blue-500  bg-blue-500/10',
  busco:       'border-red-500   bg-red-500/10',
}

export default function StickerCard({ sticker, stickerData, onUpdate }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const status = stickerData?.status ?? null
  const quantity = stickerData?.quantity ?? 1

  // Cerrar al hacer click fuera
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const handleStatusClick = (key) => {
    if (status === key) {
      onUpdate(sticker.id, null) // Toggle off
    } else {
      onUpdate(sticker.id, key, key === 'sobra' ? quantity : 1)
    }
    setOpen(false)
  }

  const handleQuantityChange = (delta) => {
    const newQty = Math.max(1, (quantity) + delta)
    onUpdate(sticker.id, 'sobra', newQty)
  }

  const currentStatus = STATUSES.find(s => s.key === status)

  return (
    <div ref={ref} className="relative">
      {/* Card principal */}
      <button
        onClick={() => setOpen(!open)}
        className={`
          w-full text-left rounded-lg border transition-all duration-200 cursor-pointer
          ${sticker.foil ? 'foil-card border-yellow-400 text-black' : (STATUS_CLASSES[status] ?? 'border-brand-border bg-brand-surface hover:bg-brand-surface2')}
          ${open ? 'ring-2 ring-brand-gold ring-opacity-60' : ''}
        `}
        style={{ minHeight: '72px', padding: '8px 10px' }}
      >
        <div className="flex items-start justify-between gap-1">
          <span className={`text-xs font-bold font-display tracking-wide ${sticker.foil ? 'text-black/70' : 'text-brand-muted'}`}>
            #{sticker.num}
          </span>
          {currentStatus && (
            <span className="text-sm leading-none">{currentStatus.icon}</span>
          )}
        </div>
        <p className={`text-xs font-semibold leading-tight mt-1 ${sticker.foil ? 'text-black' : 'text-brand-text'} ${sticker.tbc ? 'italic opacity-50' : ''}`}>
          {sticker.name}
        </p>
        {/* Cantidad sobra */}
        {status === 'sobra' && quantity > 1 && (
          <span className="mt-1 inline-block text-xs font-bold bg-amber-500/30 text-amber-400 rounded px-1">
            ×{quantity}
          </span>
        )}
      </button>

      {/* Picker flotante */}
      {open && (
        <div className="absolute bottom-full left-0 mb-1 z-50 bg-brand-surface2 border border-brand-border rounded-xl shadow-2xl p-2 w-44 animate-slideUp">
          <p className="text-xs text-brand-muted mb-2 px-1 font-body">#{sticker.num} — {sticker.name}</p>

          {STATUSES.map(s => (
            <button
              key={s.key}
              onClick={() => handleStatusClick(s.key)}
              className={`
                flex items-center gap-2 w-full rounded-lg px-2 py-1.5 text-xs font-semibold transition-all mb-0.5
                ${status === s.key ? 'text-white' : 'text-brand-muted hover:text-brand-text hover:bg-brand-border'}
              `}
              style={status === s.key ? { background: s.bg, color: s.color } : {}}
            >
              <span>{s.icon}</span>
              <span>{s.label}</span>
              {status === s.key && <span className="ml-auto text-xs opacity-60">✓</span>}
            </button>
          ))}

          {/* Contador cantidad para "sobra" */}
          {status === 'sobra' && (
            <div className="mt-2 pt-2 border-t border-brand-border flex items-center justify-between px-1">
              <span className="text-xs text-brand-muted">Cantidad:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="w-6 h-6 rounded-full bg-brand-border hover:bg-brand-gold hover:text-black text-brand-text text-sm font-bold flex items-center justify-center transition-colors"
                >−</button>
                <span className="text-sm font-bold text-amber-400 w-4 text-center">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="w-6 h-6 rounded-full bg-brand-border hover:bg-brand-gold hover:text-black text-brand-text text-sm font-bold flex items-center justify-center transition-colors"
                >+</button>
              </div>
            </div>
          )}

          {/* Limpiar */}
          {status && (
            <button
              onClick={() => { onUpdate(sticker.id, null); setOpen(false) }}
              className="w-full text-center text-xs text-brand-muted hover:text-red-400 transition-colors mt-1 pt-1 border-t border-brand-border"
            >
              Quitar estado
            </button>
          )}
        </div>
      )}
    </div>
  )
}
