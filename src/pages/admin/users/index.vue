<template>
  <div>
    <v-card flat>
      <v-card-title class="d-flex">
        <v-row>
          <v-col cols="12" md="3">
            <UserSelect v-model:username="queryParams.username" />
          </v-col>
          <v-col cols="12" md="3">
            <v-btn
              color="primary"
              variant="flat"
              rounded="md"
              @click="fetchUsers"
              :loading="loading"
              class="mr-2"
            >
              搜索
            </v-btn>
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
          :items="users"
          :items-length="total"
          :loading="loading"
          v-model:items-per-page="queryParams.size"
          v-model:page="queryParams.page"
          :items-per-page-options="[10, 20, 50, 100]"
          item-key="username"
          density="comfortable"
          hover
          loading-text="加载中..."
          no-data-text="暂无数据"
          no-results-text="暂无数据"
          items-per-page-text="每页条数"
          @update:options="fetchUsers"
          style="height: calc(100vh - 11rem - env(safe-area-inset-bottom))"
        >
          <template #item.avatar="{ value }">
            <v-avatar size="small">
              <v-img :src="value" />
            </v-avatar>
          </template>
          <template #item.sex="{ value }">
            <v-chip
              :color="value === 1 ? 'primary' : 'pink'"
              size="small"
              variant="flat"
              class="font-weight-medium"
            >
              {{ value === 1 ? '男' : '女' }}
            </v-chip>
          </template>
          <template #item.status="{ value, item }">
            <v-chip
              :color="value === '1' ? 'success' : 'error'"
              size="small"
              variant="flat"
              class="font-weight-medium"
              @click="handleStatusToggle(item)"
              style="cursor: pointer"
            >
              {{ value === '1' ? '启用' : '禁用' }}
            </v-chip>
          </template>
          <template #item.actions="{ item }">
            <v-btn
              size="small"
              color="primary"
              variant="text"
              @click="handleEdit(item)"
            >
              编辑
            </v-btn>
            <v-btn
              size="small"
              color="error"
              variant="text"
              @click="handleDelete(item)"
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
import { ref, onMounted } from 'vue';
import { getUserList, toggleUserStatus } from '@/api/user';
import type { UserItem, UserPageQueryVO, UserPageResponse } from '@/api/types/user';
import { useToast } from 'vue-toast-notification';
import UserSelect from '@/components/shared/UserSelect.vue';
const toast = useToast();

// 表格头部定义
const headers = [
  {
    title: '头像',
    key: 'avatar',
    sortable: false,
  },
  {
    title: '用户名',
    key: 'username',
    sortable: false,
  },
  {
    title: '昵称',
    key: 'nickname',
    sortable: false,
  },
  {
    title: '邮箱',
    key: 'email',
    sortable: false,
  },
  {
    title: '手机号',
    key: 'mobile',
    sortable: false,
  },
  {
    title: '性别',
    key: 'sex',
    sortable: false,
  },
  {
    title: '角色',
    key: 'role',
    sortable: false,
  },
  {
    title: '状态',
    key: 'status',
    sortable: false,
  },
  {
    title: '登录IP',
    key: 'loginIp',
    sortable: false,
  },
  {
    title: '已用配额',
    key: 'used_quota',
    sortable: false,
  },
  {
    title: '请求次数',
    key: 'requestCount',
    sortable: false,
  },
  {
    title: '操作',
    key: 'actions',
    sortable: false,
  },
];

// 查询参数
const queryParams = ref<UserPageQueryVO>({
  page: 1,
  size: 10,
  username: undefined
});

// 用户列表
const users = ref<UserItem[]>([]);
const total = ref(0);
const loading = ref(false);

// 获取用户列表
const fetchUsers = async (options?: any) => {
  loading.value = true;
  try {
    if (options) {
      queryParams.value.page = options.page
      queryParams.value.size = options.itemsPerPage
    }
    const res = await getUserList(queryParams.value);
    if (res.code === 200 && res.data) {
      users.value = res.data.data;
      total.value = res.data.total;
    }
  } catch (error) {
    console.error('获取用户列表失败', error);
  } finally {
    loading.value = false;
  }
};

// 编辑用户
const handleEdit = (item: UserItem) => {
  // TODO: 实现编辑用户功能
  console.log('编辑用户', item);
};

// 删除用户
const handleDelete = (item: UserItem) => {
  if (confirm('确定要删除这个用户吗？')) {
    // TODO: 实现删除用户功能
    console.log('删除用户', item);
  }
};

// 重置筛选条件
const resetFilters = () => {
  queryParams.value = {
    page: 1,
    size: queryParams.value.size,
    username: undefined
  };
  fetchUsers();
};

// 切换用户状态
const handleStatusToggle = async (item: UserItem) => {
  try {
    const newStatus = item.status === '1' ? '2' : '1';
    const res = await toggleUserStatus({
      username: item.username,
      status: newStatus
    });
    if (res.code === 0) {
      item.status = newStatus;
      toast.success(`已${newStatus === '1' ? '启用' : '禁用'}用户: ${item.username}`, { position: 'top' });
    }
  } catch (error) {
    console.error('切换用户状态失败', error);
    toast.error('切换用户状态失败', { position: 'top' });
  }
};

onMounted(() => {
  fetchUsers();
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