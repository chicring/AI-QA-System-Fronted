<template>
    <v-btn color="primary" variant="flat" rounded="md" @click="dialog = true">
        <IconPlus></IconPlus>添加题目
    </v-btn>

    <v-dialog width="1000" v-model="dialog">
        <v-card>
            <v-card-title>
                <span>添加题</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <ConfigItem :config="{key: 'questionTitle', label: '题目标题', type: 'string', description: '输入题目标题'}" v-model:model-value="questionItem.questionTitle" />
                <ConfigItem :config="{key: 'questionTips', label: '题目提示', type: 'text', description: '输入题目提示'}" v-model:model-value="questionItem.questionTips" />
                
                <ConfigItem :config="{key: 'categoryId', label: '所属分类', type: 'number', description: '选择所属分类'}">
                    <CategoryIdSelect v-model:categoryId="questionItem.categoryId" />
                </ConfigItem>
                
                <!-- 标签多选 -->
                <ConfigItem :config="{key: 'tagIds', label: '标签', type: 'number', description: '选择标签'}">
                    <TagIdsSelect v-model:tagIds="questionItem.tagIds" />
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

                <ConfigItem :config="{key: 'answers', label: '参考答案', type: 'text', description: '输入参考答案'}" v-model:model-value="questionItem.answers" />
                
                <v-alert
                    v-if="errorMessage"
                    type="error"
                    variant="tonal"
                    class="mt-4"
                >
                    {{ errorMessage }}
                </v-alert>
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
import { IconPlus } from '@tabler/icons-vue';
import { ref, computed, onMounted, watch } from 'vue';
import { createQuestion, getTagList } from '@/api';
import type { QuestionCreateRequest, TagItem, PageResponse } from '@/api/types';
import TagIdsSelect from '../select/TagIdsSelect.vue';
import CategoryIdSelect from '../select/CategoryIdSelect.vue';
// 难度级别
const difficultyLevels = [
    { title: '简单', value: 1 },
    { title: '中等', value: 2 },
    { title: '困难', value: 3 }
];


// 问题表单数据
const questionItem = ref<QuestionCreateRequest>({
    questionTitle: '',
    questionTips: '',
    difficulty: 2, // 默认中等难度
    categoryId: 0,
    tagIds: [],
    answers: ''
});

// 对话框状态
const dialog = ref(false);
const loading = ref(false);
const errorMessage = ref('');

// 重置表单
const resetForm = () => {
    questionItem.value = {
        questionTitle: '',
        questionTips: '',
        difficulty: 2,
        categoryId: 0,
        tagIds: [] as number[],
        answers: ''
    };
    errorMessage.value = '';
};

// 取消
const handleCancel = () => {
    dialog.value = false;
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
    
    if (!questionItem.value.categoryId) {
        errorMessage.value = '请选择所属分类';
        return;
    }
    
    if (!questionItem.value.answers.trim()) {
        errorMessage.value = '请提供参考答案';
        return;
    }
    
    loading.value = true;
    errorMessage.value = '';
    
    try {
        // 调用API创建问题
        const response = await createQuestion(questionItem.value);
        
        // 发出保存成功事件
        emit('save', response.data);
        
        // 关闭对话框并重置表单
        dialog.value = false;
        resetForm();
    } catch (error: any) {
        console.error('创建问题失败:', error);
        errorMessage.value = error.msg || '创建失败，请重试';
    } finally {
        loading.value = false;
    }
};

// 定义事件
const emit = defineEmits<{
    (e: 'save', item: any): void;
}>();

</script> 