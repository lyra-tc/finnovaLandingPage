<template>
  <header class="fixed inset-x-0 top-0 z-50 bg-transparent px-4 pt-4 md:px-6">
    <nav
      class="mx-auto flex items-center justify-between rounded-full border transition-[max-width,padding,background-color,border-color,box-shadow,backdrop-filter] duration-300 ease-out"
      :class="
        hasScrolled
          ? 'max-w-4xl border-white/15 bg-[#07110d]/34 px-4 py-3 shadow-[0_0_24px_rgba(15,217,133,0.14)] backdrop-blur-xl md:px-6'
          : 'max-w-5xl border-transparent bg-transparent px-0 py-0 shadow-[0_0_0_rgba(15,217,133,0)] backdrop-blur-0 md:px-2 xl:max-w-[1400px]'
      "
    >
      <div class="flex items-center">
        <img
          src="/logo.svg"
          alt="Company Logo"
          class="h-auto transition-all duration-300"
          :class="hasScrolled ? 'w-24 md:w-32 lg:w-36' : 'w-24 md:w-36 lg:w-44'"
        />
      </div>

      <ul class="hidden md:flex items-center gap-5 text-xs font-semibold lg:gap-6 lg:text-sm">
        <li><a href="#home" class="nav-link-hover" @click.prevent="goToHash('#home')">{{ t('header.home') }}</a></li>
        <li><a href="#features" class="nav-link-hover" @click.prevent="goToHash('#features')">{{ t('header.features') }}</a></li>
        <li><a href="#contact" class="nav-link-hover" @click.prevent="goToHash('#contact')">{{ t('header.contact') }}</a></li>
        <li>
          <a href="#waitlist" @click.prevent="isFormsOpen = true" class="btn-waitlist">{{ t('header.earlyAccess') }}</a>
        </li>
      </ul>

      <button @click="isOpen = !isOpen" class="md:hidden z-50 text-white focus:outline-none">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            v-if="!isOpen"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </nav>

    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-full"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-full"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 bg-black/95 z-40 flex flex-col items-center justify-center md:hidden"
      >
        <ul class="text-center space-y-8 text-xl font-bold">
          <li><a @click.prevent="goToHash('#home')" href="#home" class="nav-link-hover">{{ t('header.home') }}</a></li>
          <li><a @click.prevent="goToHash('#features')" href="#features" class="nav-link-hover">{{ t('header.features') }}</a></li>
          <li><a @click.prevent="goToHash('#contact')" href="#contact" class="nav-link-hover">{{ t('header.contact') }}</a></li>
          <li>
            <a
              @click.prevent="((isOpen = false), (isFormsOpen = true))"
              href="#waitlist"
              class="btn-waitlist text-lg"
              >{{ t('header.earlyAccess') }}</a
            >
          </li>
        </ul>
      </div>
    </transition>
    <Forms :open="isFormsOpen" @close="isFormsOpen = false" />
  </header>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Forms from '@/components/Forms.vue';
const { t } = useI18n();
const isOpen = ref(false);
const isFormsOpen = ref(false);
const hasScrolled = ref(false);

function updateHeaderState() {
  hasScrolled.value = window.scrollY > 24;
}

function goToHash(hash) {
  isOpen.value = false;

  const el = document.querySelector(hash);
  if (!el) return;

  const headerHeight = document.querySelector('header')?.offsetHeight ?? 0;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

  let top = hash === '#contact'
    ? maxScroll
    : window.scrollY + el.getBoundingClientRect().top - headerHeight;

  if (hash === '#home') top = 0;

  window.scrollTo({
    top: Math.max(0, Math.min(top, maxScroll)),
    behavior: 'smooth',
  });

  history.replaceState(null, '', hash);
}

onMounted(() => {
  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateHeaderState);
});
</script>
