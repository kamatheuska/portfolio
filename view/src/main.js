import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { envMixin, darkThemeMixin } from './mixins/global';
import '@/assets/styles/global.scss';

Vue.config.productionTip = false;

Vue.mixin(envMixin());
Vue.mixin(darkThemeMixin());

new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app');
