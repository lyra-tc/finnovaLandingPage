<script setup>
import Header from './components/Header.vue';
import Hero from './components/Hero.vue';
// import Features from './components/Features.vue'
import Footer from './components/Footer.vue';
import Investment from './components/Investment.vue';

const setFavicon = () => {
  const favicon = document.querySelector('link[rel="icon"]');
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (isDark) {
    favicon.href = '/favicon-dark.ico';
  } else {
    favicon.href = '/favicon-light.ico';
  }
};

// Ejecutar al cargar
setFavicon();

// Escuchar cuando el usuario cambia el modo del sistema sin recargar la página
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setFavicon);
</script>

<template>
  <Header />
  <Hero />
  <!-- <Features /> -->
  <Investment />
  <Footer />
</template>


