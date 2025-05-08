<script setup lang="ts">
import { ref, onBeforeMount, onBeforeUnmount } from 'vue';
import type { NoticeItem } from '@/api';
import { markAllNoticesRead, getNoticeList } from '@/api';
import { IconBell, IconMailCheck, IconDeviceLaptop, IconBellRinging, IconBellOff } from '@tabler/icons-vue';

// 通知菜单开关
const appsMenu = ref(false);
// 是否有新消息
const hasNewMessage = ref(false);
// 通知列表
const notificationList = ref<NoticeItem[]>([]);
// 定时器ID
let notificationTimer: number | null = null;

// 获取通知图标
function getNotificationIcon(type: number) {
  switch (type) {
    case 1: // 系统通知
      return IconDeviceLaptop;
    case 2: // 其他通知
      return IconBellRinging;
    default:
      return IconBell;
  }
}

// 获取通知列表
async function fetchNotifications() {
  try {
    const response = await getNoticeList({ pageNum: 1, pageSize: 10, status: 1 });
    if (response.code === 200 && response.data) {
      notificationList.value = response.data.records || [];
      // 检查是否有未读通知
      hasNewMessage.value = notificationList.value.some(notice => notice.status === 1);
    }
  } catch (error) {
    console.error('获取通知列表失败', error);
  }
}

// 标记所有通知为已读
async function markAllAsRead() {
  try {
    const response = await markAllNoticesRead();
    if (response.code === 200) {
      // 更新通知状态
      notificationList.value.forEach(notice => {
        notice.status = 2; // 标记为已读
      });
      hasNewMessage.value = false;
    }
  } catch (error) {
    console.error('标记已读失败', error);
  }
}

// 开始定时获取通知
function startNotificationTimer() {
  // 立即获取一次通知
  fetchNotifications();
  
  // 设置定时器，每分钟获取一次通知
  notificationTimer = window.setInterval(() => {
    fetchNotifications();
  }, 60000); // 60秒
}

// 页面加载时，加载通知数据
onBeforeMount(() => {
  startNotificationTimer();
});

// 页面卸载时，清除定时器
onBeforeUnmount(() => {
  if (notificationTimer !== null) {
    clearInterval(notificationTimer);
    notificationTimer = null;
  }
});
</script>

<template>
  <v-menu
    v-model="appsMenu"
    width="400"
    transition="scale-transition"
    close-on-content-click
    class="notification-menu"
    scrim
  >
    <!-- Menu Activator -->
    <template #activator="{ props }">
      <v-badge v-if="hasNewMessage" dot color="error" :offset-x="5" :offset-y="5" v-bind="props">
        <v-btn icon variant="text" class="opacity-60">
          <IconBell stroke-width="2" size="24" />
        </v-btn>
      </v-badge>
      <v-btn v-else icon variant="text" v-bind="props" class="opacity-70">
        <IconBell stroke-width="2" size="24" />
      </v-btn>
    </template>
    
    <!-- Menu Content -->
    <v-card>
      <v-card-item class="py-3">
        <v-card-title>通知中心</v-card-title>
        <template #append>
          <v-tooltip text="设为已读">
            <template #activator="{ props }">
              <v-btn
                icon
                variant="text"
                v-bind="props"
                @click="markAllAsRead"
              >
                <IconMailCheck stroke-width="2" size="20" />
              </v-btn>
            </template>
          </v-tooltip>
        </template>
      </v-card-item>
      <v-divider />
      <div v-if="notificationList.length > 0">
        <v-list-item v-for="(item, i) in notificationList" :key="item.id" lines="two" class="mb-1">
          <template #prepend>
            <v-avatar rounded>
              <component :is="getNotificationIcon(item.type)" stroke-width="2" size="24" />
            </v-avatar>
          </template>
          <div>
            <div class="text-body-1 text-high-emphasis break-words whitespace-break-spaces">
              {{ item.title }}
            </div>
            <div class="text-caption mt-1.5">
              {{ item.content }}
            </div>
            <div class="text-sm text-primary mt-1.5">
              {{ item.createTime }}
            </div>
          </div>
          <template #append>
            <v-chip v-if="item.status === 1" size="small" text="未读" color="warning" variant="tonal" />
            <v-chip v-else size="small" text="已读" color="success" variant="tonal" />
          </template>
        </v-list-item>
      </div>
      <div v-else class="py-8 text-center">
        <IconBellOff stroke-width="2" size="40" class="mb-3" />
        <div>暂无通知</div>
      </div>
    </v-card>
  </v-menu>
</template>

<style scoped>
.notification-menu {
  max-height: 80vh;
}

.break-words {
  word-break: break-word;
}

.whitespace-break-spaces {
  white-space: break-spaces;
}

.text-sm {
  font-size: 0.875rem;
}
</style>
