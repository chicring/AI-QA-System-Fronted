<template>
    <div class="question-detail-page">
        <h1>问题详情页面</h1>
        <p>这是一个关于问题详情的简单页面，ID: {{ id }}</p>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id;
</script>

<style scoped>
.question-detail-page {
    padding: 20px;
    text-align: center;
}
</style> 