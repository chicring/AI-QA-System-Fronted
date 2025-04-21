<template>
    <v-btn color="success" variant="flat" rounded="md" @click="dialog = true">
        <IconUpload></IconUpload>批量导入
    </v-btn>

    <v-dialog width="600" v-model="dialog">
        <v-card>
            <v-card-title>
                <span>批量导入题目</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <div class="mb-4">
                    <p class="text-body-2 mb-2">请上传包含题目数据的Excel文件，支持.xlsx和.xls格式</p>
                    <p class="text-caption text-medium-emphasis">文件格式要求：标题、内容、分类ID、标签ID、难度级别、参考答案、解析</p>
                </div>

                <v-file-input
                    v-model="file"
                    accept=".xlsx,.xls"
                    label="选择文件"
                    prepend-icon="mdi-file-excel"
                    variant="outlined"
                    density="comfortable"
                    :rules="fileRules"
                    :loading="isUploading"
                    :disabled="isUploading"
                    @change="handleFileChange"
                ></v-file-input>

                <div v-if="file" class="mt-4">
                    <v-alert
                        type="info"
                        variant="tonal"
                        class="mb-2"
                    >
                        已选择文件: {{ file.name }}
                    </v-alert>
                </div>

                <div v-if="importResult" class="mt-4">
                    <v-alert
                        :type="importResult.success ? 'success' : 'error'"
                        variant="tonal"
                    >
                        {{ importResult.message }}
                    </v-alert>
                    
                    <div v-if="importResult.details" class="mt-2">
                        <p class="text-body-2">导入详情:</p>
                        <ul class="text-caption">
                            <li v-for="(detail, index) in importResult.details" :key="index">
                                {{ detail }}
                            </li>
                        </ul>
                    </div>
                </div>
            </v-card-text>

            <v-divider></v-divider>
            <v-card-actions>
                <v-btn variant="text" rounded="md" @click="handleCancel" :disabled="isUploading">取消</v-btn>
                <v-btn 
                    color="primary" 
                    variant="text" 
                    rounded="md" 
                    @click="handleImport" 
                    :loading="isUploading"
                    :disabled="!file || isUploading"
                >
                    导入
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { IconUpload } from '@tabler/icons-vue';
import { importQuestion } from '@/api';

// 对话框状态
const dialog = ref(false);

// 文件上传相关
const file = ref<File | null>(null);
const isUploading = ref(false);
const importResult = ref<{
    success: boolean;
    message: string;
    details?: string[];
} | null>(null);

// 文件验证规则
const fileRules = [
    value => {
      return !value || !value.length || value[0].size < 5000000 || 'Avatar size should be less than 2 MB!'
    },
]

// 处理文件选择变化
const handleFileChange = (newFile: File | null) => {
    if (newFile) {
        importResult.value = null;
    } else {
        importResult.value = null;
    }
};

// 取消
const handleCancel = () => {
    dialog.value = false;
    file.value = null;
    importResult.value = null;
};

// 导入
const handleImport = async () => {
    if (!file.value) return;
    
    try {
        isUploading.value = true;
        
        // 创建FormData对象
        const formData = new FormData();
        formData.append('file', file.value);
        
        // 调用API上传文件
        const res = await importQuestion(formData);
        
        // 只需要判断接口的code是不是200
        if (res.code === 200) {
            // 处理导入结果
            importResult.value = {
                success: true,
                message: '题目导入成功',
                details: [
                    '文件已成功处理',
                    '导入时间: ' + new Date().toLocaleString()
                ]
            };
            
            // 发出导入成功事件
            emit('import-success', {
                count: 0, // 由于后端不返回具体数量，设为0或者其他默认值
                fileName: file.value.name
            });
            
            // 3秒后自动关闭对话框
            setTimeout(() => {
                handleCancel();
            }, 3000);
        } else {
            throw new Error(res.msg || '导入失败');
        }
        
    } catch (error: any) {
        console.error('导入失败:', error);
        importResult.value = {
            success: false,
            message: error.message || '导入失败，请检查文件格式是否正确',
            details: [
                '请确保Excel文件格式正确，并包含所有必要字段'
            ]
        };
    } finally {
        isUploading.value = false;
    }
};

// 定义事件
const emit = defineEmits<{
    (e: 'import-success', data: { count: number; fileName: string }): void;
}>();
</script> 