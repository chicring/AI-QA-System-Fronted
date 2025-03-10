<template>
      <div>
          <!-- 题目信息 -->
          <v-card flat class="mb-4" color="#f8fafc">
              <v-card-title>{{ question.questionId }}. {{ question.questionTitle }}</v-card-title>
              <v-card-text>
                  <div class="d-flex ga-2">
                      <DifficultyChip :difficulty="question.difficulty" />
                      <v-chip v-for="tag in question.tagNames" :key="tag"  size="small" rounded="sm">{{ tag }}</v-chip>
                  </div>
              </v-card-text>
              <v-card-actions class="d-flex justify-space-between">
                
                <div>
                    <v-tabs v-model="tab" density="compact" center-active slider-color="primary">
                        <v-tab value="0"  rounded="sm" size="small">提示</v-tab>
                        <v-tab value="1"  rounded="sm" size="small">答案</v-tab>
                    </v-tabs>
                </div>

                <div class="d-flex ga-3">
                    <ToggleStatus :questionId="questionId"/>
    
                    <v-btn icon rounded="sm">
                        <IconStar :size="20" stroke="2" />
                    </v-btn>
    
                    <v-btn icon rounded="sm">
                        <IconEye :size="20" stroke="2" />
                        <span class="ms-1">{{ question.viewCount }}</span>
                    </v-btn>
                </div>

              </v-card-actions>
          </v-card>

          <!-- 解答 -->
          <v-sheet>
              <v-tabs-window v-model="tab" >
                  <v-tabs-window-item value="0">
                      <h2>提示</h2>
                  </v-tabs-window-item>
                  <v-tabs-window-item value="1">
                      <AnswersList :questionId="question.questionId" />
                  </v-tabs-window-item>
              </v-tabs-window>
          </v-sheet>
      </div>
  </template> 
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import DifficultyChip from '@/components/question/difficultyChip.vue';
  import { getQuestionDetailById } from '@/api/question';
  import { IconStar, IconEye } from '@tabler/icons-vue';
  import AnswersList from '@/pages/question/detail/components/AnswersList.vue';
  import ToggleStatus from '@/pages/question/detail/components/ToggleStatus.vue';
  import type { QuestionItem } from '@/api/types';

  const props = defineProps<{
    questionId: string;
  }>();
  
  const question = ref<QuestionItem>({
      questionId: 0,
      questionTitle: '',
      questionTips: '',
      difficulty: 0,
      viewCount: 0,
      createTime: null,
      tagNames: [] as string[],
      categoryId: null,
  })
  

  
  const getQuestionDetail = async () => {
      const res = await getQuestionDetailById(props.questionId);
      question.value = res.data;
  }
  
  const tab = ref(0);
  
  getQuestionDetail();
  </script>
  
  