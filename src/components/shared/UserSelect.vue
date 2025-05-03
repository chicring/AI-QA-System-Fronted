<template>
    <v-select
        :model-value="selectedUser"
        @update:model-value="updateSelectedUser"
        :items="userOptions"
        item-title="nickname"
        item-value="username"
        label="选择用户"
        density="compact"
        variant="solo-filled"
        flat
        rounded="md"
        :loading="loading"
        return-object
        hide-details
    >
        <template #prepend-item>
            <v-text-field
                class="ma-2"
                v-model="params.username"
                label="搜索用户"
                variant="outlined"
                density="compact"
                @update:model-value="fetchUserOptions"
                hide-details
            ></v-text-field>
        </template>
        <template #item="{ props, item }">
            <v-list-item v-bind="props">
                <template #prepend>
                    <v-avatar size="small">
                        <v-img :src="item.raw.avatar" />
                    </v-avatar>
                </template>
                <v-list-item-subtitle class="text-body-1">{{ item.raw.username }}</v-list-item-subtitle>
            </v-list-item>
        </template>
        <template #no-data>
            <v-list-item>
                <v-list-item-title>
                    {{ loading ? '加载中...' : '无数据' }}
                </v-list-item-title>
            </v-list-item>
        </template>
    </v-select>
</template>

<script setup lang="ts">
import { getAdminUserList } from '@/api';
import type { UserListItem, AdminUserListQueryParams, AdminUserListResponse } from '@/api';
import { ref, computed, onMounted, watch } from 'vue';

// 定义props
const props = withDefaults(defineProps<{
    username?: string | null
}>(), {
    username: null
});

// 定义emit
const emit = defineEmits<{
    (e: 'update:username', value: string | null): void
}>();

// 本地状态
const loading = ref(false);
const selectedUser = computed({
    get: () => {
        // 如果没有选择用户，返回null
        if (props.username === null || props.username === undefined) return null;
        
        // 根据username找到对应的UserListItem对象
        return userOptions.value.find((user: UserListItem) => user.username === props.username) || null;
    },
    set: (value) => {
        // 提取username值，如果是对象的话
        const username = value && typeof value === 'object' ? value.username : value;
        emit('update:username', username);
    }
});

// 搜索参数
const params = ref<AdminUserListQueryParams>({
    pageNum: 1,
    pageSize: 20,
    username: undefined
});

// 用户选项列表
const userOptions = ref<UserListItem[]>([]);

// 更新选中的用户
const updateSelectedUser = (value: UserListItem | null) => {
    // 提取username值，如果是对象的话
    const username = value && typeof value === 'object' ? value.username : value;
    emit('update:username', username);
};

// 获取用户选项
const fetchUserOptions = async () => {
    loading.value = true;
    try {   
        const res = await getAdminUserList(params.value);
        if (res.code === 200 && res.data) {
            userOptions.value = res.data.records;
        }
    } catch (error) {
        console.error('获取用户列表失败:', error);
    } finally {
        loading.value = false;
    }
};

// 监听props.username变化，确保当username更新时选中状态也更新
watch(() => props.username, (newUsername) => {
    // 如果userOptions还没加载完，我们不需要做任何事
    if (userOptions.value.length === 0) return;
    
    // 确认选中项是最新的
    const currentSelectedUsername = selectedUser.value ? selectedUser.value.username : null;
    if (currentSelectedUsername !== newUsername) {
        // 这里不需要做任何事，计算属性会自动更新
        console.log('username已更新:', newUsername);
    }
}, { immediate: true });

// 初始加载用户
onMounted(() => {
    fetchUserOptions();
});
</script>
