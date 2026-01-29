![CI](https://github.com/Ricardo0919/studyconnect-software-testing/actions/workflows/ci.yml/badge.svg)

# Finnova — Landing Page

Landing page de **Finnova**.  
---

## Tech Stack

- Vue 3
- Vite
- CSS moderno / Tailwind CSS

---

## Getting Started

### Instalar dependencias
```bash
npm install
```

### Correr en desarrollo
```bash
npm run dev
```

Abrir en el navegador:  
http://localhost:5173

---

### Build para producción
```bash
npm run build
```

### Preview del build
```bash
npm run preview
```

---

## Estructura del proyecto

```bash
frontend/
├── src/
├── public/
├── index.html
├── package.json
└── vite.config.js
```

---

## Variables de entorno (opcional)

Si la landing consume una API externa, crea un archivo `.env`:

```env
VITE_API_BASE_URL=http://localhost:8000
```

> El archivo `.env` no se versiona en el repositorio.

---

## Deploy

Compatible con:
- Vercel
- Netlify
- Cloudflare Pages

---

## License

© Finnova.  
All rights reserved.
