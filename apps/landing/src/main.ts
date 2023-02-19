import { createApp } from 'vue';

import './lib/assets/styles/remedy.css';
import './lib/assets/styles/main.css';

import App from './App.vue';
import { appRouter } from './lib/router';

createApp(App).use(appRouter).mount('#app');
