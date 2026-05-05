# 🌍 WorldSticker 2026

Controla tu álbum Panini del Mundial FIFA 2026. 633 figuritas, 4 estados por figurita, estadísticas en tiempo real.

**Stack:** React + Vite + Tailwind CSS + Firebase (Auth + Firestore) → GitHub Pages

---

## 📋 PASO 1 — Configurar Firebase (10 minutos)

### 1.1 Crear el proyecto en Firebase

1. Ve a **[firebase.google.com](https://firebase.google.com)** e inicia sesión con tu cuenta de Google
2. Click en **"Ir a la consola"** (esquina superior derecha)
3. Click en **"Agregar proyecto"**
4. Nombre del proyecto: `worldsticker-2026` (o el que quieras)
5. Google Analytics: puedes desactivarlo (no lo necesitamos) → click **"Crear proyecto"**
6. Espera ~30 segundos y click **"Continuar"**

### 1.2 Activar Authentication

1. En el menú izquierdo → **Authentication** → click **"Empezar"**
2. Tab **"Sign-in method"** → click **"Correo electrónico/contraseña"**
3. Activa el primer toggle (Correo electrónico/contraseña) → **"Guardar"**

### 1.3 Crear la base de datos Firestore

1. En el menú izquierdo → **Firestore Database** → click **"Crear base de datos"**
2. Selecciona **"Iniciar en modo de prueba"** (30 días gratis, luego ajustamos reglas)
3. Selecciona la ubicación más cercana (ej: `us-central1`) → **"Habilitar"**

### 1.4 Registrar tu app web y obtener las credenciales

1. En la página de inicio del proyecto → click en el ícono **`</>`** (Web)
2. Nombre de la app: `WorldSticker 2026` → click **"Registrar app"**
3. Verás un bloque de código con `firebaseConfig`. **Cópialo**, lo necesitas en el paso 2.
4. Click **"Continuar a la consola"**

---

## 📋 PASO 2 — Configurar el proyecto local

### 2.1 Instalar Node.js (si no lo tienes)

Descarga desde **[nodejs.org](https://nodejs.org)** → versión LTS (la verde)

### 2.2 Clonar / abrir el proyecto

Si ya tienes los archivos:
```bash
cd worldsticker-2026
```

### 2.3 Crear el archivo `.env`

Copia `.env.example` como `.env`:
```bash
# En Windows:
copy .env.example .env

# En Mac/Linux:
cp .env.example .env
```

Abre `.env` y pega los valores de tu `firebaseConfig`:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=worldsticker-2026.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=worldsticker-2026
VITE_FIREBASE_STORAGE_BUCKET=worldsticker-2026.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123

# Nombre de tu repositorio en GitHub Pages:
VITE_BASE_URL=/worldsticker-2026/
```

### 2.4 Instalar dependencias y arrancar

```bash
npm install
npm run dev
```

Abre **http://localhost:5173** en tu navegador. ¡Ya deberías ver la app!

---

## 📋 PASO 3 — Agregar tus avatares (opcional)

Pon tus imágenes en `public/avatars/`:
- `avatar0.png` → ⚽
- `avatar1.png` → 🏆
- `avatar2.png` → 🥇
- ... hasta `avatar7.png`

Las imágenes deben ser cuadradas (ej: 200×200px). Si no las agregas, se usan emojis de forma automática.

Para usar imágenes, edita `src/components/Navbar.jsx` y `src/pages/RegisterPage.jsx` y cambia el array `AVATARS` para referenciar las rutas de imagen en lugar de emojis.

---

## 📋 PASO 4 — Agregar tu logo (opcional)

Pon tu logo en `public/favicon.svg` para el ícono del navegador.

---

## 📋 PASO 5 — Publicar en GitHub Pages

### 5.1 Crear repositorio en GitHub

1. Ve a **[github.com](https://github.com)** → New repository
2. Nombre: `worldsticker-2026`
3. Visibility: Public (necesario para GitHub Pages gratis)
4. Click **"Create repository"**

### 5.2 Subir el código

```bash
git init
git add .
git commit -m "🌍 WorldSticker 2026 inicial"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/worldsticker-2026.git
git push -u origin main
```

### 5.3 Deploy

```bash
npm run deploy
```

Esto construye la app y la publica en la rama `gh-pages`.

### 5.4 Activar GitHub Pages

1. En tu repo de GitHub → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **gh-pages** / root → **Save**

En ~2 minutos tu app estará en:
**`https://TU_USUARIO.github.io/worldsticker-2026/`**

---

## 🔒 PASO 6 — Asegurar Firestore (cuando tengas usuarios reales)

Después del período de prueba, actualiza las reglas en Firebase Console → Firestore → Rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Perfil de usuario: solo el propio usuario puede leer/escribir
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    // Álbum: solo el propio usuario puede leer/escribir
    match /albums/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## 📁 Estructura del proyecto

```
worldsticker-2026/
├── public/
│   └── avatars/           ← Pon aquí tus fotos de avatar
├── src/
│   ├── firebase/config.js ← Configuración Firebase
│   ├── context/AuthContext.jsx
│   ├── data/stickers.js   ← Las 633 figuritas
│   ├── hooks/useAlbum.js  ← Lógica del álbum
│   ├── pages/             ← Login, Register, Album, Stats
│   └── components/        ← Navbar, StickerCard, TeamSection...
├── .env                   ← TUS credenciales (no subir a GitHub)
├── .env.example           ← Plantilla
└── README.md
```

---

## 🎨 Figuritas: 4 estados

| Ícono | Estado | Descripción |
|-------|--------|-------------|
| ✅ | La tengo | Pegada o coleccionada |
| 📦 | Me sobra | Duplicado (con contador de cantidad) |
| 🔄 | Intercambio | La ofrezco para cambiar |
| ❓ | La busco | Me falta y la quiero |

Click en cualquier figurita para abrir el selector de estado.

---

## 📊 Estadísticas incluidas

- % de álbum completado
- Progreso por grupo (A–L)
- Progreso por equipo (top 12 más completos)
- Progreso por sección especial (Intro, Extras, Coca-Cola, HCP)
- Distribución visual de estados

---

## 🆘 Problemas comunes

**"Firebase: Error (auth/configuration-not-found)"**
→ Verifica que tu `.env` existe y tiene los valores correctos.

**La app carga pero no guarda datos**
→ Verifica que Firestore esté habilitado en la consola de Firebase.

**GitHub Pages muestra 404**
→ Asegúrate de que el nombre del repo en `VITE_BASE_URL` es correcto (con `/` al inicio y al final).
