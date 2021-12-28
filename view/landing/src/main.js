import Vue from 'vue';
import vClickOutside from 'v-click-outside';

import App from './App.vue';
import router from './router';
import store from './store';
import { envMixin, darkThemeMixin, cookiesMixin } from './mixins/global';
import '@/assets/styles/global.scss';

Vue.config.productionTip = false;

Vue.mixin(envMixin());
Vue.mixin(darkThemeMixin());
Vue.mixin(cookiesMixin());

Vue.use(vClickOutside);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
