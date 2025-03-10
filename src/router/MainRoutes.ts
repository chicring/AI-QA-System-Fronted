const MainRoutes = {
  path: '/',
  meta: {
    requiresAuth: true
  },
  component: () => import('@/layouts/full/FullLayout.vue'),
  children: [
    {
      name: 'home',
      path: '',
      component: () => import('@/pages/home/index.vue'),
      meta: {
        keepAlive: true,
        requireAuth: false,
      }
    },
    {
      name: 'question',
      path: 'question',
      component: () => import('@/pages/question/index.vue'),
      meta: {
        keepAlive: true,
        requireAuth: false,
      }
    },
    {
      name: 'Bank',
      path: 'question/bank',
      component: () => import('@/pages/question/bank/index.vue'),
      meta: {
        keepAlive: true,
        requireAuth: false,
      }
    },
    {
      path: 'question/bank/:id',
      name: 'QuestionBank',
      props: true,
      component: () => import('@/pages/question/bank/[id].vue'),
      meta: {
        keepAlive: true,
        requireAuth: false,
      }
    },
    {
      path: 'question/detail/:id',
      name: 'QuestionDetail',
      props: true,
      component: () => import('@/pages/question/detail/[id].vue'),
      meta: {
        keepAlive: true,
        requireAuth: true,
        // hiddenHeader: true,
      }
    },
    {
      name: 'practice',
      path: 'practice',
      component: () => import('@/pages/practice/index.vue'),
      meta: {
        keepAlive: true,
        requireAuth: false,
        // hiddenHeader: true,
      }
    },
    {
      name: 'profile',
      path: 'profile',
      component: () => import('@/pages/profile/index.vue'),
      meta: {
        keepAlive: true,
        requireAuth: false,
      }
    }
  ]
};

export default MainRoutes;
