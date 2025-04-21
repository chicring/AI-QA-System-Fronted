<template>
  <v-card flat class="stat-card bubble-shape-sm overflow-hidden bubble-warning">
    <v-card-title class="text-h4">
      今日日志
    </v-card-title>

    <v-card-text class="px-4">
      <span class="text-h2">{{ todayLogCount }}</span>

      <p class="stat-subtitle">
        总系统日志数 {{ total }}
      </p>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
defineProps<{
  total: number,
  todayLogCount: number
}>();
</script>

<style scoped>
.stat-card {
  height: 100%;
  transition: transform 0.2s, box-shadow 0.2s;
  overflow: hidden;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08) !important;
}

.stat-subtitle {
  font-size: 13px;
  opacity: 0.7;
}
</style> 