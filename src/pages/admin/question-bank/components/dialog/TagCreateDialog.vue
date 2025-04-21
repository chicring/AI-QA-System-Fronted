<template>
    <v-btn color="primary" variant="flat" rounded="md" @click="dialog = true">
        <IconPlus></IconPlus>添加标签
    </v-btn>

    <v-dialog width="1000" v-model="dialog">
        <v-card>
            <v-card-title>
                <span>添加标签</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <ConfigItem :config="{key: 'tagName', label: '标签名称', type: 'string', description: '输入标签名称'}" v-model:model-value="tagItem.tagName" />
                <ConfigItem :config="{key: 'categoryId', label: '所属分类', type: 'string', description: '选择所属分类'}">
                    <CategoryIdSelect v-model:categoryId="tagItem.categoryId" />
                </ConfigItem>
                
                
                <ConfigItem :config="{key: 'sortNum', label: '排序', type: 'number', description: '输入排序'}" v-model:model-value="tagItem.sortNum" />
                
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
import { ref } from 'vue';
import { addTag } from '@/api';
import CategoryIdSelect from '../select/CategoryIdSelect.vue';

const tagItem = ref({
    tagName: '',
    categoryId: '',
    sortNum: '0',
})

const dialog = ref(false)
const loading = ref(false)
const errorMessage = ref('')

const handleCancel = () => {
    dialog.value = false
    // 重置表单
    tagItem.value = {
        tagName: '',
        categoryId: '',
        sortNum: '0',
    }
}

const handleSave = async () => {
    // 验证表单
    if (!tagItem.value.tagName.trim()) {
        errorMessage.value = '标签名称不能为空'
        return
    }

    // 准备数据 - 确保类型正确
    const tagData = {
        tagName: tagItem.value.tagName.trim(),
        categoryId: tagItem.value.categoryId ? parseInt(tagItem.value.categoryId) : undefined,
        sortNum: tagItem.value.sortNum ? parseInt(tagItem.value.sortNum) : undefined
    }

    loading.value = true
    errorMessage.value = ''

    try {
        // 调用API保存标签
        const response = await addTag(tagData)
        
        // 发出保存成功事件，让父组件刷新列表
        emit('save', response.data)
        
        // 关闭对话框并重置表单
        dialog.value = false
        tagItem.value = {
            tagName: '',
            categoryId: '',
            sortNum: '',
        }
    } catch (error: any) {
        // 处理错误
        console.error('保存标签失败:', error)
        errorMessage.value = error.msg || '保存失败，请重试'
    } finally {
        loading.value = false
    }
}

// 定义事件
const emit = defineEmits<{
    (e: 'save', item: any): void;
}>();
</script>
