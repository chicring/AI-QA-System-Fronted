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
import { updateQuestionStatus } from '@/api';

const props =  defineProps({
    questionId: {
        type: String,
        required: true
    }
});

function toggleStatus(value: number) {
    // 切换状态
    updateQuestionStatus(props.questionId, value).then(() => {
    
    });
}
</script>