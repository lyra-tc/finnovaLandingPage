import { createI18n } from 'vue-i18n';
import en from './en.json';
import es from './es.json';

const browserLocale = navigator.language || (navigator.languages && navigator.languages[0]) || 'en';
const locale = browserLocale.toLowerCase().startsWith('es') ? 'es' : 'en';

export const i18n = createI18n({
  legacy: false,
  locale,
  fallbackLocale: 'en',
  messages: { en, es },
});
