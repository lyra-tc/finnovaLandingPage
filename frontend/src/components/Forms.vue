<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="open"
        class="fixed inset-0 z-999 flex items-center justify-center p-4 sm:p-6"
        role="dialog"
        aria-modal="true"
      >
        <div class="absolute inset-0 bg-black/70 backdrop-blur-md" @click="close"></div>

        <div class="relative w-full max-w-105 sm:max-w-140 rounded-3xl sm:rounded-4xl bg-black/80 border border-white/20 shadow-[0_40px_120px_rgba(0,0,0,0.75)] px-5 sm:px-10 pt-3 sm:pt-10 pb-6 sm:pb-20 max-h-[calc(100dvh-1.5rem)] sm:max-h-none overflow-y-auto"
        >
          <div class="flex flex-col items-center text-center">
            <img :src="logoName" alt="Finnova" class="h-10 sm:h-14 w-auto select-none" />
            <p class="mt-4 sm:mt-6 text-base sm:text-2xl font-semibold leading-tight text-white">
              Únete a la <span class="text-[#0FD985]">waitlist</span> y sé de los primeros.
            </p>
          </div>

          <form class="mt-5 sm:mt-10 space-y-4 sm:space-y-6" @submit.prevent="submit">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div class="text-left">
                <label class="block text-sm font-semibold text-white mb-1.5">Nombre</label>
                <input v-model.trim="form.name" type="text" placeholder="Ricardo Sierra" class="input-glass" />
              </div>
              <div class="text-left">
                <label class="block text-sm font-semibold text-white mb-1.5">Teléfono</label>
                <input v-model.trim="form.phone" type="tel" placeholder="+52 55..." class="input-glass" />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              <div class="text-left sm:col-span-2">
                <label class="block text-sm font-semibold text-white mb-1.5">Correo</label>
                <input v-model.trim="form.email" type="email" placeholder="tu@correo.com" class="input-glass" />
              </div>
              <div class="text-left">
                <label class="block text-sm font-semibold text-white mb-1.5">Edad</label>
                <input v-model.number="form.age" type="number" class="input-glass" />
              </div>
            </div>

            <div v-if="error" class="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {{ error }}
            </div>

            <div v-if="infoMessage" class="rounded-xl border border-blue-400/30 bg-blue-400/10 px-4 py-3 text-sm text-blue-100">
              {{ infoMessage }}
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <button
                type="submit"
                :disabled="loading"
                class="w-full rounded-xl bg-[#0FD985] py-3 text-sm font-black text-black hover:brightness-110 disabled:opacity-60"
              >
                {{ loading ? 'Enviando...' : 'Entrar a la waitlist' }}
              </button>
              <button type="button" @click="close" class="w-full rounded-xl border border-white/25 bg-white/5 py-3 text-sm font-black text-white">
                Ahora no
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { reactive, ref, watch, onBeforeUnmount } from 'vue';
import logoName from '../assets/forms/LogoName.png';
import { postWaitlist } from '@/api/waitlist';
import type { WaitlistPayload } from '@/api/types';

const props = defineProps<{ open: boolean }>();
const emit = defineEmits<{ (e: 'close'): void }>();

const form = reactive<WaitlistPayload>({
  name: '',
  phone: '',
  email: '',
  age: 0,
  updatesOptIn: true,
});

const loading = ref(false);
const error = ref<string | null>(null);

function close() {
  if (loading.value) return;
  emit('close');
}

function validate() {
  if (!form.name || form.name.length < 3) return 'Nombre demasiado corto.';
  if (!form.email.includes('@')) return 'Correo no válido.';
  if (form.age <= 0) return 'Edad no válida.';
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
    // Usamos 'any' aquí para evitar el error de overlap de TS temporalmente
    let res: any = await postWaitlist({ ...form }) as any;

    console.log("Respuesta API (raw):", res, "typeof:", typeof res);

    // Si el backend devolvió texto JSON sin Content-Type, parsearlo
    if (typeof res === 'string') {
      try { res = JSON.parse(res); } catch { /* no JSON */ }
    }

    const ok = !!(res && (res.ok === true || String(res.ok) === 'true' || res.ok === 1 || String(res.ok) === '1'));
    const msg = String(res?.message || '').toLowerCase();

    if (ok) {
      // CASO DUPLICADO: El mensaje de tu Lambda dice "Ya estabas en la lista"
      if (msg.includes('ya estabas') || msg.includes('lista')) {
        infoMessage.value = "⚠️ Este correo ya está registrado en nuestra lista.";
        // NO cerramos el modal, el usuario debe corregir o cerrar manualmente
        loading.value = false;
        return;
      }

      // CASO ÉXITO REAL: Registro nuevo
      form.name = '';
      form.phone = '';
      form.email = '';
      form.age = 0;

      infoMessage.value = "🚀 ¡Bienvenido! Te has unido a la waitlist.";
      close();
    } else {
      // Si ok no es true
      error.value = res?.message || 'No pudimos procesar tu registro.';
    }
  } catch (e: any) {
    console.error("Error en submit:", e);
    error.value = e.message || 'Error de conexión con el servidor.';
  } finally {
    loading.value = false;
  }
}

function onEscape(e: KeyboardEvent) {
  if (e.key === 'Escape') close();
}

watch(() => props.open, (isOpen) => {
  if (isOpen) {
    error.value = null;
    window.addEventListener('keydown', onEscape);
  } else {
    window.removeEventListener('keydown', onEscape);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onEscape);
});
</script>

<style scoped>
.input-glass {
  width: 100%;
  border-radius: 14px;
  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: white;
  outline: none;
}
.input-glass:focus { border-color: #0FD985; }
.fade-enter-active, .fade-leave-active { transition: opacity 200ms; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>