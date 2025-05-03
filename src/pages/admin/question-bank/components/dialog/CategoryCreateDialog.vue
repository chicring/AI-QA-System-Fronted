<template>
    <v-btn color="primary" variant="flat" rounded="md" @click="dialog = true">
        <IconPlus></IconPlus>添加分类
    </v-btn>

    <v-dialog width="1000" v-model="dialog">
            <v-card>
                <v-card-title>
                    <span>添加分类</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <ConfigItem :config="{key: 'categoryName', label: '分类名称', type: 'string', description: '输入分类名称'}" v-model:model-value="categoryItem.categoryName" />
                    <ConfigItem :config="{key: 'description', label: '分类描述', type: 'string', description: '输入分类描述'}" v-model:model-value="categoryItem.description" />
                    <ConfigItem :config="{key: 'imageUrl', label: '分类图片', type: 'string', description: '输入分类图片url'}" v-model:model-value="categoryItem.imageUrl" />
                    <!-- <ConfigItem :config="{key: 'parentCategoryId', label: '父分类', type: 'string', description: '选择父分类'}" v-model:model-value="categoryItem.parentCategoryId" /> -->
                    <ConfigItem :config="{key: 'sortNum', label: '排序', type: 'number', description: '输入排序'}" v-model:model-value="categoryItem.sortNum" />
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
import { IconPlus } from '@tabler/icons-vue';
import { ref } from 'vue';
import { saveCategory } from '@/api';
import type { SaveCategoryRequest } from '@/api';

// 定义emit
const emit = defineEmits<{
    (e: 'created'): void;
}>();

// 分类表单数据
const categoryItem = ref<SaveCategoryRequest>({
    categoryName: '',
    description: '',
    imageUrl: '',
    categoryLevel: 1, // 默认为1级分类
    sortNum: 0,
});

// 控制对话框显示
const dialog = ref(false);

// 保存状态
const isSaving = ref(false);

// 提示信息
const snackbar = ref({
    show: false,
    text: '',
    color: 'success'
});

// 初始化表单数据
const initForm = () => {
    categoryItem.value = {
        categoryName: '',
        description: '',
        imageUrl: '',
        categoryLevel: 1,
        sortNum: 0,
    };
};

// 取消操作
const handleCancel = () => {
    dialog.value = false;
    // 重置表单
    initForm();
};

// 保存操作
const handleSave = async () => {
    // 表单验证
    if (!categoryItem.value.categoryName) {
        snackbar.value = {
            show: true,
            text: '分类名称不能为空',
            color: 'error'
        };
        return;
    }

    isSaving.value = true;
    try {
        // 调用API添加分类
        const response = await saveCategory(categoryItem.value);
        
        if (response.code === 200) {
            // 显示成功消息
            snackbar.value = {
                show: true,
                text: '分类添加成功',
                color: 'success'
            };
            
            // 通知父组件创建成功
            emit('created');
            
            // 关闭对话框
            dialog.value = false;
            
            // 重置表单
            initForm();
        } else {
            throw new Error(response.msg || '创建失败');
        }
    } catch (error) {
        // 显示错误消息
        snackbar.value = {
            show: true,
            text: error instanceof Error ? error.message : '添加分类时出错',
            color: 'error'
        };
    } finally {
        isSaving.value = false;
    }
};
</script>