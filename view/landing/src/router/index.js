import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Intro from '../views/Intro.vue';
import MiniServices from '../views/mini-services/index.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/home',
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
        component: () => import(/* webpackChunkName: "concertos" */ '../views/stories/GeometricConcertos.vue'),
    },
    {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    },
    {
        path: '/miniservices',
        component: MiniServices,
        children: [
            {
                path: '',
                name: 'Miniservices',
                component: () => import(/* webpackChunkName: "urlShortener" */ '../views/mini-services/Services.vue'),
            },
            {
                path: 'urlshortener',
                name: 'UrlShortener',
                component: () =>
                    import(/* webpackChunkName: "urlShortener" */ '../views/mini-services/UrlShortener.vue'),
            },
            {
                path: 'timestamp',
                name: 'Timestamp',
                component: () => import(/* webpackChunkName: "timestamp" */ '../views/mini-services/Timestamp.vue'),
            },
        ],
    },
    {
        path: '/projects/:title/:id',
        name: 'ProjectDetail',
        component: () => import(/* webpackChunkName: "about" */ '../views/ProjectDetail.vue'),
    },
];

const router = new VueRouter({
    mode: 'history',
    routes,
    linkActiveClass: 'is-active',
});

export default router;
