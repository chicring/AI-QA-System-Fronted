<template>
    <v-sheet rounded="md" color="#f8fafc" class="pa-4">
        <v-progress-circular v-if="loading" indeterminate></v-progress-circular>
        <div v-else-if="answerList.questionAnswers.length === 0" class="text-center text-body-1 text-medium-emphasis">
            暂无答案
        </div>
        <MarkdownViewer v-else :content="answerList.questionAnswers[0]" />
    </v-sheet>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getQuestionAnswerList } from '@/api/question';
import type { QuestionAnswerItem } from '@/api/types/index';
import MarkdownViewer from '@/components/doc/MarkdownViewer.vue';

const props = defineProps<{
    questionId: number;
}>();

const loading = ref(true);
const answerList = ref<QuestionAnswerItem>({
    questionId: 0,
    questionAnswers: [] as string[],
})

const getAnswerList = async () => {
    try {
        const res = await getQuestionAnswerList(props.questionId);
        answerList.value = res.data;
    } catch (error) {
        console.error('获取答案列表失败:', error);
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    getAnswerList();
})
</script>

<style scoped>

</style>
