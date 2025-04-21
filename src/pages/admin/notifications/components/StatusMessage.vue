<template>
  <v-card flat class="stat-card bg-primary bubble-shape bubble-primary-shape overflow-hidden ">
    <v-card-title class="text-h4">
      通知状态
    </v-card-title>

    <v-card-text class="px-4">

      <div class="my-2">
        <v-chip size="small" class="mr-2">未读：{{ unread }}</v-chip>

        <v-chip size="small">已读：{{ read }}</v-chip>
      </div>

      <p class="stat-subtitle">
        所有通知的状态
      </p>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
defineProps<{
  unread: number,
  read: number
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