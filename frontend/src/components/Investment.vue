<template>
  <section class="relative w-full bg-black py-16 sm:py-20 overflow-hidden">
    <!-- Bottom corner glows -->
    <div class="pointer-events-none absolute inset-0">
      <!-- bottom-left glow -->
      <div
          class="pointer-events-none absolute
         -left-32 -bottom-32
         h-[360px] w-[360px]
         blur-[120px]

         md:-left-48 md:-bottom-48
         md:h-[520px] md:w-[520px]
         md:blur-[150px]

         lg:-left-64 lg:-bottom-64
         lg:h-[720px] lg:w-[720px]
         lg:blur-[180px]"
          :style="{background:'radial-gradient(circle, rgba(15,217,133,0.65) 0%, rgba(15,217,133,0.25) 35%, rgba(15,217,133,0.0) 70%)'}"
      />

      <!-- bottom-right glow -->
      <div
          class="pointer-events-none absolute
         -right-32 -bottom-32
         h-[360px] w-[360px]
         blur-[120px]

         md:-right-48 md:-bottom-48
         md:h-[520px] md:w-[520px]
         md:blur-[150px]

         lg:-right-64 lg:-bottom-64
         lg:h-[720px] lg:w-[720px]
         lg:blur-[180px]"
          :style="{background:'radial-gradient(circle, rgba(15,217,133,0.65) 0%, rgba(15,217,133,0.25) 35%, rgba(15,217,133,0.0) 70%)'}"
      />
    </div>

    <div class="relative mx-auto w-full max-w-5xl px-6 sm:px-10 lg:px-16">
      <!-- Title -->
      <h2
          class="text-center font-semibold tracking-tight text-[#0FD985]
               text-2xl sm:text-3xl md:text-4xl"
      >
        Que buscamos ...
      </h2>

      <!-- Card -->
      <div class="mt-10 flex justify-center">
        <div
            class="w-full max-w-md sm:max-w-lg rounded-2xl
                 bg-white/10 border border-white/10
                 shadow-[0_25px_80px_rgba(0,0,0,0.65)]
                 backdrop-blur-md
                 px-6 sm:px-10 py-8 sm:py-10"
        >
          <p class="text-center text-sm sm:text-base leading-relaxed text-white/75">
            Finnova está construyéndose con una meta clara: hacer que mejorar tu salud financiera sea
            simple, práctico y accesible. Estamos creando una plataforma que transforma tus datos en
            claridad y tus decisiones en progreso, con recomendaciones personalizadas y un plan de
            acción que sí puedes seguir.
            <br /><br />
            Esto apenas comienza, y queremos que tú seas parte. Si crees que manejar tu dinero no debería
            ser complicado ni estresante, únete a Finnova: pruébala, comparte tu feedback y ayúdanos a
            diseñar la herramienta que hará la diferencia para miles de personas.
          </p>

          <!-- Buttons -->
          <div
              class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <button
                type="button"
                @click="isFormsOpen = true"
                class="group inline-flex w-full sm:w-auto items-center justify-center gap-3
                     rounded-full bg-[#0FD985] px-6 py-3
                     text-sm font-black text-black
                     transition-all duration-300
                     hover:brightness-110 active:scale-[0.98]"
            >
              Quiero unirme
              <span
                  class="grid h-8 w-8 place-items-center rounded-full
                       transition-transform duration-300 group-hover:translate-x-0.5"
              >
                <Icon icon="lucide:arrow-right" class="h-4 w-4" />
              </span>
            </button>
            <Forms :open="isFormsOpen" @close="isFormsOpen = false" />

            <a href="https://wa.me/525564075229" target="_blank">
              <button
                  type="button"
                  class="group relative w-full sm:w-auto
                   overflow-hidden
                   rounded-full
                   px-6 py-3
                   text-sm font-black text-white/90

                   bg-white/10
                   backdrop-blur-md
                   border border-white/25

                   transition-all duration-300
                   hover:bg-white/15
                   hover:border-white/40
                   active:scale-[0.98]"
              >
                <!-- Highlight glass reflection -->
                <span class="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/20 via-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>

                <span class="relative z-10">
                  Hablar con el equipo
                </span>
              </button>
            </a>

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Forms from "./Forms.vue"; // ajusta ruta
import { Icon } from "@iconify/vue";

const isFormsOpen = ref(false);
</script>


