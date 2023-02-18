import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { appRouter } from './lib/router';

createApp(App).use(appRouter).mount('#app');
