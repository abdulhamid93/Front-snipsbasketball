import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
    },
    {
        path: '/privacy-policy',
        name: 'PrivacyPolicy',
        component: () => import('../views/PrivacyPolicy.vue'),
    },
    {
        path: '/terms',
        name: 'terms',
        component: () => import('../views/TermsConditions.vue'),
    },
    {
        path: '/cookie',
        name: 'cookie',
        component: () => import('../views/CookiePreferences.vue'),
    },
    // {
    //     path: '/:token',
    //     name: 'HomeVote',
    //     component: () => import('../views/Home.vue'),
    // },
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
