import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const AVATARS = ['⚽', '🏆', '🥇', '🌟', '🦁', '🦅', '🔥', '💫']

export default function Navbar({ stats }) {
  const { profile, logout } = useAuth()
  const { pathname } = useLocation()

  const avatar = profile?.avatar != null ? AVATARS[profile.avatar] ?? '⚽' : '⚽'

  return (
    <nav className="sticky top-0 z-40 bg-brand-surface/95 backdrop-blur-md border-b border-brand-border">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/album" className="flex items-center gap-2 shrink-0">
          <span className="text-xl">🌍</span>
          <span className="font-display text-lg tracking-widest text-brand-gold hidden sm:block">
            WORLDSTICKER 2026
          </span>
          <span className="font-display text-lg tracking-widest text-brand-gold sm:hidden">WS26</span>
        </Link>

        {/* Progress pill */}
        {stats && (
          <div className="hidden md:flex items-center gap-2 bg-brand-surface2 rounded-full px-4 py-1.5 border border-brand-border">
            <div className="w-20 h-1.5 bg-brand-border rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-gold rounded-full transition-all duration-500"
                style={{ width: `${stats.completado}%` }}
              />
            </div>
            <span className="text-xs font-bold text-brand-gold">{stats.completado}%</span>
            <span className="text-xs text-brand-muted">{stats.tengo}/{stats.total}</span>
          </div>
        )}

        {/* Right: nav links + avatar */}
        <div className="flex items-center gap-2">
          <Link
            to="/album"
            className={`text-sm font-semibold px-3 py-1.5 rounded-lg transition-colors
              ${pathname === '/album' ? 'bg-brand-gold text-black' : 'text-brand-muted hover:text-brand-text'}`}
          >
            Álbum
          </Link>
          <Link
            to="/stats"
            className={`text-sm font-semibold px-3 py-1.5 rounded-lg transition-colors
              ${pathname === '/stats' ? 'bg-brand-gold text-black' : 'text-brand-muted hover:text-brand-text'}`}
          >
            Stats
          </Link>

          {/* Avatar + menu */}
          <div className="relative group ml-1">
            <button className="w-8 h-8 rounded-full bg-brand-surface2 border border-brand-border flex items-center justify-center text-lg hover:border-brand-gold transition-colors">
              {avatar}
            </button>
            {/* Dropdown */}
            <div className="absolute right-0 top-full mt-1 w-44 bg-brand-surface2 border border-brand-border rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              {profile && (
                <div className="px-3 py-2 border-b border-brand-border">
                  <p className="text-sm font-bold text-brand-text truncate">{profile.displayName}</p>
                  <p className="text-xs text-brand-muted">@{profile.nickname}</p>
                </div>
              )}
              <button
                onClick={logout}
                className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors rounded-b-xl"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
