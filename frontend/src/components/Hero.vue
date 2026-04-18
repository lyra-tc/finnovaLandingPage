<template>
  <section
    id="home"
    class="hero-section min-h-screen bg-hero-gradient text-white"
  >
    <div class="hero-stage">
      <div class="hero-copy hero-copy-left">
        <h1>{{ t('hero.the') }}</h1>
        <h1>{{ t('hero.future') }}</h1>
      </div>

      <div class="hero-side-text hero-side-left">
        <p>{{ t('hero.tagline1') }}</p>
      </div>

      <div class="hero-phone-wrap">
        <img
          src="../assets/hero/heroPhone.png"
          alt="Hero Image"
          class="hero-phone-float"
        />
      </div>

      <div class="hero-copy hero-copy-right">
        <h1>{{ t('hero.of') }}</h1>
        <h1>{{ t('hero.finance') }}</h1>
      </div>

      <div class="hero-side-text hero-side-right">
        <p>{{ t('hero.tagline2') }}</p>
      </div>
    </div>

    <div class="hero-store-row">
      <div class="hero-store-pill">
        <font-awesome-icon :icon="['fab', 'apple']" />
        <span>{{ t('hero.appleStore') }}</span>
      </div>

      <div class="hero-store-divider"></div>

      <div class="hero-store-pill">
        <font-awesome-icon :icon="['fab', 'google-play']" size="sm" />
        <span>{{ t('hero.googlePlay') }}</span>
      </div>
    </div>
    <div class="hero-coming-soon">
      <h4>{{ t('hero.comingSoon') }}</h4>
    </div>
    <div class="hero-cta">
      <a
        href="#waitlist"
        @click.prevent="isFormsOpen = true"
        class="btn-waitlist"
      >
        {{ t('hero.cta') }}
      </a>
    </div>
    <Forms :open="isFormsOpen" @close="isFormsOpen = false" />
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Forms from '@/components/Forms.vue';
const { t } = useI18n();
const isFormsOpen = ref(false);
</script>

<style scoped>
.hero-section {
  display: grid;
  align-content: center;
  min-height: 100svh;
  overflow: hidden;
  padding: clamp(4.75rem, 7vh, 6rem) clamp(1rem, 4vw, 4rem) clamp(1.5rem, 4vh, 2.5rem);
}

.hero-stage {
  --hero-title-size: clamp(2.55rem, 6.2vw, 5.2rem);
  --hero-phone-width: clamp(13rem, 24vw, 21.5rem);
  --hero-copy-left-offset: clamp(1.85rem, 6.2vw, 5.6rem);
  --hero-copy-right-offset: clamp(0.8rem, 4vw, 3.6rem);
  --hero-side-offset: clamp(2rem, 6vw, 6rem);

  position: relative;
  isolation: isolate;
  width: min(100%, 82rem);
  height: clamp(17.5rem, 35vw, 25.5rem);
  margin-inline: auto;
}

.hero-copy {
  position: absolute;
  z-index: 1;
  color: #fff;
  font-weight: 800;
  line-height: 0.92;
  letter-spacing: 0;
  pointer-events: none;
  transform: translateY(-50%);
}

.hero-copy h1 {
  font-size: var(--hero-title-size);
  margin: 0;
  font-weight: inherit;
  white-space: nowrap;
}

.hero-copy-left {
  top: 40%;
  right: calc(50% + var(--hero-copy-left-offset));
  text-align: right;
}

.hero-copy-right {
  top: 58%;
  left: calc(50% + var(--hero-copy-right-offset));
  text-align: left;
}

.hero-copy-left h1:first-child {
  font-size: calc(var(--hero-title-size) * 0.72);
  transform: translateX(-0.6em);
}

.hero-copy-right h1:first-child {
  font-size: calc(var(--hero-title-size) * 0.66);
  transform: translateX(0.62em);
}

.hero-phone-wrap {
  position: absolute;
  left: 50%;
  top: 44%;
  z-index: 3;
  width: var(--hero-phone-width);
  transform: translate(-50%, -50%);
}

.hero-phone-float {
  display: block;
  width: 100%;
  height: auto;
  animation: hero-phone-breathe 7.2s ease-in-out infinite;
  transform-origin: center;
  will-change: transform;
}

.hero-side-text {
  position: absolute;
  z-index: 2;
  width: clamp(5.8rem, 8vw, 8.75rem);
  color: #fff;
  font-size: clamp(0.48rem, 0.72vw, 0.68rem);
  font-weight: 600;
  line-height: 1.05;
  text-align: justify;
}

.hero-side-left {
  left: calc(var(--hero-side-offset) + clamp(2rem, 5vw, 5rem));
  top: clamp(2.5rem, 6.8vw, 4.9rem);
}

.hero-side-right {
  right: var(--hero-side-offset);
  top: clamp(4.6rem, 9.5vw, 7.8rem);
}

.hero-store-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(1rem, 3vw, 1.75rem);
  margin-top: clamp(-0.25rem, -0.5vw, 0rem);
}

.hero-store-pill {
  display: inline-flex;
  min-width: clamp(8.25rem, 18vw, 10.75rem);
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  border-radius: 0.5rem;
  background: rgb(255 255 255 / 0.1);
  padding: clamp(0.5rem, 1vw, 0.65rem) clamp(0.85rem, 2vw, 1.2rem);
  font-size: clamp(0.78rem, 1.6vw, 1rem);
  font-weight: 700;
  white-space: nowrap;
}

.hero-store-divider {
  width: 1px;
  height: clamp(2.4rem, 5vw, 3rem);
  background: #fff;
  transform: rotate(25deg);
}

.hero-coming-soon {
  margin-top: clamp(1.2rem, 3vw, 1.8rem);
  text-align: center;
  font-size: clamp(1rem, 2vw, 1.35rem);
  font-weight: 800;
}

.hero-cta {
  margin-top: clamp(0.9rem, 2vw, 1.5rem);
  text-align: center;
}

.hero-cta .btn-waitlist {
  display: inline-block;
  padding: clamp(0.55rem, 1.1vw, 0.8rem) clamp(1.9rem, 5vw, 3rem);
  font-size: clamp(1rem, 2vw, 1.25rem);
  font-weight: 700;
}

@keyframes hero-phone-breathe {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-10px) scale(1.015);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-phone-float {
    animation: none;
  }
}

@media (max-width: 767px) {
  .hero-stage {
    --hero-title-size: clamp(1.45rem, 9.2vw, 2.65rem);
    --hero-phone-width: clamp(11rem, 52vw, 17rem);
    --hero-copy-left-offset: clamp(2.05rem, 14.8vw, 4.7rem);
    --hero-copy-right-offset: clamp(0.9rem, 8vw, 2.65rem);

    height: clamp(19rem, 82vw, 27rem);
  }

  .hero-copy-left {
    top: 39%;
  }

  .hero-copy-right {
    top: 61%;
  }

  .hero-phone-wrap {
    top: 45%;
  }

  .hero-side-text {
    display: none;
  }

  .hero-store-row {
    flex-wrap: wrap;
    margin-top: clamp(-1.5rem, -5vw, -0.35rem);
  }

  .hero-store-divider {
    display: none;
  }
}

@media (max-width: 430px) {
  .hero-store-row {
    gap: 0.7rem;
  }

  .hero-store-pill {
    min-width: min(10.5rem, 44vw);
    gap: 0.5rem;
    padding-inline: 0.7rem;
    font-size: 0.78rem;
  }
}
</style>
