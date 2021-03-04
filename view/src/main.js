import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vClickOutside from 'v-click-outside'
import vuetify from './plugins/vuetify';

Vue.use(vClickOutside)

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app');
