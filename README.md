# Soluciones Tech OK - Landing Page 3D

Landing page profesional con efectos 3D avanzados para Soluciones Tech OK, construida con **Next.js 16**, **JavaScript puro** (sin TypeScript) y **Tailwind CSS 4**.

## 🚀 Stack Tecnológico

- **Next.js 16** - Framework React con App Router
- **JavaScript** - Sin TypeScript
- **Tailwind CSS 4** - Styling utility-first
- **GSAP 3** - Animaciones 3D y scroll triggers
- **Lucide React** - Iconos modernos

## ✨ Características

### Efectos 3D Avanzados
- ✅ Partículas animadas (sin movimiento de mouse)
- ✅ Cards con rotación 3D en hover
- ✅ Parallax profundo en scroll
- ✅ Rotaciones y transformaciones suaves
- ✅ Scroll triggers con GSAP ScrollTrigger

### Secciones
1. **Hero** - Portada con partículas y CTA
2. **Servicios** - 6 servicios con cards 3D
3. **Nosotros** - Información de la empresa con stats
4. **CTA Banner** - Sección de conversión
5. **Contacto** - Formulario y datos de contacto
6. **Footer** - Links y redes sociales

## 📦 Instalación Local

```bash
# Clonar el repositorio
git clone https://github.com/TU_USUARIO/soluciones-tech-ok.git
cd soluciones-tech-ok

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Abrir en http://localhost:3000
```

## 🏗️ Build para Producción

```bash
npm run build
npm start
```

## 📂 Estructura del Proyecto

```
app/
├── components/           # Componentes React (JavaScript)
│   ├── Hero3D.js
│   ├── Services3D.js
│   ├── About3D.js
│   ├── Contact.js
│   ├── Footer.js
│   ├── Navbar.js
│   └── CtaBanner.js
├── hooks/               # Hooks personalizados
│   └── useScrollAnimation.js
├── globals.css          # Estilos globales
├── layout.js            # Layout principal
└── page.js              # Página de inicio
```

## 🚀 Deploy a Vercel

### GitHub Integration (Recomendado)

```bash
git init
git add .
git commit -m "Initial commit: Next.js 3D landing page"
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

Luego en [vercel.com](https://vercel.com):
1. "New Project"
2. Selecciona tu repo de GitHub
3. Vercel detecta automáticamente Next.js
4. "Deploy" ✨

### CLI de Vercel

```bash
npm i -g vercel
vercel
```

## 📋 Configuración

### Número de WhatsApp
El número de teléfono está configurado en:
- `app/components/Contact.js` - Línea 3
- `app/components/CtaBanner.js` - Línea 3
- `app/components/Footer.js` - Línea 4

Valor actual: `5491168450118` (11-6845-0118)

### Email de Contacto
Configurado en `app/components/Contact.js` y `app/components/Footer.js`

Valor actual: `contacto@solucionestech.ok`

### Instagram
Configurado en `app/components/Contact.js` y `app/components/Footer.js`

Valor actual: `soluciones_tech.ok`

## 🎨 Personalización

### Cambiar colores
Edita `app/globals.css` y busca las variables CSS:
```css
:root {
  --primary: oklch(0.623 0.214 259.815);
  --secondary: oklch(0.967 0.001 286.375);
  --accent: oklch(0.577 0.245 27.325);
}
```

### Cambiar contenido
- **Hero**: `app/components/Hero3D.js`
- **Servicios**: `app/components/Services3D.js`
- **Contacto**: `app/components/Contact.js`

### Cambiar imágenes
Reemplaza las URLs en los componentes:
```js
const HERO_BG = "https://tu-url-de-imagen.com/hero.webp";
```

## 🔗 Links Útiles

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [GSAP Docs](https://gsap.com/docs/)
- [Vercel Docs](https://vercel.com/docs)

## 📝 Notas

- ✅ JavaScript puro (sin TypeScript)
- ✅ App Router de Next.js
- ✅ GSAP ScrollTrigger para animaciones
- ✅ Tailwind CSS 4 con OKLCH colors
- ✅ Responsive y accesible
- ✅ Optimizado para Vercel

---

**Hecho con ❤️ por Soluciones Tech OK**
