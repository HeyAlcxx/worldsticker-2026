import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const AVATARS = ['⚽', '🏆', '🥇', '🌟', '🦁', '🦅', '🔥', '💫']

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    displayName: '',
    nickname: '',
    email: '',
    password: '',
    confirm: '',
    avatar: 0,
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (form.password.length < 6) {
      return setError('La contraseña debe tener al menos 6 caracteres.')
    }
    if (form.password !== form.confirm) {
      return setError('Las contraseñas no coinciden.')
    }
    if (!form.nickname.trim()) {
      return setError('El nickname no puede estar vacío.')
    }

    setLoading(true)
    try {
      await register({
        email: form.email,
        password: form.password,
        displayName: form.displayName.trim(),
        nickname: form.nickname.trim().toLowerCase(),
        avatar: form.avatar,
      })
      navigate('/album')
    } catch (err) {
      const msgs = {
        'auth/email-already-in-use': 'Ya existe una cuenta con ese correo.',
        'auth/weak-password': 'La contraseña es muy débil (mínimo 6 caracteres).',
        'auth/invalid-email': 'El correo no tiene un formato válido.',
      }
      setError(msgs[err.code] ?? 'Error al crear la cuenta. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-brand-bg">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🌍</div>
          <h1 className="font-display text-4xl tracking-widest text-brand-gold">WORLDSTICKER</h1>
          <p className="text-brand-muted text-sm mt-1">FIFA World Cup 2026</p>
        </div>

        <div className="bg-brand-surface border border-brand-border rounded-2xl p-8">
          <h2 className="font-display text-2xl tracking-wide text-brand-text mb-6">Crear cuenta</h2>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Avatar picker */}
            <div>
              <label className="block text-xs font-bold text-brand-muted mb-2 uppercase tracking-wider">
                Elige tu avatar
              </label>
              <div className="grid grid-cols-8 gap-1.5">
                {AVATARS.map((emoji, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setForm(f => ({ ...f, avatar: i }))}
                    className={`
                      text-2xl h-10 rounded-lg border-2 transition-all duration-150 flex items-center justify-center
                      ${form.avatar === i
                        ? 'border-brand-gold bg-brand-gold/10 scale-110'
                        : 'border-brand-border bg-brand-surface2 hover:border-brand-gold/50'
                      }
                    `}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-brand-muted mb-1.5 uppercase tracking-wider">
                  Nombre completo
                </label>
                <input
                  type="text"
                  required
                  value={form.displayName}
                  onChange={set('displayName')}
                  placeholder="Tu nombre"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-muted mb-1.5 uppercase tracking-wider">
                  Nickname
                </label>
                <input
                  type="text"
                  required
                  value={form.nickname}
                  onChange={set('nickname')}
                  placeholder="colector99"
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-muted mb-1.5 uppercase tracking-wider">
                Correo electrónico
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={set('email')}
                placeholder="tu@correo.com"
                className="input-field"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-brand-muted mb-1.5 uppercase tracking-wider">
                  Contraseña
                </label>
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={set('password')}
                  placeholder="Mín. 6 chars"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-muted mb-1.5 uppercase tracking-wider">
                  Confirmar
                </label>
                <input
                  type="password"
                  required
                  value={form.confirm}
                  onChange={set('confirm')}
                  placeholder="Repetir"
                  className="input-field"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full mt-2 disabled:opacity-50"
            >
              {loading ? 'Creando cuenta…' : 'Crear mi álbum'}
            </button>
          </form>

          <p className="text-center text-sm text-brand-muted mt-6">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-brand-gold font-bold hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
