<template>
        <v-progress-linear rounded="sm" height="2" indeterminate v-if="questionStore.questionData.loading.detail"></v-progress-linear>

      <perfect-scrollbar class="question-detail-scroll">
          <!-- 题目信息 -->
          <v-card flat class="mb-4" color="#f8fafc">
              <v-card-title class="font-weight-bold">{{ questionStore.questionData.currentQuestion?.id }}.{{ questionStore.questionData.currentQuestion?.questionTitle }}</v-card-title>
              


              <v-card-actions class="d-flex justify-space-between">

                <div class="mx-4">
                  <DifficultyChip v-if="questionStore.questionData.currentQuestion?.difficulty" class="mb-2" :difficulty="questionStore.questionData.currentQuestion?.difficulty" />

                  <TagChips :tags="questionStore.questionData.currentQuestion?.tagNames!" />
                </div>

                <div class="d-flex ga-1">
                    <ToggleStatus v-if="questionStore.questionData.currentQuestion && questionStore.questionData.currentQuestion.id" :questionId="questionStore.questionData.currentQuestion.id" />
    
                    <v-btn icon rounded="sm">
                        <IconStar :size="20" stroke="2" />
                    </v-btn>
    
                    <v-btn icon rounded="sm">
                        <IconEye :size="20" stroke="2" />
                        <span class="ms-1">{{ questionStore.questionData.currentQuestion?.viewCount }}</span>
                    </v-btn>
                </div>
              </v-card-actions>

              <!-- 题目提示 -->
              <v-card-text v-if="questionStore.questionData.currentQuestion?.questionTips" class="tips-container">
                  <v-divider class="mb-3" thickness="2"></v-divider>
                  <div class="d-flex align-center mb-3">
                    <IconBulb color="#0288d1" class="mr-2" :size="20" />
                    <h3 class="text-subtitle-1 font-weight-medium mb-0">提示</h3>
                  </div>
                  <div class="text-body-2">
                        {{ questionStore.questionData.currentQuestion?.questionTips }}
                    </div>
              </v-card-text>
          </v-card>

          <!-- 答案区域 -->
          <v-card flat>
              <v-card-title class="d-flex align-center justify-space-between">
                  <span class="text-h6 font-weight-bold answer-title">
                    答案
                  </span>
                  <v-btn 
                      v-if="!showAnswer && questionStore.questionData.currentQuestion?.answer" 
                      color="primary" 
                      variant="flat" 
                      rounded="md"    
                      size="small"
                      class="d-flex align-center"
                      @click="showAnswer = true"
                  >
                      <IconEye :size="20" stroke="2" class="mr-1" />
                      显示答案
                  </v-btn>
                  <v-btn 
                      v-if="showAnswer" 
                      color="grey" 
                      variant="flat" 
                      rounded="md"
                      size="small"
                      class="d-flex align-center"
                      @click="showAnswer = false"
                  >
                      <IconEyeOff :size="16" stroke="2" class="mr-1" />
                      隐藏答案
                  </v-btn>
              </v-card-title>
              <v-card-text class="pt-0">
                  <v-progress-circular v-if="questionStore.questionData.loading.detail" indeterminate></v-progress-circular>
                  <div v-else-if="!questionStore.questionData.currentQuestion?.answer" class="text-center text-body-1 text-medium-emphasis">
                      暂无答案
                  </div>
                  <template v-else>
                      <!-- 隐藏状态 -->
                      <div v-if="!showAnswer" class="text-center py-8">
                          <IconEyeOff color="grey" :size="80" class="mb-2 opacity-60" />
                          <div class="d-flex justify-center mb-3">
                              <v-btn 
                                  color="primary" 
                                  variant="flat" 
                                  rounded="md"
                                  class="d-flex align-center"
                                  @click="showAnswer = true"
                              >
                                  <IconEye :size="20" stroke="2" class="mr-1" />
                                  显示答案
                              </v-btn>
                          </div>
                          <div class="text-subtitle-1 text-medium-emphasis">答案已隐藏，点击按钮查看</div>
                      </div>
                      <!-- 显示状态 -->
                      <MarkdownViewer v-else :content="questionStore.questionData.currentQuestion?.answer" />
                  </template>
              </v-card-text>
          </v-card>
      </perfect-scrollbar>
  </template> 
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import DifficultyChip from '@/components/question/DifficultyChip.vue';
  import { IconStar, IconEye, IconEyeOff, IconBulb } from '@tabler/icons-vue';
  import ToggleStatus from '@/pages/question/detail/components/ToggleStatus.vue';
  import MarkdownViewer from '@/components/doc/MarkdownViewer.vue';
  import TagChips from '@/components/question/TagChips.vue';
  import { useQuestionStore } from '@/stores/question';
  import { useUserSettingsStore } from '@/stores/userSettings';
  // 引入perfect-scrollbar组件
  import { PerfectScrollbar } from 'vue3-perfect-scrollbar';

  const questionStore = useQuestionStore();
  const userSettingsStore = useUserSettingsStore();
  
  // 控制答案的显示和隐藏，根据用户设置决定是否默认显示
  const showAnswer = ref(userSettingsStore.settings.showAnswersByDefault);
  </script>
  
  <style scoped>
  .tips-container {
    padding-bottom: 16px;
  }

  .question-detail-scroll {
    height: calc(100vh - 120px);
    overflow-y: auto;
  }

  .answer-title {
    position: relative;
    padding-left: 16px;
  }

  .answer-title::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 20px;
    background-color: rgb(var(--v-theme-primary));
    border-radius: 2px;
  }
  </style>
  
  