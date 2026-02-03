<template>
  <header class="fixed inset-x-0 top-0 z-50 bg-transparent">
    <nav class="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
      <div class="flex items-center">
        <img src="/logo.svg" alt="Company Logo" class="w-24 h-auto md:w-36 lg:w-48" />
      </div>

      <ul class="hidden md:flex space-x-6 text-xs lg:text-sm font-semibold items-center">
        <li><a href="#home" class="nav-link-hover">Home</a></li>
        <li><a href="#features" class="nav-link-hover">Features</a></li>
        <li><a href="#contact" class="nav-link-hover">Contact</a></li>
        <li>
          <a href="#waitlist" @click="isFormsOpen = true" class="btn-waitlist">Early Access</a>
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
          <li><a @click="isOpen = false" href="#home" class="nav-link-hover">Home</a></li>
          <li><a @click="isOpen = false" href="#features" class="nav-link-hover">Features</a></li>
          <li><a @click="isOpen = false" href="#contact" class="nav-link-hover">Contact</a></li>
          <li>
            <a
              @click="((isOpen = false), (isFormsOpen = true))"
              href="#waitlist"
              class="btn-waitlist text-lg"
              >Early Access</a
            >
          </li>
        </ul>
      </div>
    </transition>
    <Forms :open="isFormsOpen" @close="isFormsOpen = false" />
  </header>
</template>

<script setup>
import { ref } from 'vue';
import Forms from '@/components/Forms.vue';
const isOpen = ref(false);
const isFormsOpen = ref(false);
</script>
