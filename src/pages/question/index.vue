<template>
    <v-container>
        <!-- 题库列表 -->
        <CategoryCardList />

        <div class="py-5"></div>

        <!-- 表格 -->
        <QuestionTable />
    </v-container>

</template> 

<script setup lang="ts">
import CategoryCardList from '@/pages/question/components/CategoryCardList.vue';
import QuestionTable from '@/pages/question/components/QuestionTable.vue';


</script>

