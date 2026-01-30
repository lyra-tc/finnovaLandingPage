<template>
  <section id="home" class="min-h-screen bg-hero-gradient content-center text-white pt-20 pb-16 md:pt-24 md:pb-24 -z-10">
    <div class="z-0 relative flex justify-center items-center px-4 text-center my-4">  
      <div class="encima text-right">
        <h1 class="text-2xl md:text-6xl lg:text-7xl font-bold mr-2">The</h1>
        <h1 class="text-3xl md:text-7xl lg:text-8xl font-bold ">Future</h1>
      </div>
      <div class="flex flex-col">
        <div class="right-text hidden md:flex w-23 lg:w-28">
            <p class="lg:text-xs">Simplify your finances. Invest smarter. Join the movement.</p>
        </div>
        <div class="left-text hidden md:flex w-26 lg:w-32">
          <p class="lg:text-xs">Manage, save, and invest — all in one app designed for you.</p>
        </div>
        <img src="../assets/hero/heroPhone.png" alt="Hero Image" class="mx-auto my-4 w-[50%] md:w-[70%] lg:w-full" />
      </div>
      <div class="atras text-left">
        <h1 class="text-2xl md:text-6xl lg:text-7xl font-bold ml-6 lg:ml-12">of</h1>
        <h1 class="text-3xl md:text-7xl lg:text-8xl font-bold">Finance</h1>     
      </div>  
    </div>
    <div class="flex items-center justify-center gap-6 mt-6">
      <div class="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-2 min-w-37.5">
        <font-awesome-icon :icon="['fab', 'apple']"/>
        <span class="text-white font-semibold">Apple Store</span>
      </div>

      <div class="w-[0.5px] h-12 bg-white rotate-25"></div>

      <div class="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-2 min-w-37.5">
        <font-awesome-icon :icon="['fab', 'google-play']" size="sm" />
        <span class="text-white font-semibold">Google Play</span>
      </div>
    </div>
    <div class="text-center text-base md:text-lg lg:text-xl font-bold mt-6">
      <h4>Coming Soon</h4>
    </div>
    <div class="text-center">
      <h4 href="#waitlist" class="btn-waitlist mx-auto mt-6 md:mt-12 md:px-12 md:py-3 inline-block font-semibold text-base md:text-lg lg:text-xl">Join the Waitlist</h4>
    </div>
  </section>
</template>

<script setup>
// No script needed for now
</script>

<style scoped>
.left-text {
  position: absolute; 
  text-align: justify;
  font-size: 0.6rem;
  top: 43%;
  right: 10%;
  @media screen and (min-width: 1439px) {
    top: 48%;
    right: 14%;
  }
}

.right-text {
  position: absolute; 
  text-align: justify;
  font-size: 0.6rem;
  top: 5%;
  left: 8%;
  @media screen and (min-width: 1439px) {
    top: 10%;
    left: 14%;
  }
}

.encima {
  position: absolute;
  bottom: 40%;
  left: 10%;
  @media screen and (min-width: 380px) {
    bottom: 45%;
    left: 14%;
  }
  @media screen and (min-width: 767px) {
    bottom: 40%;
    left: 9%;
  }
  @media screen and (min-width: 1439px) {
    bottom: 45%;
    left: 21%;
  }
}

.atras {
  position: absolute;
  top: 45%;
  right: 11%;
  z-index: -1; 
  @media screen and (min-width: 380px) {
    top: 50%;
    right: 15%;
  }
  @media screen and (min-width: 767px) {
    top: 45%;
    right: 9%;
  }
  @media screen and (min-width: 1439px) {
    top: 50%;
    right: 21%;
  }
}  
</style>