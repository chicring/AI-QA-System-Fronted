<template>
  <div>
    <v-btn flat rounded="md" size="small" icon class="mr-2" color="containerBg" @click="triggerFileInput">  
      <IconPaperclip size="26" />
    </v-btn>
    <input
      ref="fileInput"
      type="file"
      style="display: none"
      @change="handleFileChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IconPaperclip } from '@tabler/icons-vue';
import { useToast } from 'vue-toast-notification';
import { uploadChatFile } from '@/api/chat';
import type { ChatUploadQueryParams } from '@/api/types/chat';

const toast = useToast();
const fileInput = ref<HTMLInputElement | null>(null);
const isUploading = ref(false);

const props = defineProps<{
  conversationId: string;
}>();

const emit = defineEmits<{
  (e: 'upload:success', fileName: string): void
}>();

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileChange = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (!input.files?.length) return;

  const file = input.files[0];
  if (!props.conversationId) {
    toast.error('请先开始对话');
    return;
  }

  try {
    isUploading.value = true;
    // 创建查询参数对象
    const params: ChatUploadQueryParams = {
      conversationId: props.conversationId
    };
    // 创建FormData对象并添加文件
    const formData = new FormData();
    formData.append('file', file);
    
    // 调用新的API函数
    const response = await uploadChatFile(params, formData);
    if (response.code === 200) {
      toast.success('文件上传成功', {
        duration: 3000,
        position: 'top',
      });
      emit('upload:success', file.name);
    } else {
      toast.error(response.msg || '文件上传失败', {
        duration: 1000,
        position: 'top',
      });
    }
  } catch (error) {
    console.error('Upload error:', error);
    toast.error('文件上传失败', {
      duration: 1000,
      position: 'top',
    });
  } finally {
    isUploading.value = false;
    // 清空文件输入，以便可以再次选择相同的文件
    if (input) input.value = '';
  }
};
</script>
