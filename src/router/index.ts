import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import { Auth } from '@/api/Auth'
import Header from '@/components/layout/Header.vue'
import Sidebar from '@/components/layout/Sidebar.vue'

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
})

router.beforeEach((to, from, next) => {
  const isUserLoggedIn = Auth.isUserValid()
  if ((to.meta.authGuard && isUserLoggedIn) || !to.meta.authGuard) {
    next()
  } else {
    next('/login')
  }
})
export default router
