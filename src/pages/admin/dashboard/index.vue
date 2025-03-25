<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-4">管理后台</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>题库统计</v-card-title>
          <v-card-text>
            <div class="text-h4">{{ questionBankCount }}</div>
            <div class="text-subtitle-2">总题库数</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>用户统计</v-card-title>
          <v-card-text>
            <div class="text-h4">{{ userCount }}</div>
            <div class="text-subtitle-2">总用户数</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>今日日志</v-card-title>
          <v-card-text>
            <div class="text-h4">{{ todayLogCount }}</div>
            <div class="text-subtitle-2">今日系统日志数</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const questionBankCount = ref(0);
const userCount = ref(0);
const todayLogCount = ref(0);

onMounted(async () => {
  // TODO: 从API获取统计数据
  questionBankCount.value = 0;
  userCount.value = 0;
  todayLogCount.value = 0;
});
</script> 