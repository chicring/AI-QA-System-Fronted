<template>
    <v-btn icon rounded="sm">
        <IconTagStarred :size="20" stroke="2" />
        <v-menu activator="parent">
            <v-list nav rounded="md" elevation="1" color="#fafafa" min-width="100">
                <v-list-item
                    v-for="(item, index) in toggleStatusItems"
                    :key="index"
                    :value="index"
                    @click="toggleStatus(item.value)"
                >
                    <v-list-item-title>
                        {{ item.label }}
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-btn>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IconTagStarred } from '@tabler/icons-vue';
import { toggleStatusItems } from '@/types/question/index';
import { markHistory } from '@/api';
import { useToast } from 'vue-toast-notification';

const props = defineProps({
    questionId: {
        type: Number,
        required: true
    }
});

const toast = useToast();

function toggleStatus(status: number) {
    try {
        // 使用markHistory API来更新问题状态
        markHistory({
            questionId: props.questionId,
            status: status
        }).then(() => {
            console.log('问题状态已更新');
            toast.success('问题状态已更新成功', { position: 'top' });
        });
    } catch (error) {
        console.error('更新问题状态失败:', error);
        toast.error('更新问题状态失败', { position: 'top' });
    }
}
</script>