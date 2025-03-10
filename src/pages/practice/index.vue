<script setup lang="ts">
import { useDisplay } from 'vuetify'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { IconArrowUp, IconPaperclip, IconChevronsDown, IconSquareFilled } from '@tabler/icons-vue'
import MessageCard from '@/components/chat/MessageCard.vue'
import { ref, onMounted, watch } from 'vue'
const { mdAndUp } = useDisplay()
import { useChatStore } from '@/stores/chat'
import type { ChatRequest } from '@/api/types/chat'
import type { PerfectScrollbarExpose } from 'vue3-perfect-scrollbar';

const chatStore = useChatStore()


const chatRequest = ref<ChatRequest>({
  message: '',
  conversationId: '',
  files: ''
})

const options = ref({
  showArrow: false,
  isScrolling: false
})


const sendMessage = async () => {
  if (chatRequest.value.message.trim() === "" || chatStore.chat.isReplying) {
    return;
  }
  await chatStore.sendMessage(chatRequest.value).then(() => {
    chatRequest.value.message = ''
  })
  moveToBottom()
}

const scrollbarApi = ref<PerfectScrollbarExpose | null>(null);
const moveToBottom = () => {
  const list = document.getElementById("message-list");
  options.value.isScrolling = false
  if (list) {
    setTimeout(() => {
      scrollbarApi.value?.ps?.update();
      list.scrollTo({
        top: list.scrollHeight,
        behavior: "auto"
      });
    }, 200);
  }
};
function beginUp() {
  options.value.showArrow = true;
  options.value.isScrolling = true;
}
function rearchBottom() {
  options.value.showArrow = false;
}


watch(chatStore.chat, () => {
  if(options.value.isScrolling) {
    return
  }
  moveToBottom()
})

onMounted(() => {
  moveToBottom()
})

</script>

<template>
  <div class="w-full ma-0 pa-0">

    <!-- 主容器 - 使用 flex 布局 -->
    <div class="chat-container">
      <!-- 消息列表区域 - 可滚动 -->
      <PerfectScrollbar key="message-list" class="scrollable-messages" id="message-list" ref="scrollbarApi" @ps-scroll-up="beginUp" @ps-scroll-down="rearchBottom" 
      >
        <div class="pa-4" :class='{"container": mdAndUp}'>
          <!-- 这里放消息列表内容 -->
          <div v-for="msg in chatStore.chat.messages"  class="mb-4">
            <MessageCard :key="msg.id" :message="msg" />
          </div>
        </div>

      </PerfectScrollbar>

      <!-- 输入框区域 - 固定在底部 -->
      <div class="chat-input" :class='{"container": mdAndUp}'>

        <v-btn class="floating-button" rounded="md" color="primary" v-if="options.showArrow" @click.stop="moveToBottom" variant="flat" icon="true"> 
          <IconChevronsDown/>
        </v-btn>

        <v-textarea
            placeholder="enter发送 shift+enter换行"
            rows="2"
            max-rows="15"
            row-height="17"
            auto-grow
            variant="solo"
            no-resize
            hide-details
            density="compact"
            bg-color="#eef2f6"
            flat
            v-model="chatRequest.message"
            @keydown.enter.exact.prevent="sendMessage"
            @keydown.shift.enter.exact.prevent="chatRequest.message += '\n'"
          >
            <template v-slot:append>
            </template>
        </v-textarea>

        <div class="d-flex justify-space-between">
          <div>
            <v-btn flat rounded="md" color="containerBg">
              <p class="text-medium-emphasis">glm-4-32k</p>
            </v-btn>
          </div>


          <div>
            <v-btn flat rounded="md" size="small" icon class="mr-2" color="containerBg">  
              <IconPaperclip size="26" />
            </v-btn>
   

            <v-btn key="send-message" v-if="!chatStore.chat.isReplying" color="primary" flat rounded="md" size="small" icon @click="sendMessage">
              <IconArrowUp size="26" />
            </v-btn>
            <v-btn key="sending-message" v-else color="primary" flat rounded="md" size="small" icon>
              <IconSquareFilled style="color: #fff;" size="20" />
            </v-btn>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>

<style scoped>

/* 内容占据屏幕75% 并居中 */
.container {
  width: 60%;
  margin: 0 auto;
}

.chat-container {
  display: flex;
  flex-direction: column;
  height: calc(100dvh - 60px); /* 根据你的页面头部高度调整 */
}

.scrollable-messages {
  flex-grow: 1;
  overflow-y: auto;
  position: relative;
}

/* 输入框区域 固定在底部 并居中 左上角右上角圆润  内边距20px*/
.chat-input {
  background-color: #eef2f6; 
  margin-top: auto;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 10px;
}

/* 浮动按钮 相对父元素固定在底部右下角  内边距20px*/
.floating-button {
  position: fixed;
  right: 23%;
  bottom: 150px;
  z-index: 1;
}

@media (max-width: 960px) {
  .floating-button {
    right: 20px;
  }
}

</style>