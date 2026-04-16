<template>
  <section class="relative w-full bg-transparent py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
    <div class="relative mx-auto w-full max-w-5xl px-6 sm:px-10 lg:px-16">
      <!-- Title -->
      <h2
        class="text-center font-semibold tracking-tight text-[#0FD985] text-3xl sm:text-4xl md:text-5xl"
      >
        {{ t('investment.title') }}
      </h2>

      <!-- Card -->
      <div class="mt-10 flex justify-center">
        <div
          class="w-full max-w-md sm:max-w-lg rounded-2xl bg-white/10 border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.65)] backdrop-blur-md px-6 sm:px-10 py-8 sm:py-10"
        >
          <p class="text-center text-sm sm:text-base leading-relaxed text-white/75">
            {{ t('investment.p1') }}
            <br /><br />
            {{ t('investment.p2') }}
          </p>

          <!-- Buttons -->
          <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <!-- Quiero unirme -->
            <button
              type="button"
              @click="isFormsOpen = true"
              class="group inline-flex w-full sm:w-auto h-12 items-center justify-center gap-3 rounded-full bg-[#0FD985] px-6 text-sm font-black text-black transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
            >
              {{ t('investment.btnJoin') }}
              <span
                class="grid h-7 w-7 place-items-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5"
              >
                <Icon icon="lucide:arrow-right" class="h-4 w-4" />
              </span>
            </button>

            <Forms :open="isFormsOpen" @close="isFormsOpen = false" />

            <!-- Hablar con el equipo -->
            <a href="https://wa.me/525564075229" target="_blank" class="w-full sm:w-auto">
              <button
                type="button"
                class="group relative inline-flex w-full sm:w-auto h-12 items-center justify-center overflow-hidden rounded-full px-6 text-sm font-black text-white/90 bg-white/10 backdrop-blur-md border border-white/25 transition-all duration-300 hover:bg-white/15 hover:border-white/40 active:scale-[0.98]"
              >
                <span
                  class="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/20 via-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                ></span>

                <span class="relative z-10">{{ t('investment.btnTeam') }}</span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Forms from './Forms.vue';
import { Icon } from '@iconify/vue';
const { t } = useI18n();

const isFormsOpen = ref(false);
</script>
