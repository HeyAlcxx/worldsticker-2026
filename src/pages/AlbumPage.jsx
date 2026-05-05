import { useState } from 'react'
import { useAlbum } from '../hooks/useAlbum'
import { GROUPS, SPECIAL_SECTIONS } from '../data/stickers'
import TeamSection from '../components/TeamSection'
import SpecialSection from '../components/SpecialSection'
import Navbar from '../components/Navbar'

const SECTION_TABS = [
  ...GROUPS.map(g => ({ key: `group-${g.letter}`, label: g.letter, type: 'group', data: g })),
  ...SPECIAL_SECTIONS.map(s => ({ key: `special-${s.id}`, label: s.emoji, type: 'special', data: s })),
]

const STATUS_LEGEND = [
  { key: 'tengo',       icon: '✅', label: 'La tengo',    color: '#22C55E' },
  { key: 'sobra',       icon: '📦', label: 'Me sobra',    color: '#F59E0B' },
  { key: 'intercambio', icon: '🔄', label: 'Intercambio', color: '#3B82F6' },
  { key: 'busco',       icon: '❓', label: 'La busco',    color: '#EF4444' },
]

export default function AlbumPage() {
  const { album, loading, updateSticker, stats, teamStats, sectionStats } = useAlbum()
  const [activeTab, setActiveTab] = useState('group-A')

  const active = SECTION_TABS.find(t => t.key === activeTab)

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">
      <Navbar stats={stats} />

      <div className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
        {/* Barra de progreso global */}
        <div className="bg-brand-surface border border-brand-border rounded-2xl p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="font-display text-2xl tracking-wide text-brand-gold">Mi Álbum</h2>
              <p className="text-brand-muted text-sm">
                {stats.tengo} de {stats.total} figuritas
              </p>
            </div>
            <div className="text-right">
              <span className="font-display text-4xl text-brand-gold">{stats.completado}%</span>
            </div>
          </div>
          <div className="w-full h-2 bg-brand-border rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-gold rounded-full transition-all duration-700"
              style={{ width: `${stats.completado}%` }}
            />
          </div>
          {/* Mini stats */}
          <div className="grid grid-cols-4 gap-3 mt-4">
            {STATUS_LEGEND.map(s => (
              <div key={s.key} className="text-center">
                <div className="text-lg">{s.icon}</div>
                <div className="font-bold text-sm" style={{ color: s.color }}>{stats[s.key]}</div>
                <div className="text-xs text-brand-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Leyenda */}
        <div className="flex flex-wrap gap-3 mb-4 text-xs text-brand-muted">
          <span className="font-bold text-brand-text">Leyenda:</span>
          {STATUS_LEGEND.map(s => (
            <span key={s.key} className="flex items-center gap-1">
              {s.icon} {s.label}
            </span>
          ))}
          <span className="flex items-center gap-1">
            <span className="inline-block w-4 h-4 rounded foil-card" /> Figurita FOIL
          </span>
        </div>

        {/* Tabs de grupos */}
        <div className="flex gap-1.5 flex-wrap mb-6 bg-brand-surface border border-brand-border rounded-xl p-1.5">
          {SECTION_TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`
                px-3 py-1.5 rounded-lg text-sm font-bold transition-all duration-150
                ${activeTab === tab.key
                  ? 'bg-brand-gold text-black shadow-sm'
                  : 'text-brand-muted hover:text-brand-text hover:bg-brand-surface2'
                }
              `}
            >
              {tab.type === 'group' ? `Grupo ${tab.label}` : tab.label}
            </button>
          ))}
        </div>

        {/* Contenido */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="animate-fadeIn">
            {active?.type === 'group' && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-10 bg-brand-gold rounded-full" />
                  <div>
                    <h2 className="font-display text-3xl tracking-widest text-brand-gold">
                      GRUPO {active.data.letter}
                    </h2>
                    <p className="text-xs text-brand-muted">
                      {active.data.teams.map(t => `${t.flag} ${t.name}`).join(' · ')}
                    </p>
                  </div>
                </div>
                {active.data.teams.map(team => (
                  <TeamSection
                    key={team.code}
                    team={team}
                    album={album}
                    updateSticker={updateSticker}
                    teamStats={teamStats(team.code)}
                  />
                ))}
              </div>
            )}

            {active?.type === 'special' && (
              <SpecialSection
                section={active.data}
                album={album}
                updateSticker={updateSticker}
                sectionStats={sectionStats}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
