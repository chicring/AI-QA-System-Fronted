<template>
  <div>
    <v-card  flat>
      <v-tabs v-model="activeTab">
        <v-tab value="questions">题目管理</v-tab>
        <v-tab value="categories">分类管理</v-tab>
        <v-tab value="tags">标签管理</v-tab>
      </v-tabs>
      
      <v-window v-model="activeTab">
        <v-window-item value="questions">
          <v-card-text>
            <QuestionManagement />
          </v-card-text>
        </v-window-item>
        
        <v-window-item value="categories">
          <v-card-text>
            <CategoryManagement />
          </v-card-text>
        </v-window-item>
        
        <v-window-item value="tags">
          <v-card-text>
            <TagManagement />
          </v-card-text>
        </v-window-item>
      </v-window>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import QuestionManagement from './components/QuestionManagement.vue';
import CategoryManagement from './components/CategoryManagement.vue';
import TagManagement from './components/TagManagement.vue';

const activeTab = ref('questions');
</script>

<style scoped>
.v-window {
  min-height: 400px;
}
</style>