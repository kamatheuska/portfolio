import Vue from 'vue';
import Router from 'vue-router';

import Fallback from '@/views/Fallback.vue'

Vue.use(Router);

export default new Router({
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: {
                name: 'home'
            }
        },
        {
            path: '/fallback',
            name: 'fallback',
            component: Fallback
        },
        {
            path: '/home',
            name: 'home',
            component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
        },
        {
            path: '/projects',
            name: 'projects',
            component: () => import(/* webpackChunkName: "projects" */ '@/views/projects/index.vue'),
            children: [
                {
                    path: 'writtingMachine',
                    component: () => import(/* webpackChunkName: "writtingMachine" */ '@/views/projects/Writting.vue'),
                },
                {
                    path: 'drumMachine',
                    component: () => import(/* webpackChunkName: "drumMachine" */ '@/views/projects/Drums.vue'),
                },
                {
                    path: 'urlShortener',
                    component: () => import(/* webpackChunkName: "drumMachine" */ '@/views/projects/UrlShortener.vue'),
                }
            ]

        },
        {
            path: '/internal/drumMachine',
            name: 'internal',
            component: () => import(/* webpackChunkName: "drumMachine" */ '@/views/freecodecamp/Drums.vue'),
        },
        {
            path: '/about',
            name: 'about',
            component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
        }
    ]
});
