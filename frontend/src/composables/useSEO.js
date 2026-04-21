import { useHead } from '@vueuse/head'

export function useSEO({
  title,
  description,
  url = 'https://www.finnova.com.mx',
  image = 'https://www.finnova.com.mx/og-image.jpg',
  locale = 'es_MX',
}) {
  useHead({
    title,
    meta: [
      { name: 'description', content: description },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Finnova' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      { property: 'og:locale', content: locale },
      { property: 'og:site_name', content: 'Finnova' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
    ],
    link: [
      { rel: 'canonical', href: url },
    ],
  })
}
