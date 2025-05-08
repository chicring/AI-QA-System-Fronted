<template>
  <v-select
    v-model="selectedInterviewer"
    :items="interviewers"
    placeholder="默认"
    item-title="label"
    item-value="value"
    density="compact"
    variant="plain"
    flat
    rounded="md"
    :loading="loading"
    return-object
    hide-details
    min-width="100"
    :list-props="{
      class: 'pa-1 ma-0',
    }"
    class="hide-select-arrow"
  >
    <template #prepend-item>
      <v-btn class="mb-2" block variant="text" rounded="md" active color="error"
        @click="handleClearChat"
      >
        <IconTrash size="20" stroke="2"/>
        清空对话
      </v-btn>
    </template>

    <template #selection="{ item }">
      <v-avatar size="small" class="mx-2">
        <v-img :src="item.raw.avatar" />
      </v-avatar>
      <span class="text-body-2">{{ item.raw.label }}</span>
    </template>
    <template #item="{ props, item }">
      <v-list-item v-bind="props" density="compact" rounded="sm">
        <template #title>
          <v-avatar size="small" class="mr-2">
            <v-img :src="item.raw.avatar" />
          </v-avatar>
          <span class="text-body-2">{{ item.raw.label }}</span>
        </template>
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
import { ref, computed } from 'vue';
import { IconTrash } from '@tabler/icons-vue';
import { useConfirm } from 'vuetify-use-dialog';
import { useChatStore } from '@/stores/chat';

const chatStore = useChatStore();
const createConfirm = useConfirm();

interface Interviewer { 
  label: string;
  value: string;
  avatar: string;
}

// 定义props
const props = withDefaults(defineProps<{
  value?: string | null
}>(), {
  value: null
});

// 定义emit
const emit = defineEmits<{
  (e: 'update:value', value: string | null): void
}>();

// 本地状态
const loading = ref(false);
const selectedInterviewer = computed({
  get: () => {
    // 如果没有选择面试官，返回null
    if (props.value === null || props.value === undefined) return null;
    
    // 根据value找到对应的Interviewer对象
    return interviewers.value.find(interviewer => interviewer.value === props.value) || null;
  },
  set: (value) => {
    // 提取value值，如果是对象的话
    const val = value && typeof value === 'object' ? value.value : value;
    emit('update:value', val);
  }
});

const interviewers = ref<Interviewer[]>([
  {
    label: '模拟练习',
    value: 'zhangsan',
    avatar: 'https://cdn.linux.do/user_avatar/linux.do/chicring/96/305989_2.png'
  },
  {
    label: '题库问答',
    value: 'lisi',
    avatar: 'https://cdn.linux.do/user_avatar/linux.do/chicring/96/305989_2.png'
  }
]);

// 处理清空对话
const handleClearChat = async () => {
  const isConfirmed = await createConfirm({
    title: '清空对话',
    content: '确定要清空对话吗？',
    confirmationText: '确定',
    cancellationText: '取消',
    dialogProps: {
      maxWidth: 350,
    },
    cardProps: {
      rounded: 'md',
      elevation: 0,
    },
  });

  if (isConfirmed) {
    chatStore.clearMessages();
  }
};
</script>

<style scoped>
.hide-select-arrow :deep(.v-field__append-inner) {
  display: none;
}
</style>