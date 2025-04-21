<template>
  <div>
    <v-row>
      <v-col cols="12" md="4">
        <TotalMessage :total="total" />
      </v-col>

      <v-col cols="12" md="4">
        <StatusMessage :unread="unreadCount" :read="readCount" />
      </v-col>

      <v-col cols="12" md="4">
        <SendMessage />
      </v-col>
    </v-row>

    <v-card flat class="mt-4">
      <v-card-title class="d-flex">
        <v-row>
          <v-col cols="6" md="3">
            <v-select
              v-model="queryParams.status"
              :items="statusOptions"
              placeholder="状态"
              density="compact"
              variant="solo-filled"
              flat
              hide-details
              class="mr-2"
              rounded="md"
              :list-props="{
                rounded: 'md',
                elevation: 0,
                nav: true,
                density: 'compact',
              }"
              @update:model-value="fetchNotifications"
            ></v-select>
          </v-col>

          <v-col cols="6" md="3" align-self="center">
            <v-btn
              color="primary"
              variant="tonal"
              rounded="md"
              @click="resetFilters"
            >
              重置
            </v-btn>
          </v-col>
        </v-row>

      </v-card-title>
          <v-card-text>
            <v-data-table-server
              :headers="headers"
              :items="notifications"
              :items-length="total"
              :loading="loading"
              v-model:items-per-page="queryParams.pageSize"
              v-model:page="queryParams.pageNum"
              :items-per-page-options="[10, 20, 50, 100]"
              item-key="id"
              density="comfortable"
              hover
              loading-text="加载中..."
              no-data-text="暂无数据"
              no-results-text="暂无数据"
              items-per-page-text="每页条数"
              @update:options="fetchNotifications"
              style="height: calc(100vh - 20rem - env(safe-area-inset-bottom))"
            >
              <template #item.user="{ item }">
                <v-avatar size="small">
                  <v-img :src="item.avatar" />
                </v-avatar>
                <span>{{ item.username }}</span>
              </template>
              <template #item.title="{ value }">
                <span>{{ value }}</span>
              </template>
              <template #item.content="{ value }">
                <span>{{ value }}</span>
              </template>
              <template #item.status="{ value }">
                <v-chip
                  :color="value === 1 ? 'warning' : 'success'"
                  size="small"
                  variant="flat"
                  class="font-weight-medium"
                >
                  <IconMailCheck v-if="value === 1" size="16" class="mr-1" />
                  <IconMail v-else size="16" class="mr-1" />
                  {{ value === 1 ? '未读' : '已读' }}
                </v-chip>
              </template>
              <template #item.createTime="{ value }">
                <span>{{ value }}</span>
              </template>
              <template #item.actions="{ item }">
                <v-btn
                  size="small"
                  color="error"
                  variant="text"
                  @click="handleDelete(item.id)"
                >
                  删除
                </v-btn>
              </template>
            </v-data-table-server>
          </v-card-text>
        </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import TotalMessage from './components/TotalMessage.vue';
import StatusMessage from './components/StatusMessage.vue';
import SendMessage from './components/SendMessage.vue';
import { getAdminNotificationList, deleteNotification } from '@/api/notice';
import type { NotificationItem, AdminNotificationQueryVO } from '@/api/types/notice';
import { IconMailCheck, IconMail } from '@tabler/icons-vue';
// 表格头部定义
const headers = [
  {
    title: '用户',
    key: 'user',
    sortable: false,
  },
  {
    title: '标题',
    key: 'title',
    sortable: false,
  },
  {
    title: '内容',
    key: 'content',
    sortable: false,
  },
  {
    title: '状态',
    key: 'status',
    sortable: false,
  },
  {
    title: '发布时间',
    key: 'createTime',
    sortable: false,
  },
  {
    title: '操作',
    key: 'actions',
    sortable: false,
  },
];

// 查询参数
const queryParams = ref<AdminNotificationQueryVO>({
  pageNum: 1,
  pageSize: 10,
  status: null,
  type: null
});

// 通知列表
const notifications = ref<NotificationItem[]>([]);
const total = ref(0);
const loading = ref(false);

// 状态和类型选项
const statusOptions = [
  { title: '全部', value: null },
  { title: '未读', value: 1 },
  { title: '已读', value: 2 }
];

// 统计数据
const unreadCount = ref(0);
const readCount = ref(0);

// 获取通知列表
const fetchNotifications = async (options?: any) => {
  loading.value = true;
  try {
    if (options) {
      queryParams.value.pageNum = options.page
      queryParams.value.pageSize = options.itemsPerPage
    }
    const res = await getAdminNotificationList(queryParams.value);
    if (res.code === 200 && res.data) {
      notifications.value = res.data.data;
      total.value = res.data.total;
    }
  } catch (error) {
    console.error('获取通知列表失败', error);
  } finally {
    loading.value = false;
  }
};

// 删除通知
const handleDelete = async (id: number) => {
  if (confirm('确定要删除这条通知吗？')) {
    try {
      const res = await deleteNotification(id);
      if (res.code === 200) {
        fetchNotifications();
      }
    } catch (error) {
      console.error('删除通知失败', error);
    }
  }
};


// 重置筛选条件
const resetFilters = () => {
  queryParams.value = {
    pageNum: 1,
    pageSize: queryParams.value.pageSize,
    status: null,
    type: null
  };
  fetchNotifications();
};

onMounted(() => {
  fetchNotifications();
});
</script>

<style lang="scss">
.v-table th {
  white-space: nowrap;
}

.v-table__wrapper {
  border-radius: 0;
}
</style> 