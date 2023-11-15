import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
    },
    {
        path: '/{token}',
        name: 'Home',
        component: () => import('../views/Home.vue'),
    },
    {
        path: '/page/about',
        name: 'About',
        component: () => import('../views/About.vue'),
    },
];

export const router = createRouter({
    base: import.meta.env.BASE_URL,
    history: createWebHistory(),
    routes,
});
