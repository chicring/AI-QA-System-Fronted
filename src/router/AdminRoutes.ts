const AdminRoutes = {
  path: '/admin',
  meta: {
    requiresAuth: true,
    requiresAdmin: true
  },
  component: () => import('@/layouts/admin/AdminLayout.vue'),
  children: [
    {
      name: 'admin-dashboard',
      path: '',
      component: () => import('@/pages/admin/dashboard/index.vue'),
      meta: {
        keepAlive: true,
        requireAuth: true,
        requiresAdmin: true
      }
    },
    {
      name: 'question-bank-management',
      path: 'question-bank',
      component: () => import('@/pages/admin/question-bank/index.vue'),
      meta: {
        keepAlive: true,
        requireAuth: true,
        requiresAdmin: true
      }
    },
    {
      name: 'user-management',
      path: 'users',
      component: () => import('@/pages/admin/users/index.vue'),
      meta: {
        keepAlive: true,
        requireAuth: true,
        requiresAdmin: true
      }
    },
    {
      name: 'system-logs',
      path: 'logs',
      component: () => import('@/pages/admin/logs/index.vue'),
      meta: {
        keepAlive: true,
        requireAuth: true,
        requiresAdmin: true
      }
    },
    {
      name: 'notifications-management',
      path: 'notifications',
      component: () => import('@/pages/admin/notifications/index.vue'),
      meta: {
        keepAlive: true,
        requireAuth: true,
        requiresAdmin: true
      }
    },
    {
      name: 'system-settings',
      path: 'settings',
      component: () => import('@/pages/admin/settings/index.vue'),
      meta: {
        keepAlive: true,
        requireAuth: true,
        requiresAdmin: true
      }
    }
  ]
};

export default AdminRoutes;
