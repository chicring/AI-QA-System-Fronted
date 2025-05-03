<template>
    <QuestionFormDialog
        v-model:dialog="dialogModel"
        mode="edit"
        :question-id="questionId"
        @save="handleSave"
    />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import QuestionFormDialog from './QuestionFormDialog.vue';

const props = defineProps<{
    dialog: boolean;
    questionId: number;
}>();

const emit = defineEmits<{
    (e: 'update:dialog', value: boolean): void;
    (e: 'save', item: any): void;
}>();

// 对话框状态
const dialogModel = computed({
    get: () => props.dialog,
    set: (value) => emit('update:dialog', value)
});

// 保存成功后触发事件
const handleSave = (data: any) => {
    emit('save', data);
};
</script> 