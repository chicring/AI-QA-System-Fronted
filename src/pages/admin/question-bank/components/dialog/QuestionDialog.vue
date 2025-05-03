<template>
    <v-dialog v-model="dialogModel" width="800">
        <v-card>
            <v-card-title class="d-flex justify-space-between align-center">
                <span>题目详情</span>
                <v-btn icon variant="text" @click="dialogModel = false">
                    <IconX />
                </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            
            <v-card-text v-if="loading">
                <div class="d-flex justify-center align-center" style="height: 200px">
                    <v-progress-circular indeterminate></v-progress-circular>
                </div>
            </v-card-text>
            
            <template v-else>
                <!-- 题目信息 -->
                <v-card-text>
                    <v-sheet class="mb-4 pa-4 rounded-lg" color="#f8fafc">
                        <div class="text-h6 mb-2">{{ question.id }}. {{ question.questionTitle }}</div>
                        <div class="d-flex flex-wrap ga-2 mb-2">
                            <DifficultyChip :difficulty="question.difficulty" />
                            <v-chip v-for="tag in question.tagNames" :key="tag" size="small" rounded="sm">{{ tag }}</v-chip>
                        </div>
                        <div class="d-flex align-center text-medium-emphasis">
                            <IconFlame :size="16" />
                            <span class="ml-1">{{ question.viewCount }}</span>
                            <span class="ml-3">{{ question.createTime }}</span>
                        </div>
                    </v-sheet>

                    <!-- 选项卡 -->
                    <v-tabs v-model="tab" density="compact" color="primary">
                        <v-tab value="0">题目提示</v-tab>
                        <v-tab value="1">参考答案</v-tab>
                    </v-tabs>
                    
                    <v-window v-model="tab" class="mt-2">
                        <v-window-item value="0">
                            <v-sheet class="pa-4 rounded-lg" color="#f8fafc">
                                <MarkdownViewer v-if="question.questionTips" :content="question.questionTips" />
                                <div v-else class="text-center text-body-1 text-medium-emphasis">
                                    暂无提示
                                </div>
                            </v-sheet>
                        </v-window-item>
                        <v-window-item value="1">
                            <v-sheet class="pa-4 rounded-lg" color="#f8fafc">
                                <div v-if="question.answer">{{ question.answer }}</div>
                                <div v-else class="text-center text-body-1 text-medium-emphasis">
                                    暂无答案
                                </div>
                            </v-sheet>
                        </v-window-item>
                    </v-window>
                </v-card-text>
            </template>
            
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" variant="text" rounded="md" @click="dialogModel = false">关闭</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { IconX, IconFlame } from '@tabler/icons-vue';
import { getQuestionList } from '@/api';
import type { QuestionItem } from '@/api';
import DifficultyChip from '@/components/question/DifficultyChip.vue';
import MarkdownViewer from '@/components/doc/MarkdownViewer.vue';

const props = defineProps<{
    dialog: boolean;
    questionId: number;
}>();

const emit = defineEmits<{
    (e: 'update:dialog', value: boolean): void;
}>();

// 对话框状态
const dialogModel = computed({
    get: () => props.dialog,
    set: (value) => emit('update:dialog', value)
});

// 选项卡控制
const tab = ref('0');

// 问题数据
const question = ref<QuestionItem>({
    id: 0,
    questionTitle: '',
    questionTips: '',
    difficulty: 0,
    answer: '',
    categoryName: '',
    tagNames: [],
    viewCount: 0,
    createTime: undefined
});

const loading = ref(false);

// 获取问题详情 - 临时使用列表接口
const fetchQuestionDetail = async () => {
    if (!props.questionId) return;
    
    loading.value = true;
    try {
        // 由于没有直接的问题详情接口，我们临时使用列表接口查询单个问题
        const res = await getQuestionList({
            pageNum: 1,
            pageSize: 10,
            // 使用id作为筛选条件
            // 注意：这是一个临时解决方案，实际项目中应有专门的问题详情接口
        });
        
        if (res.code === 200 && res.data && res.data.records.length > 0) {
            // 找到匹配的问题
            const found = res.data.records.find(q => q.id === props.questionId);
            if (found) {
                question.value = found;
            }
        }
    } catch (error) {
        console.error('获取题目详情失败:', error);
    } finally {
        loading.value = false;
    }
};

// 监听问题ID变化，重新获取详情
watch(() => props.questionId, (newId) => {
    if (newId && props.dialog) {
        fetchQuestionDetail();
    }
});

// 监听对话框打开状态，打开时获取详情
watch(() => props.dialog, (isOpen) => {
    if (isOpen && props.questionId) {
        fetchQuestionDetail();
    }
});
</script>

<style scoped>
.ga-2 {
    gap: 8px;
}
</style>
