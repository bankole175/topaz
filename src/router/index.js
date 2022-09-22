import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/Home.vue';
import { Auth } from '@/api/Auth';
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
const isUserLoggedIn = Auth.get();
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/',
            name: 'allDealflow',
            meta: {
                authGuard: true,
            },
            components: {
                sidebar: Sidebar,
                top: Header,
                default: () => import('../views/dealflow/All.vue'),
            },
        },
        {
            path: '/dealflow/:id',
            name: 'singleDealflow',
            meta: {
                authGuard: true,
            },
            components: {
                sidebar: Sidebar,
                top: Header,
                default: () => import('../views/dealflow/Single.vue'),
            },
        },
    ],
});
router.beforeEach((to, from, next) => {
    if (to.meta.authGuard) {
        if (isUserLoggedIn) {
            next();
        }
        else {
            next('/login');
        }
    }
    else {
        next();
    }
});
export default router;
