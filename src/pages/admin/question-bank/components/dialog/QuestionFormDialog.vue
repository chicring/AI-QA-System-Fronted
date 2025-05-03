<template>
    <v-dialog width="1000" v-model="dialogModel">
        <v-card>
            <v-card-title>
                <span>{{ isEditMode ? '编辑题目' : '添加题目' }}</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-progress-linear v-if="loading" indeterminate></v-progress-linear>
                
                <div v-else>
                    <ConfigItem :config="{key: 'questionTitle', label: '题目标题', type: 'string', description: '输入题目标题'}" v-model:model-value="questionItem.questionTitle" />
                    <ConfigItem :config="{key: 'questionTips', label: '题目提示', type: 'text', description: '输入题目提示'}" v-model:model-value="questionItem.questionTips" />
                    
                    <ConfigItem :config="{key: 'categoryName', label: '所属分类', type: 'string', description: '选择所属分类'}">
                        <CategorySelect v-model:categoryName="questionItem.categoryName" />
                    </ConfigItem>
                    
                    <!-- 标签多选 -->
                    <ConfigItem :config="{key: 'tagNames', label: '标签', type: 'string', description: '选择标签'}">
                        <TagsSelect v-model:tagNames="questionItem.tagNames" />
                    </ConfigItem>
                    
                    <ConfigItem :config="{key: 'difficulty', label: '难度级别', type: 'number', description: '选择难度级别'}">
                        <v-select
                            v-model="questionItem.difficulty"
                            :items="difficultyLevels"
                            item-title="title"
                            item-value="value"
                            density="compact"
                            variant="outlined"
                            hide-details
                            class="mb-3"
                        ></v-select>
                    </ConfigItem>

                    <ConfigItem :config="{key: 'answer', label: '参考答案', type: 'text', description: '输入参考答案'}" v-model:model-value="questionItem.answer" />
                    
                    <v-alert
                        v-if="errorMessage"
                        type="error"
                        variant="tonal"
                        class="mt-4"
                    >
                        {{ errorMessage }}
                    </v-alert>
                </div>
            </v-card-text>

            <v-divider></v-divider>
            <v-card-actions>
                <v-btn variant="text" rounded="md" @click="handleCancel" :disabled="loading">取消</v-btn>
                <v-btn color="primary" variant="text" rounded="md" @click="handleSave" :loading="loading" :disabled="loading">保存</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import ConfigItem from '@/components/shared/ConfigItem.vue';
import { ref, computed, watch } from 'vue';
import { saveQuestion, getQuestionById } from '@/api';
import type { SaveQuestionRequest, QuestionItem } from '@/api';
import TagsSelect from '../select/TagsSelect.vue';
import CategorySelect from '../select/CategorySelect.vue';

const props = defineProps<{
    dialog: boolean;
    mode: 'create' | 'edit';
    questionId?: number;
}>();

const emit = defineEmits<{
    (e: 'update:dialog', value: boolean): void;
    (e: 'save', item: any): void;
}>();

// 判断是否为编辑模式
const isEditMode = computed(() => props.mode === 'edit');

// 对话框状态
const dialogModel = computed({
    get: () => props.dialog,
    set: (value) => emit('update:dialog', value)
});

// 难度级别
const difficultyLevels = [
    { title: '简单', value: 1 },
    { title: '中等', value: 2 },
    { title: '困难', value: 3 }
];

// 问题表单数据
const questionItem = ref<SaveQuestionRequest>({
    questionTitle: '',
    questionTips: '',
    difficulty: 2, // 默认中等难度
    categoryName: '',
    tagNames: [] as string[],
    answer: ''
});

const loading = ref(false);
const errorMessage = ref('');

// 重置表单
const resetForm = () => {
    questionItem.value = {
        questionTitle: '',
        questionTips: '',
        difficulty: 2,
        categoryName: '',
        tagNames: [] as string[],
        answer: ''
    };
    errorMessage.value = '';
};

// 获取问题详情
const fetchQuestionDetail = async () => {
    if (!props.questionId || !isEditMode.value) return;
    
    loading.value = true;
    try {
        const response = await getQuestionById(props.questionId);
        if (response.code === 200 && response.data) {
            // 将获取的问题数据填充到表单
            const question = response.data;
            questionItem.value = {
                id: question.id,
                questionTitle: question.questionTitle,
                questionTips: question.questionTips,
                difficulty: question.difficulty,
                categoryName: question.categoryName,
                tagNames: question.tagNames || [],
                answer: question.answer
            };
        } else {
            errorMessage.value = '获取题目信息失败';
        }
    } catch (error: any) {
        console.error('获取题目详情失败:', error);
        errorMessage.value = error.msg || '获取题目信息失败，请重试';
    } finally {
        loading.value = false;
    }
};

// 取消
const handleCancel = () => {
    dialogModel.value = false;
    resetForm();
};

// 保存
const handleSave = async () => {
    // 表单验证
    if (!questionItem.value.questionTitle.trim()) {
        errorMessage.value = '题目标题不能为空';
        return;
    }
    
    if (!questionItem.value.questionTips.trim()) {
        errorMessage.value = '题目提示不能为空';
        return;
    }
    
    if (!questionItem.value.categoryName) {
        errorMessage.value = '请选择所属分类';
        return;
    }
    
    if (!questionItem.value.answer.trim()) {
        errorMessage.value = '请提供参考答案';
        return;
    }
    
    loading.value = true;
    errorMessage.value = '';
    
    try {
        // 调用API保存或更新问题
        const response = await saveQuestion(questionItem.value);
        
        // 发出保存成功事件
        emit('save', response.data);
        
        // 关闭对话框并重置表单
        dialogModel.value = false;
        resetForm();
    } catch (error: any) {
        console.error('保存问题失败:', error);
        errorMessage.value = error.msg || '保存失败，请重试';
    } finally {
        loading.value = false;
    }
};

// 监听对话框打开和问题ID变化
watch([() => props.dialog, () => props.questionId], ([isOpen, id]) => {
    if (isOpen) {
        if (isEditMode.value && id) {
            fetchQuestionDetail();
        } else {
            resetForm();
        }
    }
}, { immediate: true });
</script> 