<template>
  <div>
    <div>
        <QuestionListSidebar :categoryId="categoryId" />
    </div>

    <div>
        <QuestionDetail :questionId="id" />
    </div>
  </div>
</template> 

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import QuestionDetail from '@/pages/question/detail/components/QuestionDetail.vue';
import QuestionListSidebar from '@/pages/question/detail/components/QuestionListSidebar.vue';

const route = useRoute();

const id = route.params.id as string;
const categoryId = route.query.categoryId as string;

</script>

