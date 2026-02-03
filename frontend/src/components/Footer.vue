<template>
  <footer id="contact" class="w-full bg-transparent text-white text-center">
    <!-- Top divider (full width visual) -->
    <div class="w-full px-6 sm:px-10 lg:px-16 pt-10">
      <div class="mx-auto w-full max-w-screen-2xl">
        <div class="h-[3px] w-full bg-white"></div>
      </div>
    </div>

    <!-- Main content -->
    <div class="w-full px-6 sm:px-10 lg:px-16 py-10 md:py-12">
      <div class="mx-auto w-full max-w-screen-2xl">
        <div
          class="grid w-full grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 place-items-center"
        >
          <!-- Col 1 -->
          <div class="w-full flex flex-col items-center justify-center space-y-4 lg:items-start">
            <h3 class="text-lg font-semibold leading-snug lg:text-left">
              ¿Estás listo para<br />
              cambiar tu futuro<br />
              financiero?
            </h3>
            <div class="h-1 w-10 rounded-full bg-[#0FD985]"></div>
          </div>

          <!-- Col 2 -->
          <nav
            class="w-full flex flex-col items-center justify-center space-y-3 text-sm lg:items-start"
          >
            <a
              href="#home"
              class="link-underline text-white/80 hover:text-white/80"
              @click="(e) => goToHashWithAnim(e, '#home')"
            >
              INICIO
            </a>
            <a
              href="#nosotros"
              class="link-underline text-white/80 hover:text-white/80"
              @click="(e) => goToHashWithAnim(e, '#nosotros')"
            >
              NOSOTROS
            </a>
            <a
              href="#funcionamiento"
              class="link-underline text-white/80 hover:text-white/80"
              @click="(e) => goToHashWithAnim(e, '#funcionamiento')"
            >
              FUNCIONAMIENTO
            </a>
            <a
              href="#waitlist"
              class="link-underline text-white/80 hover:text-white/80"
              @click="openWaitlistWithAnim"
            >
              EARLY ACCESS
            </a>
            <Forms :open="isFormsOpen" @close="isFormsOpen = false" />
          </nav>

          <!-- Col 3 -->
          <div class="w-full flex flex-col items-center justify-center space-y-4">
            <div class="space-y-2">
              <p class="text-sm font-semibold tracking-wide">Contáctanos</p>
              <a
                href="tel:+525564075229"
                class="inline-flex items-center justify-center gap-2 text-sm text-white/80 hover:text-white transition"
              >
                +52 55 6407 5229
              </a>
            </div>

            <div class="flex items-center justify-center gap-4">
              <a
                class="group grid h-10 w-10 place-items-center rounded-full border border-white/30 text-white/80 transition-all duration-300 hover:border-[#0FD985] hover:text-[#0FD985]"
              >
                <Icon icon="fa6-brands:facebook-f" class="h-4 w-4 translate-y-[0.5px]" />
              </a>

              <a
                href="https://www.instagram.com/lyratech/"
                target="_blank"
                class="group grid h-10 w-10 place-items-center rounded-full border border-white/30 text-white/80 transition-all duration-300 hover:border-[#0FD985] hover:text-[#0FD985]"
              >
                <Icon icon="fa6-brands:instagram" class="h-4 w-4" />
              </a>

              <a
                href="https://wa.me/525564075229"
                target="_blank"
                class="group grid h-10 w-10 place-items-center rounded-full border border-white/30 text-white/80 transition-all duration-300 hover:border-[#0FD985] hover:text-[#0FD985]"
              >
                <Icon icon="fa6-brands:whatsapp" class="h-4 w-4 translate-x-[0.5px]" />
              </a>
            </div>
          </div>

          <!-- Col 4 -->
          <div class="w-full flex items-center justify-center">
            <img src="../assets/footer/Logo.png" alt="FinNova" class="h-10 w-auto opacity-95" />
          </div>
        </div>

        <!-- Bottom divider -->
        <div class="mt-10 h-px w-full bg-white/75"></div>

        <!-- Bottom copy (centrado blindado) -->
        <div class="py-6 w-full flex justify-center">
          <p class="w-full text-left text-xs text-white/60">
            © {{ year }} Finnova. Todos los derechos reservados.
            <a
              href="https://lyratech.com.mx/"
              class="link-underline text-white"
              @click="(e) => openExternalWithAnim(e, 'https://lyratech.com.mx/')"
            >
              Desarrollado por LyraTech
            </a>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { ref } from 'vue';
import Forms from './Forms.vue'; // ajusta ruta
const isFormsOpen = ref(false);

function openWaitlistWithAnim(e: Event) {
  e.preventDefault();

  const target = e.currentTarget as HTMLElement | null;
  target?.classList.add('is-tapped');

  window.setTimeout(() => {
    target?.classList.remove('is-tapped');
    isFormsOpen.value = true;
  }, 220);
}

function openExternalWithAnim(e: Event, url: string) {
  e.preventDefault();

  const target = e.currentTarget as HTMLElement | null;
  target?.classList.add('is-tapped');

  window.setTimeout(() => {
    target?.classList.remove('is-tapped');
    window.open(url, '_blank', 'noopener,noreferrer');
  }, 220);
}

import { Icon } from '@iconify/vue';

const year = computed(() => new Date().getFullYear());

function goToHashWithAnim(e: Event, hash: string) {
  e.preventDefault();

  // opcional: forzar "active" visual un momento
  const target = e.currentTarget as HTMLElement | null;
  target?.classList.add('is-tapped');

  // delay corto para que se note la barra
  window.setTimeout(() => {
    target?.classList.remove('is-tapped');

    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // actualiza URL sin brincar feo
    history.replaceState(null, '', hash);
  }, 220);
}
</script>

<style scoped>
/* Link con barra animada abajo */
.link-underline {
  position: relative;
  display: inline-block;
  padding-bottom: 6px; /* espacio para la barrita */
}

/* La barra */
.link-underline::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;

  height: 2px;
  border-radius: 999px;

  background: #0fd985; /* emerald-500 */
  transform: scaleX(0);
  transform-origin: right; /* arranca desde la derecha */
  transition: transform 240ms ease;
}

/* Hover: carga de derecha a izquierda */
.link-underline:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

/* Touch: cuando “tap” primero se ve */
.link-underline:active::after {
  transform: scaleX(1);
  transform-origin: left;
}

/* Accesibilidad: focus */
.link-underline:focus-visible::after {
  transform: scaleX(1);
  transform-origin: left;
}

.link-underline.is-tapped::after {
  transform: scaleX(1);
  transform-origin: left;
}
</style>
