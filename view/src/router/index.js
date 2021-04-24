import Vue from 'vue';
import VueRouter from 'vue-router';
import Intro from '../views/Intro.vue';
import Concertos from '../views/Concertos.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/intro',
    },
    {
        path: '/intro',
        name: 'Intro',
        component: Intro,
    },
    {
        path: '/concertos',
        name: 'Concertos',
        component: Concertos,
    },
    {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    },
];

const router = new VueRouter({
    routes,
});

export default router;
