import { ViteSSG } from 'vite-ssg'
import { createHead } from '@vueuse/head'
import { createI18n } from 'vue-i18n'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faApple, faGooglePlay } from '@fortawesome/free-brands-svg-icons'
import en from './i18n/en.json'
import es from './i18n/es.json'
import App from './App.vue'
import './styles.css'

library.add(faApple, faGooglePlay)

export const createApp = ViteSSG(
  App,
  { routes: [{ path: '/' }] },
  ({ app }) => {
    const browserLang =
      typeof navigator !== 'undefined'
        ? navigator.language || (navigator.languages && navigator.languages[0]) || 'en'
        : 'en'
    const locale = browserLang.toLowerCase().startsWith('es') ? 'es' : 'en'

    const i18n = createI18n({
      legacy: false,
      locale,
      fallbackLocale: 'en',
      messages: { en, es },
    })

    const head = createHead()

    app.use(i18n)
    app.use(head)
    app.component('font-awesome-icon', FontAwesomeIcon)
  }
)
