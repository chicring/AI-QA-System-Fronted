<template>
  <v-sheet rounded="md" class="px-2 py-1" style="min-height: calc(100vh - 90px)">
    <div class="d-flex justify-end mb-2 align-center">
      <v-chip size="small" color="primary" variant="flat">
        <IconReload size="16" class="mr-1" /> 最后更新: {{ lastUpdated }}
      </v-chip>
      <v-btn 
        icon="mdi-refresh" 
        size="small" 
        color="primary" 
        variant="text" 
        class="ml-2" 
        @click="fetchSystemInfo"
        :loading="isRefreshing"
      > 
       <IconReload />
      </v-btn>
    </div>
    <div>
      <v-row dense>
        <v-col cols="12" md="4">
          <QuestionBankCard :total="systemInfo.questionCount" />
        </v-col>
        <v-col cols="12" md="4">
          <UserStatsCard :total="systemInfo.userCount" />
        </v-col>
        <v-col cols="12" md="4">
          <SystemLogCard :total="systemInfo.totalLogCount" :todayLogCount="systemInfo.todayLogCount" />
        </v-col>
      </v-row>
    </div>
  </v-sheet>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import QuestionBankCard from './components/QuestionBankCard.vue';
import UserStatsCard from './components/UserStatsCard.vue';
import SystemLogCard from './components/SystemLogCard.vue';
import type { SystemInfo } from '@/api';
import { getSystemInfo } from '@/api';
import { IconReload } from '@tabler/icons-vue';

const systemInfo = ref<SystemInfo>({
  questionCount: 0,
  userCount: 0,
  todayLogCount: 0,
  totalLogCount: 0
});

const lastUpdated = ref<string>('加载中...');
const isRefreshing = ref<boolean>(false);

function fetchSystemInfo() {
  isRefreshing.value = true;
  getSystemInfo()
    .then((res) => {
      if (res.code === 200 && res.data) {
        systemInfo.value = res.data;
        // 获取当前时间 时分秒
        lastUpdated.value = new Date().toLocaleTimeString();
      } else {
        lastUpdated.value = '加载失败';
      }
    })
    .catch((error) => {
      console.error('获取系统信息失败:', error);
      lastUpdated.value = '加载失败';
    })
    .finally(() => {
      isRefreshing.value = false;
    });
}

onMounted(() => {
  fetchSystemInfo();
});
</script> 