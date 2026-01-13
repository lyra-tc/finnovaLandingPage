<template>
  <header class="fixed inset-x-0 top-0 z-50 bg-transparent">
    <nav class="container mx-auto px-4 py-4 flex justify-between items-center">
      <div class="flex items-center">
        <!-- Logo Image: Recommended SVG, max size 40x40px to keep header clean -->
        <img src="/logo.svg" alt="Company Logo" class="w-12 h-auto md:w-48 md:h-auto mr-2" />
      </div>
      <ul class="hidden md:flex space-x-6">
        <li><a href="#home" class="text-gray-600 hover:text-blue-600 transition duration-300">Home</a></li>
        <li><a href="#features" class="text-gray-600 hover:text-blue-600 transition duration-300">Features</a></li>
        <li><a href="#contact" class="text-gray-600 hover:text-blue-600 transition duration-300">Contact</a></li>
      </ul>
      <!-- Mobile menu button (placeholder, can add JS later) -->
      <!-- <button class="md:hidden text-gray-600 hover:text-gray-900">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h1 6M4 12h16M4 18h16"></path>
        </svg>
      </button> -->
    </nav>
  </header>
</template>

<script setup>
// No script needed for now
</script>

<style scoped>
/* Scoped styles if needed */
</style>