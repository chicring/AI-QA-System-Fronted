<template>
  <v-card flat class="stat-card bubble-shape-sm overflow-hidden bubble-warning">
    <v-card-title class="text-h4">
      发送通知
    </v-card-title>

    <v-card-text class="px-4">
      <div class="d-flex align-end justify-space-between">
        <p class="stat-subtitle">
          发送单个通知
        </p>

        <v-btn class="mt-4" color="primary"  flat rounded="md" @click="dialog = true">
          <IconSend size="18" /> 通知
        </v-btn>
      </div>
    </v-card-text>
  </v-card>

  <v-dialog v-model="dialog" max-width="1000">
    <v-card flat>
      <v-card-title>发送通知</v-card-title>
      <v-card-text>
        <ConfigItem :config="{key: 'title', label: '标题', type: 'string', description: '输入标题'}" v-model:model-value="form.title" />
        <ConfigItem :config="{key: 'content', label: '内容', type: 'text', description: '输入内容'}" v-model:model-value="form.content" />
        <ConfigItem :config="{key: 'sendTo', label: '发送人',type: 'string', description: '选择发送人'}" >
          <UserSelect v-model:username="form.username"  />
        </ConfigItem>
        
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" flat rounded="md" @click="sendNotify">发送</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { IconSend } from '@tabler/icons-vue';
import ConfigItem from '@/components/shared/ConfigItem.vue';
import UserSelect from '@/components/shared/UserSelect.vue';
import { ref } from 'vue';
import type { SendNotificationRequest } from '@/api/types';
import { sendNotification } from '@/api';
import { useToast } from 'vue-toast-notification';

const dialog = ref(false);
const form = ref<SendNotificationRequest>({
  title: '',
  content: '',
  username: ''
});

const toast = useToast();
const sendNotify = () => {
  sendNotification(form.value).then((res) => {
    toast.success('发送成功');
  }).catch((err) => {
    toast.error('发送失败');
  });
}

</script>

<style scoped>
.stat-card {
  height: 100%;
  transition: transform 0.2s, box-shadow 0.2s;
  overflow: hidden;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08) !important;
}

.stat-subtitle {
  font-size: 12px;
  opacity: 0.7;
}
</style>