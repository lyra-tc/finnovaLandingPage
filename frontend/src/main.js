import { createApp } from 'vue';
import App from './App.vue';
import './styles.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faApple, faGooglePlay } from '@fortawesome/free-brands-svg-icons';
library.add(faApple, faGooglePlay);

import { i18n } from './i18n/index';

createApp(App).use(i18n).component('font-awesome-icon', FontAwesomeIcon).mount('#app');
