<template>
    <v-btn color="warning" variant="flat" size="small" rounded="md" @click="openDialog">
        <IconPencil></IconPencil>编辑
    </v-btn>
    
    <v-dialog width="1000" v-model="dialog">
        <v-card>
            <v-card-title>
                <span>编辑分类</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text v-if="editableCategoryItem">
                <ConfigItem :config="{key: 'categoryName', label: '分类名称', type: 'string', description: '输入分类名称'}" v-model:model-value="editableCategoryItem.categoryName" />
                <ConfigItem :config="{key: 'description', label: '分类描述', type: 'string', description: '输入分类描述'}" v-model:model-value="editableCategoryItem.description" />
                <ConfigItem :config="{key: 'imageUrl', label: '分类图片', type: 'string', description: '输入分类图片url'}" v-model:model-value="editableCategoryItem.imageUrl" />
                <!-- <ConfigItem :config="{key: 'parentCategoryId', label: '父分类', type: 'string', description: '选择父分类'}" :model-value="editableCategoryItem.parentCategoryId" /> -->
                <ConfigItem :config="{key: 'sortNum', label: '排序', type: 'number', description: '输入排序'}" v-model:model-value="editableCategoryItem.sortNum" />
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn variant="text" rounded="md" @click="handleCancel">取消</v-btn>
                <v-btn color="primary" variant="text" rounded="md" @click="handleSave" :loading="isSaving">保存</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    
    <v-snackbar v-model="snackbar.show" :color="snackbar.color">
      {{ snackbar.text }}
      <template v-slot:actions>
        <v-btn variant="text" @click="snackbar.show = false">关闭</v-btn>
      </template>
    </v-snackbar>
</template>

<script setup lang="ts">
import ConfigItem from '@/components/shared/ConfigItem.vue';
import { IconPencil } from '@tabler/icons-vue';
import { ref } from 'vue';
import type { CategoryItem, CategoryUpdateRequest } from '@/api/types';
import { updateCategory } from '@/api';

const props = defineProps<{
    modelValue: CategoryItem;
}>();

const emit = defineEmits<{
    (e: 'save', item: CategoryItem): void;
}>();

// 内部状态控制对话框显示
const dialog = ref(false);
const isSaving = ref(false);

// 可编辑的分类数据副本
const editableCategoryItem = ref<CategoryItem | null>(null);

// 提示信息
const snackbar = ref({
    show: false,
    text: '',
    color: 'success'
});

// 打开对话框并深拷贝数据
const openDialog = () => {
    if (props.modelValue) {
        editableCategoryItem.value = JSON.parse(JSON.stringify(props.modelValue));
        dialog.value = true;
    }
};

const handleCancel = () => {
    dialog.value = false;
    // 重置编辑状态
    editableCategoryItem.value = null;
};

const handleSave = async () => {
    if (editableCategoryItem.value) {
        isSaving.value = true;
        try {
            // 准备API请求数据，注意Description字段首字母大写
            const updateData: CategoryUpdateRequest = {
                id: editableCategoryItem.value.id,
                categoryName: editableCategoryItem.value.categoryName,
                description: editableCategoryItem.value.description, // 注意这里的字段名转换
                categoryLevel: editableCategoryItem.value.categoryLevel,
                parentCategoryId: editableCategoryItem.value.parentCategoryId,
                sortNum: editableCategoryItem.value.sortNum,
                imageUrl: editableCategoryItem.value.imageUrl
            };
            
            // 调用API更新分类
            const response = await updateCategory(updateData);
            
            if (response.code === 200) {
                // 显示成功消息
                snackbar.value = {
                    show: true,
                    text: '分类更新成功',
                    color: 'success'
                };
                
                // 将更新后的数据传递给父组件
                emit('save', editableCategoryItem.value);
                
                // 关闭对话框
                dialog.value = false;
                // 重置编辑状态
                editableCategoryItem.value = null;
            } else {
                throw new Error(response.msg || '更新失败');
            }
        } catch (error) {
            // 显示错误消息
            snackbar.value = {
                show: true,
                text: error instanceof Error ? error.message : '更新分类时出错',
                color: 'error'
            };
        } finally {
            isSaving.value = false;
        }
    }
};
</script> 