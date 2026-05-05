import StickerCard from './StickerCard'

export default function SpecialSection({ section, album, updateSticker, sectionStats }) {
  const { tengo, total, pct } = sectionStats(section.stickers)

  return (
    <div className="mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{section.emoji}</span>
          <div>
            <h3 className="font-display text-lg tracking-wide text-brand-text leading-none">
              {section.name}
            </h3>
            {section.note && (
              <p className="text-xs text-brand-muted mt-0.5 max-w-xs">{section.note}</p>
            )}
          </div>
        </div>

        {/* Progreso */}
        <div className="text-right shrink-0">
          <span className="text-sm font-bold" style={{ color: section.color }}>{tengo}/{total}</span>
          <div className="w-24 h-1.5 bg-brand-border rounded-full mt-1 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${pct}%`, backgroundColor: section.color }}
            />
          </div>
        </div>
      </div>

      {/* Grid de figuritas */}
      <div className="grid gap-1.5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))' }}>
        {section.stickers.map(sticker => (
          <StickerCard
            key={sticker.id}
            sticker={sticker}
            stickerData={album[sticker.id]}
            onUpdate={updateSticker}
          />
        ))}
      </div>
    </div>
  )
}
