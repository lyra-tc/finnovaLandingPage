# SSG + SEO para Finnova — Diseño

**Fecha:** 2026-04-21
**Stack:** Vue 3 + Vite + Tailwind CSS 4 + Vercel

---

## Objetivo

Implementar pre-rendering estático con `vite-ssg` y configuración SEO completa con `@vueuse/head`, para que Google pueda indexar la landing page de Finnova. Actualmente el sitio es una SPA pura que entrega `<div id="app"></div>` a los crawlers.

---

## Arquitectura

### Enfoque seleccionado: `vite-ssg` + `@vueuse/head`

Pre-renderiza el HTML en build time. Vercel sigue recibiendo `npm run build` y sirviendo `dist/` como antes. Las rutas `/api/` (Vercel serverless functions) no se tocan.

---

## Cambios por archivo

### 1. Nuevas dependencias

```bash
npm install vite-ssg @vueuse/head
```

### 2. `frontend/src/main.js`

- Reemplazar `createApp(...).use(...).mount()` por `ViteSSG(App, { routes }, callback)`
- Registrar dentro del callback: `i18n`, `@vueuse/head`, `FontAwesomeIcon`
- **NO importar** `src/i18n/index.ts` (usa `navigator` a nivel de módulo)
- Crear el i18n inline en el callback con detección de idioma segura para SSG:

```js
const locale = typeof navigator !== 'undefined'
  ? (navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en')
  : 'es'
```

### 3. `frontend/vite.config.js`

Preservar todo lo existente (`loadEnv`, `vueDevTools`, `alias`, `proxy`, `define`). Agregar únicamente:

```js
ssgOptions: {
  script: 'async',
  formatting: 'minify',
}
```

### 4. `frontend/package.json`

Cambiar solo el script `"build"`:

```json
"build": "vite-ssg build",
"build:preview": "vite build"
```

El comando `npm run build` sigue siendo el punto de entrada — Vercel no cambia su configuración.

### 5. `frontend/src/composables/useSEO.js` (nuevo)

Composable basado en `useHead` de `@vueuse/head` con:
- `<title>`
- `<meta name="description">`
- `<meta name="robots">`
- Open Graph: `og:title`, `og:description`, `og:url`, `og:image`, `og:locale`, `og:type`, `og:site_name`
- Twitter Card: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- `<link rel="canonical">`

### 6. `frontend/src/App.vue`

Agregar al `<script setup>`:

```js
import { useSEO } from './composables/useSEO.js'

useSEO({
  title: 'Finnova | App de Finanzas Personales en México',
  description: 'Controla tus gastos, ahorra e invierte con Finnova. Diagnósticos financieros, reportes y plan personalizado. Únete al acceso anticipado.',
  url: 'https://www.finnova.com.mx',
})
```

### 7. `frontend/index.html`

- Agregar `lang="es"` al `<html>`
- Mantener los favicons existentes (light/dark)
- Agregar `<meta name="theme-color" content="#0FD985">`
- Agregar 3 `<link rel="alternate" hreflang>`:
  - `hreflang="es"` → `https://www.finnova.com.mx/`
  - `hreflang="en"` → `https://www.finnova.com.mx/`
  - `hreflang="x-default"` → `https://www.finnova.com.mx/`

### 8. `frontend/public/robots.txt` (nuevo)

```
User-agent: *
Allow: /

Sitemap: https://www.finnova.com.mx/sitemap.xml
```

### 9. `frontend/public/sitemap.xml` (nuevo)

Sitemap con la URL canónica, hreflang es/en, `changefreq: monthly`, `priority: 1.0`.

---

## Componentes — uso de `window`/`document`

Revisado con grep. Los usos en `Header.vue`, `Features.vue`, `Forms.vue` y `Footer.vue` están dentro de `onMounted`/`onUnmounted` — **no requieren cambios**.

El único uso problemático era `navigator` en `src/i18n/index.ts` a nivel de módulo, resuelto en el punto 2 (no se importa ese archivo; i18n se crea inline en el callback de ViteSSG).

---

## Verificación post-build

Después de `npm run build`, el archivo `dist/index.html` debe contener HTML real con texto visible, no solo `<div id="app"></div>`.

---

## Lo que NO cambia

- Lógica de negocio de componentes
- Estilos Tailwind
- Configuración Resend/email
- Variables de entorno Vercel
- Rutas `/api/` serverless
