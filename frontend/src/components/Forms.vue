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
            class="relative w-full max-w-[560px] rounded-[32px]
                 bg-black/80 border border-white/20
                 shadow-[0_40px_120px_rgba(0,0,0,0.75)]
                 px-6 py-8 sm:px-10 sm:py-10"
        >
          <!-- Header -->
          <div class="flex flex-col items-center text-center">
            <img :src="logoName" alt="Finnova" class="h-12 sm:h-14 w-auto select-none" />
            <p class="mt-6 text-xl sm:text-2xl font-semibold leading-tight text-white">
              Únete a la <span class="text-[#0FD985]">waitlist</span> y sé<br />
              de los primeros.
            </p>
          </div>

          <!-- Form -->
          <form class="mt-10 space-y-6" @submit.prevent="submit">
            <!-- Row 1 -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div class="text-left">
                <label class="block text-sm font-semibold text-white mb-2">Nombre</label>
                <input v-model.trim="form.name" type="text" placeholder="Ricardo Sierra Roa" class="input-glass" />
                <p class="mt-2 text-xs text-white/40">Nombre completo</p>
              </div>

              <div class="text-left">
                <label class="block text-sm font-semibold text-white mb-2">Teléfono</label>
                <input v-model.trim="form.phone" type="tel" placeholder="+52 55 5555 5555" class="input-glass" />
                <p class="mt-2 text-xs text-white/40">Para contacto rápido</p>
              </div>
            </div>

            <!-- Row 2 -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div class="text-left sm:col-span-2">
                <label class="block text-sm font-semibold text-white mb-2">Correo</label>
                <input v-model.trim="form.email" type="email" placeholder="tu@correo.com" class="input-glass" />
                <p class="mt-2 text-xs text-white/40">Te mandaremos el acceso por aquí</p>
              </div>

              <div class="text-left">
                <label class="block text-sm font-semibold text-white mb-2">Edad</label>
                <input v-model.trim="form.age" type="number" min="0" inputmode="numeric" placeholder="22" class="input-glass" />
                <p class="mt-2 text-xs text-white/40">Solo para segmentación</p>
              </div>
            </div>

            <!-- Status messages -->
            <div v-if="error" class="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-left text-sm text-red-200">
              {{ error }}
            </div>
            <div v-if="success" class="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-left text-sm text-emerald-100">
              Listo ✅ Te registraste en la waitlist.
            </div>

            <!-- Actions -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                  type="submit"
                  :disabled="loading"
                  class="w-full rounded-xl bg-[#0FD985] py-3.5
                       text-sm font-black text-black
                       transition-all duration-300
                       hover:brightness-110 active:scale-[0.99]
                       disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span v-if="!loading">Entrar a la waitlist</span>
                <span v-else>Enviando…</span>
              </button>

              <button
                  type="button"
                  class="w-full rounded-xl border border-white/25 bg-white/5 py-3.5
                       text-sm font-black text-white/90
                       transition-all duration-300
                       hover:bg-white/10 hover:border-white/40 active:scale-[0.99]"
                  @click="close"
                  :disabled="loading"
              >
                Ahora no
              </button>
            </div>

            <!-- Opt-in -->
            <label class="flex items-start gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-3 cursor-pointer select-none">
              <!-- input real -->
              <input v-model="form.updatesOptIn" type="checkbox" class="peer sr-only" />
              <!-- caja -->
              <span
                  class="grid h-5 w-5 place-items-center rounded-md border border-white/30 bg-transparent
                       transition-all duration-200
                       peer-checked:bg-white peer-checked:border-white
                       peer-checked:[&>svg]:opacity-100"
              >
                <!-- palomita (negra) -->
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
                Deseo recibir notificaciones y actualizaciones
              </span>
            </label>

            <!-- Privacy -->
            <p class="text-left text-xs text-white/45">
              Al enviar aceptas nuestra
              <a href="#" class="link-underline text-[#0FD985]">política de privacidad</a>
            </p>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { reactive, ref, watch, onBeforeUnmount } from "vue";
import logoName from "../assets/forms/LogoName.png";
import { postWaitlist } from "@/api/waitlist";
import type { WaitlistPayload } from "@/api/types";

const props = defineProps<{ open: boolean }>();
const emit = defineEmits<{ (e: "close"): void }>();

const form = reactive<WaitlistPayload>({
  name: "",
  phone: "",
  email: "",
  age: 0,
  updatesOptIn: true, // ✅ default true
});

const loading = ref(false);
const error = ref<string | null>(null);
const success = ref(false);

function close() {
  if (loading.value) return;
  emit("close");
}

function validate(): string | null {
  if (!form.name || form.name.trim().length < 3) return "Pon tu nombre completo (mínimo 3 letras).";
  if (!form.phone || form.phone.trim().length < 8) return "Pon un teléfono válido.";
  if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) return "Pon un correo válido.";
  if (!Number.isFinite(form.age) || form.age <= 0) return "Pon tu edad.";
  return null;
}

async function submit() {
  error.value = null;
  success.value = false;

  const validationError = validate();
  if (validationError) {
    error.value = validationError;
    return;
  }

  loading.value = true;

  try {
    await postWaitlist({
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      age: form.age,
      updatesOptIn: form.updatesOptIn,
    });

    success.value = true;

    // limpia form (mantén opt-in en true)
    form.name = "";
    form.phone = "";
    form.email = "";
    form.age = 22;
    form.updatesOptIn = true;

    setTimeout(() => {
      emit("close");
      success.value = false;
    }, 900);
  } catch (e: any) {
    error.value = e?.message || "No se pudo enviar. Intenta de nuevo.";
  } finally {
    loading.value = false;
  }
}

// UX: bloquear scroll + cerrar con ESC
function onKeyDown(e: KeyboardEvent) {
  if (e.key === "Escape" && props.open) close();
}

watch(
    () => props.open,
    (isOpen) => {
      error.value = null;
      success.value = false;

      document.body.style.overflow = isOpen ? "hidden" : "";
      if (isOpen) window.addEventListener("keydown", onKeyDown);
      else window.removeEventListener("keydown", onKeyDown);
    },
    { immediate: true }
);

onBeforeUnmount(() => {
  document.body.style.overflow = "";
  window.removeEventListener("keydown", onKeyDown);
});
</script>


<style scoped>
.input-glass {
  width: 100%;
  border-radius: 14px;
  padding: 12px 14px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: rgba(255, 255, 255, 0.9);
  outline: none;
  transition: border-color 180ms ease, background 180ms ease;
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
  content: "";
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
