<template>
  <section
    ref="featuresSection"
    id="features"
    class="relative overflow-hidden bg-black text-white pt-20 pb-16 md:pt-24 md:pb-24"
  >
    <!-- Contenedor principal:
         - sm: >= 640px
         - md (tablet/iPad y arriba): >= 768px
         - lg (desktop): >= 1024px
         - xl: >= 1280px
         Ajusta aquí el padding lateral y el ancho máximo. -->
    <div
      class="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-10 lg:px-8
             lg:max-w-7xl
             lg:px-10 xl:px-8"
    >
      <!-- Título: cambia tamaños con sm/md. Si hay que ajustar separación con el contenido,
           modifica mt-10 / mt-14 / md:mt-16 / lg:mt-14 más abajo. -->
      <div class="text-center">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#0FD985]">
          Tu dinero, claro y <br />
          bajo control
        </h2>
      </div>

      <!-- Vista teléfono:
           Activa cuando el ancho es menor a 768px (md:hidden). -->
      <div class="md:hidden mt-10">
        <!-- Feature activo en teléfono:
             - Centrado (items-center + text-center).
             - Espaciado interno: gap-3.
             - Limita ancho del texto con max-w-xs. -->
        <Transition name="m-feature" mode="out-in">
          <div class="flex flex-col items-center text-center gap-3" :key="activeMobileFeature.id">
            <!-- Iconos (teléfono):
                 Se usan PNG desde "activeMobileFeature.icon".
                 El tamaño real del icono lo controlas en CSS (.icon-plain, .icon, .icon-lg). -->
            <span class="icon-plain" aria-hidden="true">
              <img :src="activeMobileFeature.icon" class="icon icon-lg" alt="" />
            </span>

            <div class="max-w-xs">
              <h3 class="feature-text text-lg sm:text-xl font-semibold leading-snug">
                {{ activeMobileFeature.title }}
              </h3>
              <p class="feature-text mt-2 text-sm sm:text-base text-white/80 leading-relaxed">
                {{ activeMobileFeature.desc }}
              </p>
            </div>
          </div>
        </Transition>

        <!-- Teléfono (imagen + glow):
             - Separación respecto al texto: mt-8.
             - El tamaño y posición de la imagen del teléfono se ajusta en las clases del <img>. -->
        <div class="relative flex justify-center mt-8 phone-shell">
          <!-- Indicadores (dots) solo en teléfono:
               - Posición absoluta arriba del teléfono.
               - Si quieres subir/bajar: cambia translate(-50%, 20px) en .mobile-dots. -->
          <Transition name="m-dots" mode="out-in">
            <div class="mobile-dots" :key="mobileIndex">
              <button
                v-for="(f, i) in mobileFeatures"
                :key="f.id"
                type="button"
                class="dot h-2.5 w-2.5 rounded-full"
                :class="i === mobileIndex ? 'is-active' : 'is-idle'"
                @click="goTo(i)"
                aria-label="Cambiar feature"
              />
            </div>
          </Transition>

          <!-- Glow (halo) detrás del teléfono:
               - Tamaño controlado por --glowSize dentro de .phone-shell.
               - Animación/estado controlado por isScrolled, glowPhase y glowStyle. -->
          <div
            aria-hidden="true"
            class="phone-glow pointer-events-none absolute z-0 will-change-transform transform-gpu"
            :class="glowClass"
            :style="glowStyle"
          ></div>

          <!-- Imagen del teléfono:
               Cambia automáticamente según el feature activo (mobile) o según hover/click (desktop/tablet). -->
          <Transition name="m-phone" mode="out-in">
            <img
              :key="currentPhonePng"
              :src="currentPhonePng"
              alt="App preview"
              class="relative z-10 max-w-none will-change-transform transform-gpu drop-shadow-[0_50px_120px_rgba(0,0,0,0.9)] select-none pointer-events-none w-[120%] sm:w-[105%] translate-y-6"
              draggable="false"
            />
          </Transition>
        </div>
      </div>

      <!-- Vista tablet/iPad + desktop:
           Activa desde 768px en adelante (hidden md:grid). -->
      <div
        class="features-grid hidden md:grid mt-14 md:mt-16 lg:mt-14 grid-cols-1 md:grid-cols-3 items-center gap-10 md:gap-12 md:-translate-y-6 lg:-translate-y-14"
      >
        <!-- Columna izquierda (features 1 y 2):
             - Separación entre features: space-y-16 (md) y space-y-20 (lg).
             - Separación respecto al teléfono se ajusta con pr-6/lg:pr-10/xl:pr-16. -->
        <div
          class="features-left
            space-y-16 md:space-y-16 lg:space-y-20
            md:-translate-y-8 lg:-translate-y-28
            md:pr-6 lg:pr-10 xl:pr-16
            md:-translate-x-0 lg:translate-x-0 xl:-translate-x-10
          "
        >
          <!-- Item 1 -->
          <div
            class="feature-item flex flex-col items-start gap-3"
            :class="desktopFeature === 'movimientos' ? 'feature-active' : ''"
            role="button"
            tabindex="0"
            @mouseenter="setDesktop('movimientos')"
            @focusin="setDesktop('movimientos')"
            @click="setDesktop('movimientos')"
          >
            <!-- Iconos (tablet/desktop):
                 Se usan PNG desde iconByFeature.* (seleccionados por import.meta.glob).
                 Tamaño del icono: CSS (.icon-lg = 36x36). -->
            <span class="icon-plain" aria-hidden="true">
              <img :src="iconByFeature.movimientos" class="icon icon-lg" alt="" />
            </span>

            <div class="max-w-xs md:max-w-sm">
              <h3 class="feature-text text-lg sm:text-xl lg:text-2xl font-semibold leading-snug">
                Mostramos movimientos
              </h3>
              <p class="feature-text mt-2 text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed">
                Clasificamos gastos e ingresos y mostramos “a dónde se va el dinero”.
              </p>
            </div>
          </div>

          <!-- Item 2 -->
          <div
            class="feature-item flex flex-col items-start gap-3"
            :class="desktopFeature === 'diagnostico' ? 'feature-active' : ''"
            role="button"
            tabindex="0"
            @mouseenter="setDesktop('diagnostico')"
            @focusin="setDesktop('diagnostico')"
            @click="setDesktop('diagnostico')"
          >
            <span class="icon-plain" aria-hidden="true">
              <img :src="iconByFeature.diagnostico" class="icon icon-lg" alt="" />
            </span>

            <div class="max-w-xs md:max-w-sm">
              <h3 class="feature-text text-lg sm:text-xl lg:text-2xl font-semibold leading-snug">
                Diagnóstico financiero
              </h3>
              <p class="feature-text mt-2 text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed">
                Identifica fugas de dinero y prioridades.
              </p>
            </div>
          </div>
        </div>

        <!-- Columna central (teléfono):
             - Ajusta la separación vertical con md:-mb-24 y los translate-y del <img>.
             - Tamaño del glow depende del breakpoint (ver CSS .phone-shell en @media). -->
        <div class="relative flex justify-center md:-mb-24 phone-shell">
          <div
            aria-hidden="true"
            class="phone-glow pointer-events-none absolute z-0 will-change-transform transform-gpu"
            :class="glowClass"
            :style="glowStyle"
          ></div>

          <img
            :src="currentPhonePng"
            alt="App preview"
            :class="[
              'phone-img relative z-10 transition-all duration-700 ease-out max-w-none will-change-transform transform-gpu drop-shadow-[0_50px_120px_rgba(0,0,0,0.9)] select-none pointer-events-none',
              isScrolled ? 'is-scrolled' : 'not-scrolled',
              isScrolled
                ? '-translate-y-20 md:-translate-y-24 lg:-translate-y-28 w-[140%] md:w-[150%] lg:w-[180%]'
                : 'translate-y-20 md:translate-y-24 lg:translate-y-28 w-[140%] md:w-[165%] lg:w-[210%]',
            ]"
            draggable="false"
          />
        </div>

        <!-- Columna derecha (features 3 y 4):
             - Separación entre features: space-y-16 (md) y space-y-20 (lg).
             - Alineación a la derecha en md:text-right. -->
        <div
          class="features-right
            space-y-16 md:space-y-16 lg:space-y-20
            md:text-right
            md:-translate-y-8 lg:-translate-y-28
            md:pl-6 lg:pl-10 xl:pl-16
            md:translate-x-0 lg:translate-x-0 xl:translate-x-10
          "
        >
          <!-- Item 3 -->
          <div
            class="feature-item flex flex-col items-end gap-3"
            :class="desktopFeature === 'reportes' ? 'feature-active' : ''"
            role="button"
            tabindex="0"
            @mouseenter="setDesktop('reportes')"
            @focusin="setDesktop('reportes')"
            @click="setDesktop('reportes')"
          >
            <span class="icon-plain" aria-hidden="true">
              <img :src="iconByFeature.reportes" class="icon icon-lg" alt="" />
            </span>

            <div class="max-w-xs md:max-w-sm md:ml-auto">
              <h3 class="feature-text text-lg sm:text-xl lg:text-2xl font-semibold leading-snug">
                Reportes y tendencias
              </h3>
              <p class="feature-text mt-2 text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed">
                Visualiza tu mes y compara tu progreso.
              </p>
            </div>
          </div>

          <!-- Item 4 -->
          <div
            class="feature-item flex flex-col items-end gap-3"
            :class="desktopFeature === 'historial' ? 'feature-active' : ''"
            role="button"
            tabindex="0"
            @mouseenter="setDesktop('historial')"
            @focusin="setDesktop('historial')"
            @click="setDesktop('historial')"
          >
            <span class="icon-plain" aria-hidden="true">
              <img :src="iconByFeature.historial" class="icon icon-lg" alt="" />
            </span>

            <div class="max-w-xs md:max-w-sm md:ml-auto">
              <h3 class="feature-text text-lg sm:text-xl lg:text-2xl font-semibold leading-snug">
                Historial completo
              </h3>
              <p class="feature-text mt-2 text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed">
                Registros con sello de tiempo para confianza.
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- Fin vista tablet/desktop -->
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, computed } from "vue";

const isScrolled = ref(false);
const featuresSection = ref(null);

/* Breakpoints usados:
   - Teléfono: <= 767px (max-width: 767px)
   - Tablet/iPad y arriba: >= 768px (md)
   Si quieres mover el corte entre teléfono y tablet, cambia el matchMedia aquí y el md:hidden/hidden md:grid del template. */
const isMobileViewport = ref(false);
let mql = null;
let mqlHandler = null;

const updateViewport = () => {
  isMobileViewport.value = window.matchMedia("(max-width: 767px)").matches;
};

/* Estado para tablet/desktop:
   desktopFeature controla qué pantalla del teléfono se muestra cuando haces hover/click en un feature. */
const desktopFeature = ref("movimientos");
const setDesktop = (id) => {
  desktopFeature.value = id;
};

/* Imágenes del teléfono (4 pantallas):
   Ajusta rutas/nombres aquí si cambias los PNG de la app. */
import phoneMovimientos from "../assets/features/mostrarMovimientos.png";
import phoneDiagnostico from "../assets/features/diagnosticoFinanciero.png";
import phoneReportes from "../assets/features/reportesTendecias.png";
import phoneHistorial from "../assets/features/historialCompleto.png";

const phoneByFeature = {
  movimientos: phoneMovimientos,
  diagnostico: phoneDiagnostico,
  reportes: phoneReportes,
  historial: phoneHistorial,
};

const defaultPhone = phoneMovimientos;

/* Iconos PNG:
   Se cargan automáticamente todos los archivos que empiecen con "icon" en /assets/features.
   pickIcon selecciona por texto incluido en el nombre del archivo. Si un icono no aparece,
   revisa que el nombre del PNG contenga alguna de las palabras que se buscan abajo. */
const iconModules = import.meta.glob("../assets/features/icon*.png", {
  eager: true,
  import: "default",
});

const pickIcon = (includes) => {
  const needle = String(includes).toLowerCase();
  for (const [path, url] of Object.entries(iconModules)) {
    if (path.toLowerCase().includes(needle)) return url;
  }
  return null;
};

const iconByFeature = {
  movimientos: pickIcon("mostrarmovimientos") || pickIcon("movimientos"),
  diagnostico: pickIcon("diagnostico") || pickIcon("financiero"),
  reportes: pickIcon("reportes") || pickIcon("tend"),
  historial: pickIcon("historial") || pickIcon("completo"),
};

/* Lista de features para teléfono:
   - Orden = orden de navegación por dots/scroll.
   - Si agregas/quitas features, actualiza también las imágenes en phoneByFeature e iconByFeature. */
const mobileFeatures = [
  {
    id: "movimientos",
    title: "Mostramos movimientos",
    desc: "Clasificamos gastos e ingresos y mostramos “a dónde se va el dinero”.",
    icon: iconByFeature.movimientos,
  },
  {
    id: "diagnostico",
    title: "Diagnóstico financiero",
    desc: "Identifica fugas de dinero y prioridades.",
    icon: iconByFeature.diagnostico,
  },
  {
    id: "reportes",
    title: "Reportes y tendencias",
    desc: "Visualiza tu mes y compara tu progreso.",
    icon: iconByFeature.reportes,
  },
  {
    id: "historial",
    title: "Historial completo",
    desc: "Registros con sello de tiempo para confianza.",
    icon: iconByFeature.historial,
  },
];

const mobileIndex = ref(0);
const mobileDone = ref(false);
const activeMobileFeature = computed(() => mobileFeatures[mobileIndex.value]);

/* Teléfono mostrado:
   - En teléfono: depende del mobileIndex.
   - En tablet/desktop: depende de desktopFeature (hover/click). */
const currentPhonePng = computed(() => {
  if (isMobileViewport.value) {
    const id = mobileFeatures[mobileIndex.value]?.id;
    return phoneByFeature[id] || defaultPhone;
  }
  return phoneByFeature[desktopFeature.value] || defaultPhone;
});

/* Control de velocidad de cambios (scroll/dots):
   Si los cambios se sienten muy rápidos o muy lentos, ajusta STEP_COOLDOWN_MS. */
const STEP_COOLDOWN_MS = 500;
let lastStepAt = 0;

const canStepNow = () => {
  const now = performance.now();
  if (now - lastStepAt < STEP_COOLDOWN_MS) return false;
  lastStepAt = now;
  return true;
};

const goTo = (i) => {
  const clamped = Math.max(0, Math.min(i, mobileFeatures.length - 1));
  if (clamped === mobileIndex.value) return;
  if (!canStepNow()) return;
  mobileIndex.value = clamped;
  mobileDone.value = mobileIndex.value === mobileFeatures.length - 1;
};

/* Scroll lock en teléfono:
   - Solo se activa dentro de la sección en móvil.
   - didLockOnce evita que se vuelva a bloquear más de una vez por carga. */
const isMobile = () => isMobileViewport.value;

let lockActive = false;
let inSection = false;
let lastY = 0;

const didLockOnce = ref(false);

/* Guard al entrar:
   Evita que la inercia del scroll haga saltos al momento de bloquear. */
let wheelBlockUntil = 0;
const ENTER_GUARD_MS = 220;

const blockWheelFor = (ms) => {
  wheelBlockUntil = performance.now() + ms;
};
const wheelIsBlocked = () => performance.now() < wheelBlockUntil;

const lockScroll = () => {
  if (lockActive) return;
  lockActive = true;

  const sbw = window.innerWidth - document.documentElement.clientWidth;
  document.body.dataset._featuresPrevOverflow = document.body.style.overflow || "";
  document.body.dataset._featuresPrevPaddingRight = document.body.style.paddingRight || "";

  document.body.style.overflow = "hidden";
  if (sbw > 0) document.body.style.paddingRight = `${sbw}px`;
};

const unlockScroll = () => {
  if (!lockActive) return;
  lockActive = false;

  document.body.style.overflow = document.body.dataset._featuresPrevOverflow || "";
  document.body.style.paddingRight = document.body.dataset._featuresPrevPaddingRight || "";
};

const nextStep = () => {
  if (!canStepNow()) return;

  if (mobileIndex.value < mobileFeatures.length - 1) {
    mobileIndex.value += 1;
    if (mobileIndex.value === mobileFeatures.length - 1) mobileDone.value = true;
    return;
  }

  unlockScroll();
  inSection = false;
  requestAnimationFrame(() => window.scrollBy(0, 2));
};

const prevStep = () => {
  if (!canStepNow()) return;

  if (mobileIndex.value > 0) {
    mobileIndex.value -= 1;
    mobileDone.value = false;
    return;
  }

  unlockScroll();
  inSection = false;
  requestAnimationFrame(() => window.scrollBy(0, -2));
};

const consumeGesture = (dir) => {
  if (dir > 0) nextStep();
  else prevStep();
};

/* Entrada de scroll (rueda):
   - Solo en móvil y solo cuando la sección está activa y bloqueada. */
const onWheel = (e) => {
  if (!isMobile()) return;
  if (!inSection) return;
  if (!lockActive) return;

  e.preventDefault();

  if (wheelIsBlocked()) return;

  const dy = e.deltaY;
  const MIN_DY = 12;
  if (Math.abs(dy) < MIN_DY) return;

  consumeGesture(dy > 0 ? +1 : -1);
};

/* Touch:
   - Un cambio por swipe vertical (umbral en threshold). */
let touchLatched = false;
let touchStartY = 0;

const onTouchStart = (e) => {
  if (!isMobile()) return;
  if (!inSection) return;
  touchStartY = e.touches?.[0]?.clientY ?? 0;
  touchLatched = false;
};

const onTouchMove = (e) => {
  if (!isMobile()) return;
  if (!inSection) return;
  if (!lockActive) return;

  e.preventDefault();

  if (touchLatched) return;

  const y = e.touches?.[0]?.clientY ?? 0;
  const dy = touchStartY - y;

  const threshold = 48;
  if (dy > threshold) {
    touchLatched = true;
    consumeGesture(+1);
  } else if (dy < -threshold) {
    touchLatched = true;
    consumeGesture(-1);
  }
};

const onTouchEnd = () => {
  touchLatched = false;
};

/* Teclado:
   - Permite avanzar/retroceder en móvil cuando está bloqueado. */
const onKeyDown = (e) => {
  if (!isMobile()) return;
  if (!inSection) return;
  if (!lockActive) return;

  if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
    e.preventDefault();
    consumeGesture(+1);
  }
  if (e.key === "ArrowUp" || e.key === "PageUp") {
    e.preventDefault();
    consumeGesture(-1);
  }
};

let io = null;

/* isScrolled:
   Controla el estado del teléfono/glow en tablet/desktop (cuando ya se scrolleó cierta distancia dentro de la página). */
const handleScroll = () => {
  const top = featuresSection.value?.offsetTop ?? 0;
  const trigger = top + 180;
  isScrolled.value = window.scrollY > trigger;
};

/* Al entrar a la sección en móvil:
   - Hace scrollIntoView para alinear al inicio.
   - Activa lockScroll una sola vez por carga (didLockOnce). */
const enterIfNeeded = () => {
  if (!isMobile()) return;
  if (!featuresSection.value) return;

  if (didLockOnce.value) return;

  didLockOnce.value = true;

  featuresSection.value.scrollIntoView({ block: "start" });
  lockScroll();
  blockWheelFor(ENTER_GUARD_MS);
};

onMounted(async () => {
  await nextTick();

  updateViewport();
  mql = window.matchMedia("(max-width: 767px)");
  mqlHandler = () => updateViewport();

  if (mql.addEventListener) mql.addEventListener("change", mqlHandler);
  else mql.addListener(mqlHandler);

  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });

  lastY = window.scrollY;

  io = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (!entry) return;

      const nowIn = entry.isIntersecting && entry.intersectionRatio >= 0.55;

      if (nowIn && isMobile()) {
        inSection = true;
        lastY = window.scrollY;

        if (!didLockOnce.value) {
          enterIfNeeded();
        } else {
          unlockScroll();
        }
      } else {
        inSection = false;
        unlockScroll();
      }
    },
    { threshold: [0.2, 0.55, 0.8] }
  );

  if (featuresSection.value) io.observe(featuresSection.value);

  document.addEventListener("wheel", onWheel, { passive: false, capture: true });

  window.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("touchmove", onTouchMove, { passive: false });
  window.addEventListener("touchend", onTouchEnd, { passive: true });
  window.addEventListener("keydown", onKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);

  document.removeEventListener("wheel", onWheel, { capture: true });

  window.removeEventListener("touchstart", onTouchStart);
  window.removeEventListener("touchmove", onTouchMove);
  window.removeEventListener("touchend", onTouchEnd);
  window.removeEventListener("keydown", onKeyDown);

  if (io && featuresSection.value) io.unobserve(featuresSection.value);
  if (io) io.disconnect();

  if (mql && mqlHandler) {
    if (mql.removeEventListener) mql.removeEventListener("change", mqlHandler);
    else if (mql.removeListener) mql.removeListener(mqlHandler);
  }

  unlockScroll();
});

/* Intro del glow:
   Se dispara cuando la sección entra en viewport para animación inicial. */
const glowPhase = ref("pre");
const introDone = ref(false);

let observer = null;
let t1 = null;
let t2 = null;

const runIntroOnce = () => {
  if (introDone.value) return;
  introDone.value = true;

  glowPhase.value = "back";

  requestAnimationFrame(() => {
    clearTimeout(t1);
    clearTimeout(t2);

    t1 = setTimeout(() => {
      glowPhase.value = "normal";
    }, 520);

    t2 = setTimeout(() => {
      glowPhase.value = "normal";
    }, 1800);
  });
};

onMounted(() => {
  if (featuresSection.value) {
    observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) runIntroOnce();
      },
      { threshold: 0.2 }
    );
    observer.observe(featuresSection.value);
  }
});

onUnmounted(() => {
  if (observer && featuresSection.value) observer.unobserve(featuresSection.value);
  if (observer) observer.disconnect();
  clearTimeout(t1);
  clearTimeout(t2);
});

/* glowStyle / glowClass:
   Ajustan posición y estado visual del halo. */
const glowStyle = computed(() => ({
  "--glowA": isScrolled.value ? 1 : 0,
  "--ty": isScrolled.value ? "-28px" : "28px",
  left: "50%",
  top: "50%",
}));

const glowClass = computed(() => ({
  "glow-pre": glowPhase.value === "pre",
  "glow-back": glowPhase.value === "back",
}));
</script>

<style scoped>
/* Hover en tablet/desktop:
   Si quieres menos movimiento al hover, baja los valores de translate/scale o reduce la duración. */
.feature-item {
  transition: transform 220ms ease, filter 220ms ease;
  transform-origin: center left;
}
.feature-item:hover {
  transform: translateY(-2px);
}

.feature-active .feature-text {
  transform: scale(1.03);
  opacity: 1;
}
.feature-active p.feature-text {
  opacity: 0.92;
}

.feature-text {
  display: inline-block;
  transition: transform 220ms ease, color 220ms ease, opacity 220ms ease;
  transform-origin: left center;
}
.feature-item:hover .feature-text {
  transform: scale(1.06);
  opacity: 1;
}
.feature-item:hover p.feature-text {
  transform: translateY(-1px) scale(1.04);
  opacity: 0.92;
}

/* Transiciones en móvil:
   Ajusta aquí la suavidad y duración del cambio de feature/teléfono/dots. */
.m-feature-enter-active,
.m-feature-leave-active,
.m-phone-enter-active,
.m-phone-leave-active,
.m-dots-enter-active,
.m-dots-leave-active {
  transition:
    opacity 520ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 520ms cubic-bezier(0.22, 1, 0.36, 1),
    filter 520ms cubic-bezier(0.22, 1, 0.36, 1);
  will-change: opacity, transform, filter;
}

.m-feature-enter-from {
  opacity: 0;
  transform: translateY(10px);
  filter: blur(2px);
}
.m-feature-leave-to {
  opacity: 0;
  transform: translateY(-8px);
  filter: blur(2px);
}

.m-phone-enter-from {
  opacity: 0;
  transform: translateY(18px) scale(0.985);
  filter: blur(2px);
}
.m-phone-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.99);
  filter: blur(2px);
}

.m-dots-enter-from {
  opacity: 0;
  transform: translate(-50%, 30px);
  filter: blur(2px);
}
.m-dots-leave-to {
  opacity: 0;
  transform: translate(-50%, 14px);
  filter: blur(2px);
}

@media (prefers-reduced-motion: reduce) {
  .feature-item,
  .feature-text,
  .m-feature-enter-active,
  .m-feature-leave-active,
  .m-phone-enter-active,
  .m-phone-leave-active,
  .m-dots-enter-active,
  .m-dots-leave-active,
  .phone-glow {
    transition: none !important;
  }
}

/* Iconos:
   - El tamaño del contenedor es 36x36.
   - El icono final se fuerza a 36x36 con .icon-lg. */
.icon-plain {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
}
.icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
  display: block;
}
.icon.icon-lg {
  width: 36px;
  height: 36px;
}

/* Dots (móvil):
   Para moverlos arriba/abajo del teléfono, ajusta translate(-50%, 20px). */
.mobile-dots {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%, 20px);
  z-index: 30;

  display: flex;
  align-items: center;
  gap: 8px;

  padding: 6px 10px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px);
}

.dot {
  transition: transform 220ms ease, opacity 220ms ease, background-color 220ms ease;
}
.dot.is-active {
  background: #0fd985;
  transform: scale(1.15);
  opacity: 1;
}
.dot.is-idle {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1);
  opacity: 0.8;
}
.dot:active {
  transform: scale(0.95);
}

/* Glow:
   El tamaño del halo se ajusta por breakpoint.
   Si el glow se ve muy grande/pequeño, cambia clamp(...) en cada @media. */
.phone-shell {
  --glowSize: clamp(520px, 92vw, 760px);
}
@media (min-width: 768px) {
  .phone-shell {
    --glowSize: clamp(520px, 60vw, 720px);
  }
}
@media (min-width: 1024px) {
  .phone-shell {
    --glowSize: clamp(700px, 58vw, 980px);
  }
}

.phone-glow {
  width: var(--glowSize);
  aspect-ratio: 1 / 1;
  border-radius: 9999px;
  mix-blend-mode: screen;

  --a: var(--glowA, 0);

  opacity: calc(0.95 - (0.45 * var(--a)));
  filter: blur(calc(56px + (34px * var(--a))));

  transform: translate(-50%, -50%) translateY(var(--ty, 0px))
    scale(calc(1.12 - (0.18 * var(--a))));

  background: radial-gradient(
    55% 55% at 50% 45%,
    rgba(15, 217, 133, 1) 0%,
    rgba(15, 217, 133, 0.65) 35%,
    rgba(15, 217, 133, 0.22) 62%,
    rgba(15, 217, 133, 0) 78%
  );

  transition: opacity 700ms ease, filter 700ms ease, transform 700ms ease;
}

.phone-glow.glow-pre {
  opacity: 0 !important;
  filter: blur(110px) !important;
  transform: translate(-50%, -50%) translateY(var(--ty, 0px)) scale(0.86) !important;
  transition: none !important;
}

.phone-glow.glow-back {
  opacity: 0.25;
  filter: blur(110px);
  transform: translate(-50%, -50%) translateY(var(--ty, 0px)) scale(0.86);
  transition: none !important;
}
</style>