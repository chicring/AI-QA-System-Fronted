<template>
    <div class="question-bank-page">
        <h1>问题库页面</h1>
        <p>这是一个关于问题库的简单页面，ID: {{ id }}</p>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id;
</script>

<style scoped>
.question-bank-page {
    padding: 20px;
    text-align: center;
}
</style> 