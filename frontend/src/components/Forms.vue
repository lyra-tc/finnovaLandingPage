<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="open"
        class="fixed inset-0 z-999 flex items-center justify-center p-4 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-label="Waitlist form"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/70 backdrop-blur-md" @click="close"></div>

        <!-- Modal -->
        <div
          class="relative w-full max-w-[420px] sm:max-w-[560px] rounded-[24px] sm:rounded-[32px] bg-black/80 border border-white/20 shadow-[0_40px_120px_rgba(0,0,0,0.75)] px-5 sm:px-10 pt-3 sm:pt-10 pb-6 sm:pb-20 max-h-[calc(100dvh-1.5rem)] sm:max-h-none overflow-y-auto overscroll-contain lg:scale-[0.85] lg:origin-center lg:transform-gpu"
        >
          <!-- Header -->
          <div class="flex flex-col items-center text-center">
            <img :src="logoName" alt="Finnova" class="h-10 sm:h-14 w-auto select-none" />
            <p class="mt-4 sm:mt-6 text-base sm:text-2xl font-semibold leading-tight text-white">
              {{ t('forms.headlinePre') }} <span class="text-[#0FD985]">{{ t('forms.waitlist') }}</span> {{ t('forms.headlineMid') }}<br />
              <span class="text-[#0FD985]">{{ t('forms.earlyAccess') }}</span>.
            </p>
          </div>

          <!-- Form -->
          <form class="mt-5 sm:mt-10 space-y-4 sm:space-y-6" @submit.prevent="submit">
            <!-- Row 1 -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div class="text-left">
                <label class="block text-sm font-semibold text-white mb-1.5 sm:mb-2">{{ t('forms.labelName') }}</label>
                <input
                  v-model.trim="form.name"
                  type="text"
                  :placeholder="t('forms.placeholderName')"
                  class="input-glass"
                />
                <p class="mt-1 text-[11px] sm:text-xs text-white/40">{{ t('forms.hintName') }}</p>
              </div>

              <div class="text-left">
                <label class="block text-sm font-semibold text-white mb-1.5 sm:mb-2">{{ t('forms.labelPhone') }}</label>
                <input
                  v-model.trim="form.phone"
                  type="tel"
                  :placeholder="t('forms.placeholderPhone')"
                  class="input-glass"
                />
                <p class="mt-1 text-[11px] sm:text-xs text-white/40">{{ t('forms.hintPhone') }}</p>
              </div>
            </div>

            <!-- Row 2 -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              <div class="text-left sm:col-span-2">
                <label class="block text-sm font-semibold text-white mb-1.5 sm:mb-2">{{ t('forms.labelEmail') }}</label>
                <input
                  v-model.trim="form.email"
                  type="email"
                  :placeholder="t('forms.placeholderEmail')"
                  class="input-glass"
                />
                <p class="mt-1 text-[11px] sm:text-xs text-white/40">{{ t('forms.hintEmail') }}</p>
              </div>

              <div class="text-left">
                <label class="block text-sm font-semibold text-white mb-1.5 sm:mb-2">{{ t('forms.labelAge') }}</label>
                <input
                  v-model.number="form.age"
                  type="number"
                  min="0"
                  inputmode="numeric"
                  :placeholder="t('forms.placeholderAge')"
                  class="input-glass"
                />
                <p class="mt-1 text-[11px] sm:text-xs text-white/40">{{ t('forms.hintAge') }}</p>
              </div>
            </div>

            <!-- Status messages -->
            <div
              v-if="error"
              class="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
            >
              {{ error }}
            </div>

            <div
              v-if="infoMessage"
              class="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100"
            >
              {{ infoMessage }}
            </div>

            <!-- Actions -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <button
                type="submit"
                :disabled="loading"
                class="w-full rounded-xl bg-[#0FD985] py-3 sm:py-3.5 text-sm font-black text-black transition-all duration-300 hover:brightness-110 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span v-if="!loading">{{ t('forms.btnSubmit') }}</span>
                <span v-else>{{ t('forms.btnSubmitting') }}</span>
              </button>

              <button
                type="button"
                class="w-full rounded-xl border border-white/25 bg-white/5 py-3 sm:py-3.5 text-sm font-black text-white/90 transition-all duration-300 hover:bg-white/10 hover:border-white/40 active:scale-[0.99]"
                @click="close"
                :disabled="loading"
              >
                {{ t('forms.btnClose') }}
              </button>
            </div>

            <!-- Opt-in -->
            <label
              class="flex items-start gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-3 cursor-pointer select-none"
            >
              <input v-model="form.updatesOptIn" type="checkbox" class="peer sr-only" />
              <span
                class="grid h-5 w-5 place-items-center rounded-md border border-white/30 bg-transparent transition-all duration-200 peer-checked:bg-white peer-checked:border-white peer-checked:[&>svg]:opacity-100"
              >
                <svg
                  class="h-3.5 w-3.5 opacity-0 transition-opacity duration-150"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="black"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </span>
              <span class="text-sm text-white/85 leading-snug">
                {{ t('forms.checkboxLabel') }}
              </span>
            </label>

            <!-- Privacy -->
            <p class="text-left text-xs text-white/45">
              {{ t('forms.privacyPre') }}
              <a
                :href="privacyPolicyUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="link-underline text-[#0FD985]"
              >
                {{ t('forms.privacyLink') }}
              </a>
            </p>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import logoName from '../assets/forms/LogoName.png';
import { postWaitlist } from '@/api/waitlist';
import type { WaitlistPayload } from '@/api/types';
import { sendWaitlistMail } from '@/api/mail';

const { t, locale } = useI18n();
const props = defineProps<{ open: boolean }>();
const emit = defineEmits<{ (e: 'close'): void }>();

const privacyPolicyUrl = computed(() => {
  const isSpanish = locale.value.toLowerCase().startsWith('es');
  return isSpanish
    ? '/privacy-policies/Politicas%20de%20privacidad%20-%20Waitlist%20.pdf'
    : '/privacy-policies/Privacy%20Policy%20-%20Waitlist%20.pdf';
});

type WaitlistFormState = Omit<WaitlistPayload, 'age'> & {
  age: number | null;
};

const form = reactive<WaitlistFormState>({
  name: '',
  phone: '',
  email: '',
  age: null,
  updatesOptIn: true,
});

const loading = ref(false);
const error = ref<string | null>(null);
const success = ref(false);
const modalHistoryKey = '__finnovaWaitlistModal';
const pushedModalHistory = ref(false);

function removeModalHistoryEntry() {
  if (!pushedModalHistory.value || !window.history.state?.[modalHistoryKey]) return;

  pushedModalHistory.value = false;
  window.history.back();
}

function close() {
  if (loading.value) return;
  removeModalHistoryEntry();
  emit('close');
}

function validate(): string | null {
  if (!form.name || form.name.trim().length < 3) return t('forms.errorName');
  if (form.name.trim().length > 60) return t('forms.errorNameMax');
  if (!form.phone || form.phone.trim().length <= 10 || form.phone.trim().length > 20)
    return t('forms.errorPhone');
  if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) return t('forms.errorEmail');
  const age = form.age;
  if (age === null || !Number.isFinite(age) || age < 0 || age > 100) return t('forms.errorAge');
  return null;
}

const infoMessage = ref<string | null>(null);

async function submit() {
  error.value = null;
  infoMessage.value = null;

  const vError = validate();
  if (vError) {
    error.value = vError;
    return;
  }

  loading.value = true;
  try {
    const age = Number(form.age);
    const payload: WaitlistPayload = {
      ...form,
      name: form.name.replace(/<[^>]*>?/gm, '').trim(),
      email: form.email.toLowerCase().trim().replace(/\s+/g, ''),
      phone: form.phone.replace(/[^\d+]/g, '').replace(/^00/, '+'),
      age: Math.min(99, Math.max(1, Math.trunc(age))),
    };
    let res: any = await postWaitlist(payload);

    if (typeof res === 'string') {
      try {
        res = JSON.parse(res);
      } catch {}
    }

    const ok = !!(
      res &&
      (res.ok === true || String(res.ok) === 'true' || res.ok === 1 || String(res.ok) === '1')
    );

    const msg = String(res?.message || '').toLowerCase();

    if (ok) {
      const isDuplicate =
        msg.includes('ya estabas') ||
        msg.includes('ya estás') ||
        msg.includes('ya existe') ||
        msg.includes('already') ||
        msg.includes('duplicate');

      if (isDuplicate) {
        error.value = t('forms.errorDuplicate');
        return;
      }

      sendWaitlistMail({
        name: payload.name,
        email: payload.email,
      })
          .then((r: any) => {
            console.log('MAIL OK:', r);
          })
          .catch((e: any) => {
            console.error('MAIL FAIL:', e);
          });

      form.name = '';
      form.phone = '';
      form.email = '';
      form.age = null;

      infoMessage.value = t('forms.success');
      close();
    } else {
      error.value = res?.message || t('forms.errorGeneric');
    }
  } catch (e: any) {
    console.error('Error en submit:', e);
    error.value = e?.message || t('forms.errorConnection');
  } finally {
    loading.value = false;
  }
}

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.open) close();
}

function onPopState() {
  if (!props.open || !pushedModalHistory.value) return;

  pushedModalHistory.value = false;
  emit('close');
}

watch(
  () => props.open,
  (isOpen) => {
    error.value = null;
    success.value = false;

    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (isOpen) {
      if (!window.history.state?.[modalHistoryKey]) {
        window.history.pushState(
          { ...(window.history.state || {}), [modalHistoryKey]: true },
          '',
          window.location.href
        );
      }
      pushedModalHistory.value = true;
      window.addEventListener('keydown', onKeyDown);
      window.addEventListener('popstate', onPopState);
    } else {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('popstate', onPopState);
    }
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  document.body.style.overflow = '';
  window.removeEventListener('keydown', onKeyDown);
  window.removeEventListener('popstate', onPopState);
});
</script>

<style scoped>
.input-glass {
  width: 100%;
  border-radius: 14px;
  padding: 10px 12px; /* mobile: más compacto */
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: rgba(255, 255, 255, 0.9);
  outline: none;
  transition:
    border-color 180ms ease,
    background 180ms ease;
  font-size: 14px; /* mobile */
}
@media (min-width: 640px) {
  .input-glass {
    padding: 12px 14px;
    font-size: 16px;
  }
}

.input-glass::placeholder {
  color: rgba(255, 255, 255, 0.35);
}
.input-glass:focus {
  border-color: rgba(15, 217, 133, 0.65);
  background: rgba(255, 255, 255, 0.06);
}

.link-underline {
  position: relative;
  display: inline-block;
  padding-bottom: 4px;
}
.link-underline::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  border-radius: 999px;
  background: #0fd985;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 240ms ease;
}
.link-underline:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
