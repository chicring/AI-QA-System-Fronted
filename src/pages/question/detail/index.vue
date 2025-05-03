<template>
  <div>
    <div>
        <QuestionListSidebar/>
    </div>

    <div>
        <!-- 加载状态-->
        <QuestionDetail  :key="questionStore.questionData.currentQuestionId ?? 'default'"/>
    </div>
  </div>
</template> 

<script setup lang="ts">
import QuestionDetail from '@/pages/question/detail/components/QuestionDetail.vue';
import QuestionListSidebar from '@/pages/question/detail/components/QuestionListSidebar.vue';
import { useQuestionStore } from '@/stores/question';

const questionStore = useQuestionStore();

</script>

