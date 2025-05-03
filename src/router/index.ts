import { createRouter, createWebHistory } from 'vue-router';
import MainRoutes from './MainRoutes';
import PublicRoutes from './PublicRoutes';
import { useAuthStore } from '@/stores/auth';
import AdminRoutes from './AdminRoutes';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/pages/maintenance/error/Error404Page.vue')
    },
    MainRoutes,
    PublicRoutes,
    AdminRoutes
  ]
});



router.beforeEach(async (to, from, next) => {
  // redirect to home page if not logged in and trying to access a restricted page
  const publicPages = ['/'];
  const auth = useAuthStore();


  const authRequired = to.matched.some((record) => record.meta.requiresAuth);

  // User not logged in and trying to access a restricted page
  if (authRequired && !auth.isLoggedIn()) {
    // 将未登录用户导向主页
    console.log('未登录用户导向主页');
    next('/');
  } else if (auth.isLoggedIn() && to.path === '/login') {
    // User logged in and trying to access the login page
    next('/');
  } else {
    // All other scenarios, either public page or authorized access
    next();
  }
});
