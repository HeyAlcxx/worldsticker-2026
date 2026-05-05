import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.email, form.password)
      navigate('/album')
    } catch (err) {
      const msgs = {
        'auth/invalid-credential': 'Correo o contraseña incorrectos.',
        'auth/user-not-found': 'No existe una cuenta con ese correo.',
        'auth/wrong-password': 'Contraseña incorrecta.',
        'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde.',
      }
      setError(msgs[err.code] ?? 'Error al iniciar sesión. Inténtalo de nuevo.')
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
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="WorldSticker 2026" className="h-32 w-auto mx-auto" />
        </div>
        <div className="bg-brand-surface border border-brand-border rounded-2xl p-8">
          <h2 className="font-display text-2xl tracking-wide text-brand-text mb-6">Iniciar sesión</h2>
          {error && <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-brand-muted mb-1.5 uppercase tracking-wider">Correo electrónico</label>
              <input type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="tu@correo.com" className="input-field" />
            </div>
            <div>
              <label className="block text-xs font-bold text-brand-muted mb-1.5 uppercase tracking-wider">Contraseña</label>
              <input type="password" required value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="••••••••" className="input-field" />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full mt-2 disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Entrando…' : 'Entrar al álbum'}
            </button>
          </form>
          <p className="text-center text-sm text-brand-muted mt-6">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="text-brand-gold font-bold hover:underline">Regístrate</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
