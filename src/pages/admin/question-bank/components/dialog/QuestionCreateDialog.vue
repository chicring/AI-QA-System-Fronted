<template>
    <v-btn color="primary" variant="flat" rounded="md" @click="dialog = true">
        <IconPlus></IconPlus>添加题目
    </v-btn>

    <QuestionFormDialog
        v-model:dialog="dialog"
        mode="create"
        @save="handleSave"
    />
</template>

<script setup lang="ts">
import { IconPlus } from '@tabler/icons-vue';
import { ref } from 'vue';
import QuestionFormDialog from './QuestionFormDialog.vue';

// 对话框状态
const dialog = ref(false);

// 定义事件
const emit = defineEmits<{
    (e: 'save', item: any): void;
}>();

// 保存成功处理
const handleSave = (data: any) => {
    emit('save', data);
};
</script> 