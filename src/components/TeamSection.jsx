import StickerCard from './StickerCard'
import { getTeamStickers } from '../data/stickers'

export default function TeamSection({ team, album, updateSticker, teamStats }) {
  const stickers = getTeamStickers(team)
  const { tengo, total, pct } = teamStats

  return (
    <div className="mb-6">
      {/* Header del equipo */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{team.flag}</span>
          <div>
            <h3 className="font-display text-lg tracking-wide text-brand-text leading-none">
              {team.name}
            </h3>
            <p className="text-xs text-brand-muted mt-0.5">{team.code}</p>
          </div>
        </div>

        {/* Progreso del equipo */}
        <div className="text-right">
          <span className="text-sm font-bold text-brand-gold">{tengo}/{total}</span>
          <div className="w-24 h-1.5 bg-brand-border rounded-full mt-1 overflow-hidden">
            <div
              className="h-full bg-brand-gold rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Grid de figuritas */}
      <div className="grid gap-1.5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))' }}>
        {stickers.map(sticker => (
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
