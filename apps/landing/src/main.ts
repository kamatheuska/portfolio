import { createApp } from 'vue';

import './lib/assets/styles/remedy.css';
import './lib/assets/styles/main.css';

import App from './App.vue';
import { appRouter } from './lib/router';
import { CustomFontAwesomeIcon } from './lib/icons';

createApp(App).use(appRouter).component('font-awesome-icon', CustomFontAwesomeIcon).mount('#app');
