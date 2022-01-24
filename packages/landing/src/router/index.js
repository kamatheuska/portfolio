import {
  createRouter,
  createWebHistory,
} from 'vue-router';
import Home from '../views/Home.vue';
import Intro from '../views/Intro.vue';
import MiniServices from '../views/mini-services/index.vue';
import Stories from '../views/stories/index.vue';
import Projects from '../views/projects/index.vue';

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
    path: '/stories',
    component: Stories,
    children: [
      {
        path: '',
        name: 'Stories',
        component: () => import(/* webpackChunkName: "stories" */ '../views/stories/Stories.vue'),
      },
      {
        path: '/stories/concertos',
        name: 'Concertos',
        component: () => import(/* webpackChunkName: "concertos" */ '../views/stories/GeometricConcertos.vue'),
      },
    ],
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
        component: () => import(/* webpackChunkName: "services" */ '../views/mini-services/Services.vue'),
      },
      {
        path: 'urlshortener',
        name: 'UrlShortener',
        component: () => import(/* webpackChunkName: "urlShortener" */ '../views/mini-services/UrlShortener.vue'),
      },
      {
        path: 'timestamp',
        name: 'Timestamp',
        component: () => import(/* webpackChunkName: "timestamp" */ '../views/mini-services/Timestamp.vue'),
      },
      {
        path: 'whoami',
        name: 'Whoami',
        component: () => import(/* webpackChunkName: "whoami" */ '../views/mini-services/Whoami.vue'),
      },
    ],
  },

  {
    path: '/projects',
    component: Projects,
    children: [
      {
        path: '',
        name: 'Projects',
        component: () => import(/* webpackChunkName: "projects" */ '../views/projects/Projects.vue'),
      },
      {
        path: ':title/:id',
        name: 'ProjectDetail',
        component: () => import(/* webpackChunkName: "project-detail" */ '../views/projects/ProjectDetail.vue'),
      },
    ],
  },
];

const router = createRouter({
  mode: 'history',
  routes,
  linkActiveClass: 'is-active',
  history: createWebHistory(),
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
