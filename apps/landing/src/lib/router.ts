import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: readonly RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/home',
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export { router as appRouter };
