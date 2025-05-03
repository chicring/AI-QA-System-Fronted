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
import InterviewerSelect from './components/InterviewerSelect.vue'
import UploadButton from './components/UploadButton.vue'
import Weclome from './components/Weclome.vue'  

const chatStore = useChatStore()

const chatRequest = ref<ChatRequest>({
  message: '',
  conversationId: '',
  files: '',
  interviewer: 'zhangsan'
})

const uploadFiles = ref<string[]>([])

const options = ref({
  showArrow: false,
  isScrolling: false
})


const sendMessage = async () => {
  if (chatRequest.value.message.trim() === "" || chatStore.chat.isReplying) {
    return;
  }
  // 打印chatRequest.value
  console.log(chatRequest.value)
  await chatStore.sendMessage(chatRequest.value).then(() => {
    chatRequest.value.message = ''
  })
  moveToBottom()
}

const handleUploadSuccess = (fileName: string) => {
  uploadFiles.value.push(fileName)
  chatRequest.value.files = uploadFiles.value.join(',')
}

const handleDeleteFile = (fileName: string) => {
  uploadFiles.value = uploadFiles.value.filter(file => file !== fileName)
  chatRequest.value.files = uploadFiles.value.join(',')
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
          <!-- 无消息时显示欢迎卡片 -->
          <div v-if="chatStore.chat.messages.length === 0" class="welcome-card-container">
            <Weclome />
          </div>
          <!-- 有消息时显示消息列表 -->
          <div v-else v-for="msg in chatStore.chat.messages" class="mb-4">
            <MessageCard :key="msg.id" :message="msg" />
          </div>
        </div>

      </PerfectScrollbar>

      <!-- 输入框区域 - 固定在底部 -->
      <div class="chat-input" :class='{"container": mdAndUp}'>

        <v-btn class="floating-button" rounded="md" color="primary" v-if="options.showArrow" @click.stop="moveToBottom" variant="flat" icon="true"> 
          <IconChevronsDown/>
        </v-btn>
        <div class="upload-files">
          <v-chip class="mr-2" v-for="file in uploadFiles" rounded="md" closable variant="flat" @click:close="handleDeleteFile(file)" color="primary">
            {{ file.slice(0, 10) }}
          </v-chip>
        </div>

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
            flat
            v-model="chatRequest.message"
            @keydown.enter.exact.prevent="sendMessage"
            @keydown.shift.enter.exact.prevent="chatRequest.message += '\n'"
          >
            <template v-slot:append>
            </template>
        </v-textarea>

        <div class="d-flex justify-space-between">
          <div class="d-flex align-end">
            <InterviewerSelect v-model:value="chatRequest.interviewer" />
          </div>


          <div class="d-flex ">
            <UploadButton :conversation-id="chatStore.chat.conversationId" @upload:success="handleUploadSuccess"/>
   
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
  margin-top: auto;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 10px;
  border: 1px solid #e0e0e0;
}

/* 浮动按钮 相对父元素固定在底部右下角  内边距20px*/
.floating-button {
  position: fixed;
  right: 23%;
  bottom: 150px;
  z-index: 1;
}

.upload-files {
  position: fixed;
  bottom: 135px;
  z-index: 1;
}

/* 欢迎卡片容器样式 - 垂直居中 */
.welcome-card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}


@media (max-width: 960px) {
  .floating-button {
    right: 20px;
  }
  
  .welcome-card {
    max-width: 90%;
  }
}

</style>