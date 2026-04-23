<template>
  <section class="w-full bg-transparent text-white py-16 sm:py-20 md:py-24 lg:py-32">
    <div class="mx-auto w-full max-w-6xl px-6 sm:px-10">
      <!-- Title -->
      <div class="text-center">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#0FD985]">
          {{ t('howItWorks.title') }}
        </h2>
        <p
          class="mt-4 text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed"
        >
          {{ t('howItWorks.subtitle') }}
        </p>
      </div>

      <!-- Steps -->
      <div class="mt-12 sm:mt-14">
        <!-- Desktop -->
        <div class="hidden md:block">
          <!-- Ícono + texto en la misma columna → alineación garantizada.
               Conectores absolutamente posicionados con calc() exacto al borde del círculo:
               - md: icon w-20 (5rem), gap-x-10 (2.5rem)
               - lg: icon w-28 (7rem), gap-x-24 (6rem)
               - xl: icon w-28 (7rem), gap-x-32 (8rem)
               Borde derecho de esfera 1: calc((100% - 2*gap) / 6 + iconW/2 + offset)
               Borde izquierdo de esfera 2 (desde derecha): calc(50% + iconW/2 + offset) -->
          <div class="relative grid grid-cols-3 gap-x-10 lg:gap-x-24 xl:gap-x-60">
            <!-- Conector izquierdo: esfera 1 → esfera 2 -->
            <div
              class="absolute top-20 lg:top-24 pointer-events-none h-[2px] opacity-80
                     left-[calc((100%-5rem)/6+3.5rem)] right-[calc(50%+3.5rem)]
                     lg:left-[calc((100%-12rem)/6+4.5rem)] lg:right-[calc(50%+4.5rem)]
                     xl:left-[calc((100%-30rem)/6+4.5rem)]"
              style="background-image: repeating-linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,1) 3px, transparent 3px, transparent 6px);"
            ></div>
            <!-- Conector derecho: esfera 2 → esfera 3 -->
            <div
              class="absolute top-20 lg:top-24 pointer-events-none h-[2px] opacity-80
                     left-[calc(50%+3.5rem)] right-[calc((100%-5rem)/6+3.5rem)]
                     lg:left-[calc(50%+4.5rem)] lg:right-[calc((100%-12rem)/6+4.5rem)]
                     xl:right-[calc((100%-30rem)/6+4.5rem)]"
              style="background-image: repeating-linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,1) 3px, transparent 3px, transparent 6px);"
            ></div>

            <!-- Paso 1 -->
            <div class="flex flex-col items-center text-center pt-10 pb-16">
              <img
                :src="organize"
                :alt="t('howItWorks.step1.titleMobile')"
                class="h-20 w-20 lg:h-28 lg:w-28 select-none shrink-0"
              />
              <div class="mt-10 w-full max-w-xs mx-auto">
                <h3 class="text-xl lg:text-2xl font-semibold leading-snug">
                  {{ t('howItWorks.step1.titlePart1') }}<br />{{ t('howItWorks.step1.titlePart2') }}
                </h3>
                <p class="mt-10 text-sm md:text-base lg:text-lg text-white leading-relaxed">
                  {{ t('howItWorks.step1.desc') }}
                </p>
              </div>
            </div>

            <!-- Paso 2 -->
            <div class="flex flex-col items-center text-center pt-10 pb-16">
              <img
                :src="progress"
                :alt="t('howItWorks.step2.titleMobile')"
                class="h-20 w-20 lg:h-28 lg:w-28 select-none shrink-0"
              />
              <div class="mt-10 w-full max-w-xs mx-auto">
                <h3 class="text-xl lg:text-2xl font-semibold leading-snug">
                  {{ t('howItWorks.step2.titlePart1') }}<br />{{ t('howItWorks.step2.titlePart2') }}
                </h3>
                <p class="mt-10 text-sm md:text-base lg:text-lg text-white leading-relaxed">
                  {{ t('howItWorks.step2.desc') }}
                </p>
              </div>
            </div>

            <!-- Paso 3 -->
            <div class="flex flex-col items-center text-center pt-10 pb-16">
              <img
                :src="path"
                :alt="t('howItWorks.step3.titleMobile')"
                class="h-20 w-20 lg:h-28 lg:w-28 select-none shrink-0"
              />
              <div class="mt-10 w-full max-w-xs mx-auto">
                <h3 class="text-xl lg:text-2xl font-semibold leading-snug">
                  {{ t('howItWorks.step3.titlePart1') }}<br />{{ t('howItWorks.step3.titlePart2') }}
                </h3>
                <p class="mt-10 text-sm md:text-base lg:text-lg text-white leading-relaxed">
                  {{ t('howItWorks.step3.desc') }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile / Tablet (stack) -->
        <div class="md:hidden space-y-10">
          <div class="flex items-start gap-5">
            <img
              :src="organize"
              :alt="t('howItWorks.step1.titleMobile')"
              class="h-16 w-16 shrink-0 select-none"
            />
            <div>
              <h3 class="text-lg sm:text-xl font-semibold leading-snug">{{ t('howItWorks.step1.titleMobile') }}</h3>
              <p class="mt-2 text-sm sm:text-base text-white/75 leading-relaxed">
                {{ t('howItWorks.step1.desc') }}
              </p>
            </div>
          </div>

          <div class="flex items-start gap-5">
            <img
              :src="progress"
              :alt="t('howItWorks.step2.titleMobile')"
              class="h-16 w-16 shrink-0 select-none"
            />
            <div>
              <h3 class="text-lg sm:text-xl font-semibold leading-snug">{{ t('howItWorks.step2.titleMobile') }}</h3>
              <p class="mt-2 text-sm sm:text-base text-white/75 leading-relaxed">
                {{ t('howItWorks.step2.desc') }}
              </p>
            </div>
          </div>

          <div class="flex items-start gap-5">
            <img :src="path" :alt="t('howItWorks.step3.titleMobile')" class="h-16 w-16 shrink-0 select-none" />
            <div>
              <h3 class="text-lg sm:text-xl font-semibold leading-snug">{{ t('howItWorks.step3.titleMobile') }}</h3>
              <p class="mt-2 text-sm sm:text-base text-white/75 leading-relaxed">
                {{ t('howItWorks.step3.desc') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import organize from '../assets/howItWorks/organize.png';
import progress from '../assets/howItWorks/progress.png';
import path from '../assets/howItWorks/path.png';
const { t } = useI18n();
</script>

<style scoped>
/* Nada necesario. Todo va con Tailwind. */
</style>
