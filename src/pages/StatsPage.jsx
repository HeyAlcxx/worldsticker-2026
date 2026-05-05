import { useAlbum } from '../hooks/useAlbum'
import { GROUPS, SPECIAL_SECTIONS } from '../data/stickers'
import Navbar from '../components/Navbar'

const BAR_COLORS = {
  tengo:       '#22C55E',
  sobra:       '#F59E0B',
  intercambio: '#3B82F6',
  busco:       '#EF4444',
}

function StatCard({ label, value, color, icon, sub }) {
  return (
    <div className="bg-brand-surface border border-brand-border rounded-2xl p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-brand-muted font-bold uppercase tracking-wider">{label}</p>
          <p className="font-display text-4xl mt-1" style={{ color }}>{value}</p>
          {sub && <p className="text-xs text-brand-muted mt-0.5">{sub}</p>}
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
    </div>
  )
}

function MiniBar({ pct, color }) {
  return (
    <div className="w-full h-1.5 bg-brand-border rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${pct}%`, backgroundColor: color }}
      />
    </div>
  )
}

export default function StatsPage() {
  const { stats, teamStats, sectionStats, loading } = useAlbum()

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">
      <Navbar stats={stats} />

      <div className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
        <h1 className="font-display text-3xl tracking-widest text-brand-gold mb-6">ESTADÍSTICAS</h1>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Cards globales */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatCard label="Álbum completo" value={`${stats.completado}%`} color="#F6C700" icon="🏆" sub={`${stats.tengo}/${stats.total} figuritas`} />
              <StatCard label="La tengo" value={stats.tengo} color="#22C55E" icon="✅" />
              <StatCard label="Me sobra" value={stats.sobra} color="#F59E0B" icon="📦" sub={`${stats.sobraTotal} duplicados`} />
              <StatCard label="La busco" value={stats.busco} color="#EF4444" icon="❓" />
            </div>

            {/* Barra combinada */}
            <div className="bg-brand-surface border border-brand-border rounded-2xl p-5 mb-8">
              <h2 className="font-display text-xl tracking-wide text-brand-text mb-4">Distribución de figuritas</h2>
              <div className="flex h-6 rounded-full overflow-hidden bg-brand-border w-full">
                {['tengo','sobra','intercambio','busco'].map(k => {
                  const pct = stats.total > 0 ? (stats[k] / stats.total) * 100 : 0
                  return pct > 0 ? (
                    <div key={k} style={{ width: `${pct}%`, backgroundColor: BAR_COLORS[k] }} title={`${k}: ${stats[k]}`} />
                  ) : null
                })}
              </div>
              <div className="flex flex-wrap gap-4 mt-3">
                {[
                  { k: 'tengo', l: 'La tengo' },
                  { k: 'sobra', l: 'Me sobra' },
                  { k: 'intercambio', l: 'Intercambio' },
                  { k: 'busco', l: 'La busco' },
                ].map(({ k, l }) => (
                  <div key={k} className="flex items-center gap-1.5 text-xs">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: BAR_COLORS[k] }} />
                    <span className="text-brand-muted">{l}: </span>
                    <span className="font-bold text-brand-text">{stats[k]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Progreso por grupo */}
            <div className="bg-brand-surface border border-brand-border rounded-2xl p-5 mb-8">
              <h2 className="font-display text-xl tracking-wide text-brand-text mb-4">Progreso por grupo</h2>
              <div className="space-y-3">
                {GROUPS.map(g => {
                  // Progreso del grupo = promedio de los 4 equipos
                  const groupTengo = g.teams.reduce((acc, t) => acc + teamStats(t.code).tengo, 0)
                  const groupTotal = g.teams.length * 12
                  const pct = Math.round((groupTengo / groupTotal) * 100)
                  return (
                    <div key={g.letter}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-display text-brand-gold w-6">G{g.letter}</span>
                          <span className="text-brand-muted text-xs">
                            {g.teams.map(t => t.flag).join(' ')}
                          </span>
                        </div>
                        <span className="font-bold text-brand-text">{groupTengo}/{groupTotal}</span>
                      </div>
                      <MiniBar pct={pct} color="#F6C700" />
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Progreso por equipo (top 10 más completos) */}
            <div className="bg-brand-surface border border-brand-border rounded-2xl p-5 mb-8">
              <h2 className="font-display text-xl tracking-wide text-brand-text mb-4">Equipos más completos</h2>
              <div className="space-y-2">
                {GROUPS
                  .flatMap(g => g.teams)
                  .map(t => ({ ...t, ...teamStats(t.code) }))
                  .sort((a, b) => b.pct - a.pct)
                  .slice(0, 12)
                  .map(t => (
                    <div key={t.code} className="flex items-center gap-3">
                      <span className="text-lg w-6 text-center">{t.flag}</span>
                      <span className="text-xs font-bold text-brand-muted w-10">{t.code}</span>
                      <div className="flex-1">
                        <MiniBar pct={t.pct} color="#22C55E" />
                      </div>
                      <span className="text-xs font-bold text-brand-text w-10 text-right">{t.tengo}/12</span>
                    </div>
                  ))
                }
              </div>
            </div>

            {/* Secciones especiales */}
            <div className="bg-brand-surface border border-brand-border rounded-2xl p-5">
              <h2 className="font-display text-xl tracking-wide text-brand-text mb-4">Secciones especiales</h2>
              <div className="space-y-3">
                {SPECIAL_SECTIONS.map(s => {
                  const ss = sectionStats(s.stickers)
                  return (
                    <div key={s.id}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <div className="flex items-center gap-2">
                          <span>{s.emoji}</span>
                          <span className="text-brand-text text-xs font-semibold">{s.name}</span>
                        </div>
                        <span className="font-bold" style={{ color: s.color }}>{ss.tengo}/{ss.total}</span>
                      </div>
                      <MiniBar pct={ss.pct} color={s.color} />
                    </div>
                  )
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
