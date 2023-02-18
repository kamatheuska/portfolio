import { createApp } from 'vue';
import vClickOutside from 'v-click-outside';

import App from './App.vue';
import router from './router';
import store from './store';
import { envMixin, darkThemeMixin, cookiesMixin } from './mixins/global';

import '@/assets/styles/global.scss';

createApp(App)
  .use(store)
  .use(router)
  .use(vClickOutside)
  .mixin(envMixin())
  .mixin(darkThemeMixin())
  .mixin(cookiesMixin())
  .mount('#app');
