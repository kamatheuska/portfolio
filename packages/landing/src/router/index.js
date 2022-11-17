import {
  createRouter,
  createWebHistory,
} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import IntroView from '../views/IntroView.vue';
import ServicesRoot from '../views/mini-services/ServicesRoot.vue';
import StoriesRoot from '../views/stories/StoriesRoot.vue';
import ProjectsRoot from '../views/projects/ProjectsRoot.vue';

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: HomeView,
    name: 'Home',
  },
  {
    path: '/intro',
    name: 'Intro',
    component: IntroView,
  },
  {
    path: '/stories',
    component: StoriesRoot,
    children: [
      {
        path: '',
        name: 'Stories',
        component: () => import(/* webpackChunkName: "stories" */ '../views/stories/StoriesList.vue'),
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
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/miniservices',
    component: ServicesRoot,
    children: [
      {
        path: '',
        name: 'Miniservices',
        component: () => import(/* webpackChunkName: "services" */ '../views/mini-services/ServicesList.vue'),
      },
      {
        path: 'urlshortener',
        name: 'UrlShortener',
        component: () => import(/* webpackChunkName: "urlShortener" */ '../views/mini-services/UrlShortener.vue'),
      },
      {
        path: 'timestamp',
        name: 'Timestamp',
        component: () => import(/* webpackChunkName: "timestamp" */ '../views/mini-services/TimeStamp.vue'),
      },
      {
        path: 'exercise-tracker',
        name: 'ExerciseTracker',
        component: () => import(/* webpackChunkName: "exercisetracker" */ '../views/mini-services/ExerciseTracker.vue'),
      },
      {
        path: 'file-metadata',
        name: 'FileMetadata',
        component: () => import(/* webpackChunkName: "filemetadata" */ '../views/mini-services/FileMetadata.vue'),
      },
      {
        path: 'whoami',
        name: 'Whoami',
        component: () => import(/* webpackChunkName: "whoami" */ '../views/mini-services/WhoAmI.vue'),
      },
    ],
  },

  {
    path: '/projects',
    component: ProjectsRoot,
    children: [
      {
        path: '',
        name: 'Projects',
        component: () => import(/* webpackChunkName: "projects" */ '../views/projects/ProjectsList.vue'),
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
