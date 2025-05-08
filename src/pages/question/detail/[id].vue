<template>
  <v-container>
    <v-progress-linear rounded="sm" height="2" indeterminate v-if="loading"></v-progress-linear>

    <perfect-scrollbar class="question-detail-scroll">
      <!-- 题目信息 -->
      <v-card flat class="mb-4" color="#f8fafc">
        <v-card-title class="font-weight-bold">{{ question.id }}.{{ question.questionTitle }}</v-card-title>

        <v-card-actions class="d-flex justify-space-between">
          <div class="mx-4">
            <DifficultyChip class="mb-2" :difficulty="question.difficulty" />
            <TagChip :tags="question.tagNames" />
            <v-chip
              class="my-2 mb-2"
              size="small"
              variant="outlined"
              color="primary"
            >
              {{ question.categoryName }}
            </v-chip>
          </div>

          <div class="d-flex ga-1">
            <v-btn icon rounded="sm" @click="goBack">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </div>
        </v-card-actions>

        <!-- 题目提示 -->
        <v-card-text v-if="question.questionTips" class="tips-container">
          <v-divider class="mb-3" thickness="2"></v-divider>
          <div class="d-flex align-center mb-3">
            <IconBulb color="#0288d1" class="mr-2" :size="20" />
            <h3 class="text-subtitle-1 font-weight-medium mb-0">提示</h3>
          </div>
          <div class="text-body-2" v-html="question.questionTips"></div>
        </v-card-text>
      </v-card>

      <!-- 答案区域 -->
      <v-card flat>
        <v-card-title class="d-flex align-center justify-space-between">
          <span class="text-h6 font-weight-bold answer-title">
            答案
          </span>
          <v-btn 
            v-if="!showAnswer && question.answer" 
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
          <v-progress-circular v-if="loading" indeterminate></v-progress-circular>
          <div v-else-if="!question.answer" class="text-center text-body-1 text-medium-emphasis">
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
            <MarkdownViewer v-else :content="question.answer" />
          </template>
        </v-card-text>
      </v-card>
    </perfect-scrollbar>

    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
    >
      {{ snackbar.text }}
      <template v-slot:actions>
        <v-btn
          variant="text"
          @click="snackbar.show = false"
        >
          关闭
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getQuestionById } from '@/api/question';
import type { QuestionItem } from '@/api/types/question';
import TagChip from '@/components/question/TagChips.vue';
import DifficultyChip from '@/components/question/DifficultyChip.vue';
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';
import { IconEye, IconEyeOff, IconBulb } from '@tabler/icons-vue';
import MarkdownViewer from '@/components/doc/MarkdownViewer.vue';

const route = useRoute();
const router = useRouter();
const questionId = Number(route.params.id);

const question = ref<QuestionItem>({
  id: 0,
  questionTitle: '',
  questionTips: '',
  difficulty: 1,
  answer: '',
  categoryName: '',
  tagNames: [],
});

const showAnswer = ref(false);
const loading = ref(false);
const snackbar = ref({
  show: false,
  text: '',
  color: 'success',
});

// 获取问题详情
const fetchQuestionDetail = async () => {
  if (!questionId) return;
  
  loading.value = true;
  try {
    const response = await getQuestionById(questionId);
    if (response.code === 200 && response.data) {
      question.value = response.data;
    } else {
      showError('获取题目详情失败：' + response.msg);
    }
  } catch (error) {
    showError('获取题目详情失败，请稍后重试');
    console.error(error);
  } finally {
    loading.value = false;
  }
};

// 显示错误信息
const showError = (text: string) => {
  snackbar.value = {
    show: true,
    text,
    color: 'error',
  };
};

// 返回上一页
const goBack = () => {
  router.back();
};

onMounted(() => {
  fetchQuestionDetail();
});
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
