<template>
  <div>
    <v-hover v-if="message.role === 'user'">
      <template v-slot:default="{ props: hoverProps, isHovering }">
        <div class="d-flex justify-end ga-2" v-bind="hoverProps">

          <div class="d-flex flex-column justify-end">
            <v-btn flat rounded="md" size="x-small" icon 
                 :class="[
                   isHovering ? 'opacity-60' : 'opacity-0'
                 ]" 
                 @click="copyText(message.content)">
                 <IconCopy size="20" />
              </v-btn>
          </div>

          <div class="message-user-content">
            <p>{{ message.content }}</p> 
          </div>
        </div>
      </template>
    </v-hover>

    <v-hover v-else>
      <template v-slot:default="{ props: hoverProps, isHovering }">

        <div class="d-flex justify-start ga-2" v-bind="hoverProps">
          <div class="message-container">
            <MarkdownViewer :content="message.content" />
          </div>

          <div class="d-flex flex-column justify-end">
            <v-btn flat rounded="md" size="x-small" icon 
                 :class="[
                   isHovering ? 'opacity-60' : 'opacity-0'
                 ]"
                 @click="copyText(message.content)">
                 <IconCopy size="20" />
               </v-btn>
           </div>
        </div>

      </template>
            
    </v-hover>

  </div>
</template>

<script setup lang="ts">
import type { Message } from '@/types/chats/chat';
import { IconCopy } from '@tabler/icons-vue';
import MarkdownViewer from '@/components/doc/MarkdownViewer.vue';
import { useToast } from 'vue-toast-notification';
import copy from 'copy-to-clipboard';

const toast = useToast();

const props = defineProps<{
  message: Message;
}>();

const copyText = (text: string) => {
  if (copy(text)) {
    toast.success('复制成功', { position: 'top' });
  } else {
    toast.error('复制失败', { position: 'top' });
  }
}
</script>

<style scoped>
.message-user-content {
  background-color: #eef2f6;
  border-radius: 10px;
  padding: 8px;
}

.message-container {
  max-width: 97%;
  overflow-wrap: break-word;
}
</style>
