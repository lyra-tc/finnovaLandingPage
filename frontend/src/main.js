import { createApp } from 'vue';
import App from './App.vue';
import './styles.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faApple, faGooglePlay } from '@fortawesome/free-brands-svg-icons'
library.add(faApple, faGooglePlay)

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
