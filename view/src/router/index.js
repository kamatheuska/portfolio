import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Intro from '../views/Intro.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/intro',
    },
    {
        path: '/home',
        component: Home,
        name: 'Home',
    },
    {
        path: '/intro',
        name: 'Intro',
        component: Intro,
    },
    {
        path: '/stories/concertos',
        name: 'Concertos',
        component: () =>
            import(/* webpackChunkName: "concertos" */ '../views/stories/GeometricConcertos.vue'),
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
