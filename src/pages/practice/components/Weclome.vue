<template>
  <v-card class="welcome-card" flat>
    <v-card-item>
      <v-card-title class="font-weight-bold text-h4 text-center">欢迎来到练习模式</v-card-title>
    </v-card-item>
    <v-card-text class="text-center">
      <p class="text-body-1 mb-6">这是您的个人AI助手，随时为您提供帮助</p>

      <v-row>
        <v-col cols="12" sm="6">
          <v-hover v-slot="{ isHovering, props }">
            <v-card 
              v-bind="props"
              class="feature-card mb-4"
              :elevation="isHovering ? 3 : 0"
              rounded="lg"
            >
              <div class="d-flex align-center pa-4">
                <div class="flex-grow-1">
                  <div class="text-h6 font-weight-medium">模拟面试</div>
                  <div class="text-body-2 text-medium-emphasis mt-1">与AI面试官进行实时模拟面试练习</div>
                </div>
                <div class="icon-container" style="background-color: rgba(66, 133, 244, 0.1);">
                  <IconUserCircle color="#4285F4" :size="24" />
                </div>
              </div>
            </v-card>
          </v-hover>
        </v-col>

        <v-col cols="12" sm="6">
          <v-hover v-slot="{ isHovering, props }">
            <v-card 
              v-bind="props"
              class="feature-card mb-4"
              :elevation="isHovering ? 3 : 0"
              rounded="lg"
            >
              <div class="d-flex align-center pa-4">
                <div class="flex-grow-1">
                  <div class="text-h6 font-weight-medium">题库问答</div>
                  <div class="text-body-2 text-medium-emphasis mt-1">与AI进行题库问答</div>
                </div>
                <div class="icon-container" style="background-color: rgba(234, 67, 53, 0.1);">
                  <IconMessageQuestion color="#EA4335" :size="24" />
                </div>
              </div>
            </v-card>
          </v-hover>
        </v-col>

        <v-col cols="12" sm="6">
          <v-hover v-slot="{ isHovering, props }">
            <v-card 
              v-bind="props"
              class="feature-card mb-4"
              :elevation="isHovering ? 3 : 0"
              rounded="lg"
            >
              <div class="d-flex align-center pa-4">
                <div class="flex-grow-1">
                  <div class="text-h6 font-weight-medium">学习记录</div>
                  <div class="text-body-2 text-medium-emphasis mt-1">查看您的历史记录</div>
                </div>
                <div class="icon-container" style="background-color: rgba(52, 168, 83, 0.1);">
                  <IconHistory color="#34A853" :size="24" />
                </div>
              </div>
            </v-card>
          </v-hover>
        </v-col>

        <v-col cols="12" sm="6">
          <v-hover v-slot="{ isHovering, props }">
            <v-card 
              v-bind="props"
              class="feature-card mb-4"
              :elevation="isHovering ? 3 : 0"
              rounded="lg"
            >
              <div class="d-flex align-center pa-4">
                <div class="flex-grow-1">
                  <div class="text-h6 font-weight-medium">文档上传</div>
                  <div class="text-body-2 text-medium-emphasis mt-1">上传您的文档，与AI进行对话</div>
                </div>
                <div class="icon-container" style="background-color: rgba(251, 188, 5, 0.1);">
                  <IconFileUpload color="#FBBC05" :size="24" />
                </div>
              </div>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
      <p class="text-body-2 text-medium-emphasis">
        在下方输入框中输入您的问题，然后按回车键发送<br>
        您也可以选择不同的面试官或上传文档进行对话
      </p>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { IconUserCircle, IconMessageQuestion, IconHistory, IconFileUpload } from '@tabler/icons-vue';
</script>

<style scoped>
/* 欢迎卡片容器样式 - 垂直居中 */
.welcome-card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

/* 欢迎卡片样式 */
.welcome-card {
  max-width: 900px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.95);
}

/* 功能卡片样式 */
.feature-card {
  transition: all 0.2s ease;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

/* 图标容器 */
.icon-container {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 12px;
}
</style>
