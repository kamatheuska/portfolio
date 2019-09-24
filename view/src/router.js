import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'intro',
            component: () => import(/* webpackChunkName: "intro" */ './views/Intro.vue')
        },
        {
            path: '/home',
            name: 'home',
            component: () => import(/* webpackChunkName: "home" */ './views/Home.vue')
        },
        {
            path: '/projects',
            name: 'projects',
            component: () => import(/* webpackChunkName: "projects" */ './views/Projects.vue')
        },
        {
            path: '/about',
            name: 'about',
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        }
    ]
});
