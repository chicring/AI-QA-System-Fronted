import { defineStore } from "pinia";
import { ref } from "vue";
import type { userSettingsState } from "./types";

export const useUserSettingsStore = defineStore('userSettings', () => {
  // 默认设置
  const settings = ref<userSettingsState>({
    showAnswersByDefault: true,
    darkMode: false,
    learningTime: 0,
    learningGoalReminder: false
  });

  // 更新默认展示答案设置
  const toggleShowAnswers = () => {
    settings.value.showAnswersByDefault = !settings.value.showAnswersByDefault;
  };

  // 切换深色模式
  const toggleDarkMode = () => {
    settings.value.darkMode = !settings.value.darkMode;
  };

  // 更新学习时长
  const updateLearningTime = (time: number) => {
    settings.value.learningTime = time;
  };

  // 切换学习目标提醒
  const toggleLearningGoalReminder = () => {
    settings.value.learningGoalReminder = !settings.value.learningGoalReminder;
  };

  // 重置所有设置为默认值
  const resetSettings = () => {
    settings.value = {
      showAnswersByDefault: true,
      darkMode: false,
      learningTime: 0,
      learningGoalReminder: false
    };
  };

  return {
    settings,
    toggleShowAnswers,
    toggleDarkMode,
    updateLearningTime,
    toggleLearningGoalReminder,
    resetSettings
  };
}, {
  // 使用持久化插件，将设置保存到本地存储
  persist: true
}); 