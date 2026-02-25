<script setup>
import Header from './components/Header.vue';
import Hero from './components/Hero.vue';
import HowItWorks from './components/HowItWorks.vue';
import Investment from './components/Investment.vue';
import Footer from './components/Footer.vue';
import Mail from "@/components/Mail.vue";
</script>

<template>
  <div class="relative min-h-screen bg-black overflow-hidden">
    <Header />
    <Hero />

    <!-- BLOCK 1: HowItWorks + RIGHT glow at its bottom edge -->
    <div class="relative">
      <HowItWorks />

      <!-- RIGHT semicircle overlay (between HowItWorks and Investment) -->
      <div class="pointer-events-none absolute left-0 right-0 -bottom-0 md:-bottom-0 lg:-bottom-0 z-0">
        <div
            class="absolute -right-[260px] top-1/2 -translate-y-1/2
                 h-[520px] w-[520px]
                 md:-right-[360px] md:h-[720px] md:w-[720px]
                 lg:-right-[480px] lg:h-[980px] lg:w-[980px]
                 blur-[90px] md:blur-[120px] lg:blur-[150px]"
            :style="{
            background:
              'radial-gradient(circle, rgba(15,217,133,0.70) 0%, rgba(15,217,133,0.25) 40%, rgba(15,217,133,0.0) 72%)',
          }"
        />
      </div>
    </div>

    <!-- Investment needs to sit ABOVE the glow -->
    <div class="relative z-10">
      <Investment />
    </div>

    <!-- BLOCK 2: Footer with LEFT glow at the top edge -->
    <div class="relative">
      <!-- LEFT semicircle overlay (between Investment and Footer) -->
      <div class="pointer-events-none absolute left-0 right-0 -top-0 md:-top-0 lg:-top-0 z-0">
        <div
            class="absolute -left-[260px] top-1/2 -translate-y-1/2
                 h-[520px] w-[520px]
                 md:-left-[360px] md:h-[720px] md:w-[720px]
                 lg:-left-[480px] lg:h-[980px] lg:w-[980px]
                 blur-[90px] md:blur-[120px] lg:blur-[150px]"
            :style="{
            background:
              'radial-gradient(circle, rgba(15,217,133,0.70) 0%, rgba(15,217,133,0.25) 40%, rgba(15,217,133,0.0) 72%)',
          }"
        />
      </div>

      <!-- Footer above glow -->
      <div class="relative z-10">
        <Footer />
      </div>
    </div>
  </div>
</template>
