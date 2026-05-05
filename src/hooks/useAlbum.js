import { useState, useEffect, useCallback } from 'react'
import { doc, onSnapshot, setDoc, updateDoc, deleteField } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useAuth } from '../context/AuthContext'
import { ALL_STICKER_IDS } from '../data/stickers'

export const STATUSES = [
  { key: 'tengo',       label: 'La tengo',    icon: '✅', color: '#22C55E', bg: 'rgba(34,197,94,0.15)' },
  { key: 'sobra',       label: 'Me sobra',    icon: '📦', color: '#F59E0B', bg: 'rgba(245,158,11,0.15)' },
  { key: 'intercambio', label: 'Intercambio', icon: '🔄', color: '#3B82F6', bg: 'rgba(59,130,246,0.15)' },
  { key: 'busco',       label: 'La busco',    icon: '❓', color: '#EF4444', bg: 'rgba(239,68,68,0.15)' },
]

export function useAlbum() {
  const { user } = useAuth()
  const [album, setAlbum] = useState({}) // { [stickerId]: { status, quantity } }
  const [loading, setLoading] = useState(true)

  // Escuchar cambios en tiempo real
  useEffect(() => {
    if (!user) { setAlbum({}); setLoading(false); return }

    const ref = doc(db, 'albums', user.uid)
    const unsub = onSnapshot(ref, (snap) => {
      setAlbum(snap.exists() ? (snap.data().stickers ?? {}) : {})
      setLoading(false)
    }, () => setLoading(false))

    return unsub
  }, [user])

  /** Actualiza el estado de una figurita */
  const updateSticker = useCallback(async (stickerId, newStatus, quantity = 1) => {
    if (!user) return
    const ref = doc(db, 'albums', user.uid)

    if (!newStatus) {
      // Eliminar figurita del registro
      try {
        await updateDoc(ref, { [`stickers.${stickerId}`]: deleteField() })
      } catch {
        // Documento puede no existir aún — no pasa nada
      }
    } else {
      await setDoc(
        ref,
        { stickers: { [stickerId]: { status: newStatus, quantity } } },
        { merge: true }
      )
    }
  }, [user])

  // =====================
  // Estadísticas globales
  // =====================
  const stats = (() => {
    const total = ALL_STICKER_IDS.length
    let tengo = 0, sobra = 0, intercambio = 0, busco = 0
    let sobraTotal = 0

    for (const id of ALL_STICKER_IDS) {
      const s = album[id]
      if (!s) continue
      if (s.status === 'tengo')       tengo++
      if (s.status === 'sobra')     { sobra++; sobraTotal += (s.quantity ?? 1) }
      if (s.status === 'intercambio') intercambio++
      if (s.status === 'busco')       busco++
    }

    const completado = total > 0 ? Math.round((tengo / total) * 100) : 0
    return { total, tengo, sobra, sobraTotal, intercambio, busco, completado }
  })()

  /** Progreso de un equipo específico */
  const teamStats = useCallback((teamCode) => {
    let tengo = 0
    for (let i = 0; i <= 11; i++) {
      const id = `${teamCode}_${i}`
      if (album[id]?.status === 'tengo') tengo++
    }
    return { tengo, total: 12, pct: Math.round((tengo / 12) * 100) }
  }, [album])

  /** Progreso de una sección especial */
  const sectionStats = useCallback((stickers) => {
    let tengo = 0
    for (const s of stickers) {
      if (album[s.id]?.status === 'tengo') tengo++
    }
    const total = stickers.length
    return { tengo, total, pct: Math.round((tengo / total) * 100) }
  }, [album])

  return { album, loading, updateSticker, stats, teamStats, sectionStats }
}
