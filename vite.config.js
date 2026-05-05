import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    // Para GitHub Pages: pon aquí el nombre de tu repositorio
    // Ejemplo: si tu repo es github.com/tuusuario/worldsticker-2026
    // pon base: '/worldsticker-2026/'
    base: env.VITE_BASE_URL || '/',
  }
})
