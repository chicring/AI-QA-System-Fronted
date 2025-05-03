<script setup lang="ts">
import { ref } from 'vue';
import { LogoutIcon } from 'vue-tabler-icons';
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/user';
import { useUserSettingsStore } from '@/stores/userSettings';

const authStore = useAuthStore();
const userStore = useUserStore();
const userSettingsStore = useUserSettingsStore();

// 学习时长输入
const learningTimeInput = ref(userSettingsStore.settings.learningTime);

// 监听输入变化并更新设置
const updateLearningTime = () => {
  userSettingsStore.updateLearningTime(learningTimeInput.value);
};
</script>

<template>
  <!-- ---------------------------------------------- -->
  <!-- profile DD -->
  <!-- ---------------------------------------------- -->
  <div class="pa-4">
    <h4 class="mb-n1">你好 <span class="font-weight-regular">{{ userStore.user.userInfo?.nickname }}</span></h4>
    <span class="text-subtitle-2 text-medium-emphasis">个人设置</span>

    <v-divider></v-divider>
    <perfect-scrollbar style="max-height: 515px">
      <div class="bg-lightwarning rounded-md px-3 py-3 my-3">
        <!-- 个人设置 -->
        <div class="text-subtitle-1 font-weight-bold mb-2">个人偏好设置</div>
        
        <!-- 默认展示答案 -->
        <v-list-item density="compact" class="px-0">
          <v-list-item-title class="text-subtitle-2">默认展示答案</v-list-item-title>
          <template v-slot:append>
            <v-switch
              v-model="userSettingsStore.settings.showAnswersByDefault"
              @click="userSettingsStore.toggleShowAnswers"
              density="compact"
              color="primary"
              hide-details
            ></v-switch>
          </template>
        </v-list-item>

        <!-- 学习目标提醒 -->
        <v-list-item density="compact" class="px-0">
          <v-list-item-title class="text-subtitle-2">学习目标提醒</v-list-item-title>
          <template v-slot:append>
            <v-switch
              v-model="userSettingsStore.settings.learningGoalReminder"
              @click="userSettingsStore.toggleLearningGoalReminder"
              density="compact"
              color="primary"
              hide-details
            ></v-switch>
          </template>
        </v-list-item>

        <!-- 学习时长设置 -->
        <v-list-item density="compact" class="px-0">
          <v-list-item-title class="text-subtitle-2">每日学习目标（小时）</v-list-item-title>
          <template v-slot:append>
            <v-text-field
              v-model="learningTimeInput"
              @change="updateLearningTime"
              type="number"
              min="0"
              max="24"
              variant="outlined"
              density="compact"
              hide-details
              class="learning-time-input"
            ></v-text-field>
          </template>
        </v-list-item>
      </div>

      <v-divider></v-divider>

      <!-- <div class="bg-lightprimary rounded-md px-5 py-3 my-3">
        今日学习时长：<span class="text-5 text-high-emphasis">0小时</span>
      </div> -->

      <v-divider></v-divider>

      <v-list class="mt-3">
        <v-list-item @click="authStore.logout()" color="secondary" rounded="md">
          <template v-slot:prepend>
            <LogoutIcon size="20" class="mr-2" />
          </template>

          <v-list-item-title class="text-subtitle-2">退出登录</v-list-item-title>
        </v-list-item>
      </v-list>
    </perfect-scrollbar>
  </div>
</template>

<style scoped>
.learning-time-input {
  max-width: 80px;
}
</style>
