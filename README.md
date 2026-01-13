# LandingPageBase

A simple, universal base template for landing pages built with Vue 3 and Tailwind CSS. Designed for software service companies to quickly create professional landing pages.

## Features

- **Simple Structure**: Few components (Header, Hero, Features, Footer) for easy customization.
- **Single CSS File**: All styles in `src/styles.css` with Tailwind imports.
- **Modular Components**: Each section is a separate Vue component for flexibility.
- **Tailwind CSS**: Ready for styling with Tailwind classes.
- **Responsive Design**: Mobile-friendly with breakpoints for tablets and desktops.
- **Modern UI**: Clean gradients, shadows, hover effects, and smooth transitions.
- **Easy Customization**: Colors, text, and layout can be changed by editing Tailwind classes.

## Project Structure

```
src/
├── components/
│   ├── Header.vue      # Navigation bar
│   ├── Hero.vue        # Main hero section
│   ├── Features.vue    # Features showcase
│   └── Footer.vue      # Contact and links
├── App.vue             # Main app component
├── main.js             # Entry point
└── styles.css          # Global styles with Tailwind
```

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Project Setup

```sh
npm install
```

### Install Tailwind CSS (if not already installed)

```sh
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## Customization

- **Company Info**: Update text in components (e.g., company name, contact details).
- **Logo**: Replace `public/logo.svg` with your SVG logo. Keep it simple and under 40x40px for best results.
- **Colors**: Modify Tailwind classes for branding (e.g., change `from-blue-600` to `from-red-600` in Hero.vue).
- **Content**: Change headings, descriptions, and links.
- **Sections**: Add or remove components as needed.
- **Styling**: Adjust Tailwind classes for spacing, fonts, and effects.

## Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)
