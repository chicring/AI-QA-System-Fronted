<template>
    <v-btn color="warning" variant="flat" size="small" rounded="md" @click="openDialog">
        <IconPencil></IconPencil>编辑
    </v-btn>
    
    <v-dialog width="1000" v-model="dialog">
        <v-card>
            <v-card-title>
                <span>编辑标签</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text v-if="editableTagItem">
                <ConfigItem :config="{key: 'tagName', label: '标签名称', type: 'string', description: '输入标签名称'}" v-model:model-value="editableTagItem.tagName" />
                <ConfigItem :config="{key: 'categoryId', label: '所属分类', type: 'string', description: '选择所属分类'}" v-model:model-value="editableTagItem.categoryId" />
                <ConfigItem :config="{key: 'sortNum', label: '排序', type: 'number', description: '输入排序'}" v-model:model-value="editableTagItem.sortNum" />
                
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
import { IconPencil } from '@tabler/icons-vue';
import { ref } from 'vue';
import { updateTag } from '@/api';

// 定义 props 接口
const props = defineProps<{
    modelValue: any; // 使用 any 类型，实际使用时应该替换为具体的 TagItem 类型
}>();

// 定义事件
const emit = defineEmits<{
    (e: 'save', item: any): void;
    (e: 'update:modelValue', value: any): void;
}>();

// 内部状态控制对话框显示
const dialog = ref(false);
const loading = ref(false);
const errorMessage = ref('');

// 可编辑的标签数据副本
const editableTagItem = ref<any | null>(null);

// 打开对话框并深拷贝数据
const openDialog = () => {
    console.log(props.modelValue)
    if (props.modelValue) {
        editableTagItem.value = JSON.parse(JSON.stringify(props.modelValue));
        dialog.value = true;
        errorMessage.value = '';
    }
};

const handleCancel = () => {
    dialog.value = false;
    // 重置编辑状态
    editableTagItem.value = null;
    errorMessage.value = '';
};

const handleSave = async () => {
    if (!editableTagItem.value) return;
    
    // 验证表单
    if (!editableTagItem.value.tagName?.trim()) {
        errorMessage.value = '标签名称不能为空';
        return;
    }
    
    // 准备数据 - 确保类型正确
    const tagData = {
        id: editableTagItem.value.id,
        tagName: editableTagItem.value.tagName.trim(),
        categoryId: editableTagItem.value.categoryId ? parseInt(editableTagItem.value.categoryId) : undefined,
        sortNum: editableTagItem.value.sortNum ? parseInt(editableTagItem.value.sortNum) : undefined
    };
    
    loading.value = true;
    errorMessage.value = '';
    
    try {
        // 调用API更新标签
        const response = await updateTag(tagData);
        
        // 发出保存成功事件，让父组件刷新列表
        emit('save', response.data);
        
        // 关闭对话框并重置表单
        dialog.value = false;
        editableTagItem.value = null;
    } catch (error: any) {
        // 处理错误
        console.error('更新标签失败:', error);
        errorMessage.value = error.msg || '更新失败，请重试';
    } finally {
        loading.value = false;
    }
};
</script> 