import type { Component } from 'vue';
import {
  IconDashboard,
  IconHttpQue,
  IconUsersPlus,
  IconLogs,
  IconBell,
  IconSettings
} from '@tabler/icons-vue';


interface MenuItem {
  title: string;
  icon?: Component;
  to?: string;
  children?: MenuItem[];
  header?: boolean;
  divider?: boolean;
}

const sidebarItem: MenuItem[] = [
  {
    title: '控制台',
    icon: IconDashboard,
    to: '/admin'
  },
  {
    title: '题库管理',
    icon: IconHttpQue,
    to: '/admin/question-bank'
  },
  {
    title: '用户管理',
    icon: IconUsersPlus,
    to: '/admin/users'
  },
  {
    title: '系统日志',
    icon: IconLogs,
    to: '/admin/logs'
  },
  {
    title: '系统通知',
    icon: IconBell,
    to: '/admin/notifications'
  },
  {
    title: '系统配置',
    icon: IconSettings,
    to: '/admin/settings'
  }
];

export default sidebarItem;
