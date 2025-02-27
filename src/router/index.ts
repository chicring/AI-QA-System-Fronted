import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/default.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/home/index.vue'),
          meta: {
            keepAlive: true,
            requireAuth: false,
          }
        },
        {
          path: 'question',
          name: 'Question',
          component: () => import('@/views/question/index.vue'),
          meta: {
            keepAlive: true,
            requireAuth: false,
          }
        },
        {
          path: 'question/bank/:id',
          name: 'QuestionBank',
          props: true,
          component: () => import('@/views/question/bank/[id].vue'),
          meta: {
            keepAlive: true,
            requireAuth: false,
          }
        },
        {
          path: 'question/detail/:id',
          name: 'QuestionDetail',
          props: true,
          component: () => import('@/views/question/detail/[id].vue'),
          meta: {
            keepAlive: true,
            requireAuth: true,
          }
        },
        {
          path: 'practice',
          name: 'practice',
          component: () => import('@/views/practice/index.vue'),
          meta: {
            keepAlive: true,
            requireAuth: true,
          }
        },
        {
          path: 'profile',
          name: 'Profile',
          component: () => import('@/views/profile/index.vue'),
          meta: {
            keepAlive: true,
            requireAuth: true,
          }
        }
      ],
    },
    {
      path: '/auth',
      name: 'Auth',
      component: () => import('@/layouts/auth.vue'),
      children: [
        {
          path: 'login',
          name: 'Login Or Register',
          component: () => import('@/views/auth/login.vue')
        },
        {
          path: 'register', 
          name: 'Register',
          component: () => import('@/views/auth/register.vue')
        }
      ]
    }
  ],
})

export default router
