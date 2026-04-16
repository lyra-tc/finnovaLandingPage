<template>
  <section class="w-full bg-transparent text-white py-16 sm:py-20 md:py-32 lg:py-48">
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
          <!-- Icons + dotted connectors (ONLY between icons) -->
          <div class="flex items-center justify-between px-2 lg:px-6 pt-10 pb-16">
            <img
              :src="organize"
              :alt="t('howItWorks.step1.titleMobile')"
              class="h-20 w-20 lg:h-28 lg:w-28 select-none shrink-0"
            />

            <div
              class="mx-8 lg:mx-10 flex-1 h-[2px] opacity-80"
              style="
                background-image: repeating-linear-gradient(
                  to right,
                  rgba(255, 255, 255, 1),
                  rgba(255, 255, 255, 1) 3px,
                  transparent 3px,
                  transparent 10px
                );
              "
            ></div>

            <img
              :src="progress"
              :alt="t('howItWorks.step2.titleMobile')"
              class="h-20 w-20 lg:h-28 lg:w-28 select-none shrink-0"
            />

            <div
              class="mx-8 lg:mx-10 flex-1 h-[2px] opacity-80"
              style="
                background-image: repeating-linear-gradient(
                  to right,
                  rgba(255, 255, 255, 1),
                  rgba(255, 255, 255, 1) 3px,
                  transparent 3px,
                  transparent 10px
                );
              "
            ></div>

            <img
              :src="path"
              :alt="t('howItWorks.step3.titleMobile')"
              class="h-20 w-20 lg:h-28 lg:w-28 select-none shrink-0"
            />
          </div>

          <!-- Text columns -->
          <div class="mt-10 grid grid-cols-3 gap-10 lg:gap-24 place-items-start text-center">
            <div class="w-full max-w-xs mx-auto">
              <h3 class="text-xl lg:text-2xl font-semibold leading-snug">
                {{ t('howItWorks.step1.titlePart1') }}<br />{{ t('howItWorks.step1.titlePart2') }}
              </h3>
              <p class="mt-10 text-sm lg:text-lg text-white leading-relaxed">
                {{ t('howItWorks.step1.desc') }}
              </p>
            </div>

            <div class="w-full max-w-xs mx-auto">
              <h3 class="text-xl lg:text-2xl font-semibold leading-snug">
                {{ t('howItWorks.step2.titlePart1') }}<br />{{ t('howItWorks.step2.titlePart2') }}
              </h3>
              <p class="mt-10 text-sm lg:text-lg text-white leading-relaxed">
                {{ t('howItWorks.step2.desc') }}
              </p>
            </div>

            <div class="w-full max-w-xs mx-auto">
              <h3 class="text-xl lg:text-2xl font-semibold leading-snug">
                {{ t('howItWorks.step3.titlePart1') }}<br />{{ t('howItWorks.step3.titlePart2') }}
              </h3>
              <p class="mt-10 text-sm lg:text-lg text-white leading-relaxed">
                {{ t('howItWorks.step3.desc') }}
              </p>
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
