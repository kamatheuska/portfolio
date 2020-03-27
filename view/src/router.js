import Vue from 'vue';
import Router from 'vue-router';
// import Weather from '@/views/projects/Weather';
Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: {
                name: 'home'
            }
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
                    path: 'weather',
                    component: () => import(/* webpackChunkName: "weather" */ '@/views/projects/Weather.vue'),
                },
                {
                    path: 'writtingMachine',
                    component: () => import(/* webpackChunkName: "writtingMachine" */ '@/views/projects/Writting.vue'),

                }
            ]

        },
        {
            path: '/about',
            name: 'about',
            component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
        }
    ]
});
