<template>
  <v-card flat class="stat-card bg-primary bubble-shape bubble-primary-shape overflow-hidden">
    <v-card-title class="text-h4">
      用户统计
    </v-card-title>

    <v-card-text class="px-4">
      <span class="text-h2">{{ total }}</span>

      <p class="stat-subtitle">
        总用户数
      </p>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
defineProps<{
  total: number
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
  font-size: 12px;
  opacity: 0.7;
}
</style> 