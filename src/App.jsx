import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AlbumPage from './pages/AlbumPage'
import StatsPage from './pages/StatsPage'

/** Ruta protegida: redirige a /login si no hay sesión */
function Protected({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg">
        <div className="text-center">
          <div className="text-5xl mb-4">🌍</div>
          <div className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </div>
    )
  }

  return user ? children : <Navigate to="/login" replace />
}

/** Ruta pública: redirige al álbum si ya hay sesión */
function Public({ children }) {
  const { user, loading } = useAuth()
  if (loading) return null
  return user ? <Navigate to="/album" replace /> : children
}

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/login"    element={<Public><LoginPage /></Public>} />
          <Route path="/register" element={<Public><RegisterPage /></Public>} />
          <Route path="/album"    element={<Protected><AlbumPage /></Protected>} />
          <Route path="/stats"    element={<Protected><StatsPage /></Protected>} />
          <Route path="*"         element={<Navigate to="/album" replace />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  )
}
