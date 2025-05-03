<script setup lang="ts">
import { ref, onMounted } from 'vue';
defineProps({
    tags: {
        type: Array as () => string[],
        default: () => []
    }
});

// 根据tag长度计算应用的CSS类
const getChipClass = (tag: string) => {
  const styleClasses = [
    'chip-season', 'chip-edition', 'chip-resolution', 'chip-codec',
    'chip-team', 'chip-label', 'chip-expire',
    'chip-free', 'chip-discount', 'chip-bonus'
  ];
  // 使用tag长度模除样式类数量来确定样式
  const index = tag.length % styleClasses.length;
  return styleClasses[index];
};

// :class="getChipClass(tag)"

</script>

<template>
    <div class="d-flex flex-wrap ga-1 align-content-start">
        <v-chip 
          v-for="tag in tags.slice(0, 5)" 
          :key="tag"
          class="rounded-sm" 
          size="x-small" 
          variant="tonal"
          :elevation="0"
        >
            {{ tag }}
        </v-chip>
    </div>
</template>

<style scoped>
.chip-season {
  background-color: #e8eaf6 !important;
  color: #3f51b5 !important;
}

.chip-edition {
  background-color: #ffebee !important;
  color: #d32f2f !important;
}

.chip-resolution {
  background-color: #f3e5f5 !important;
  color: #6a1b9a !important;
}

.chip-codec {
  background-color: #fff3e0 !important;
  color: #e65100 !important;
}

.chip-team {
  background-color: #e0f2f1 !important;
  color: #00695c !important;
}

.chip-label {
  background-color: #e8eaf6 !important;
  color: #303f9f !important;
}

.chip-hr {
  background-color: #f5f5f5 !important;
  color: #212121 !important;
}

.chip-expire {
  background-color: #ede7f6 !important;
  color: #4527a0 !important;
}

.chip-free {
  background-color: #e8f5e9 !important;
  color: #2e7d32 !important;
}

.chip-discount {
  background-color: #fbe9e7 !important;
  color: #d84315 !important;
}

.chip-bonus {
  background-color: #f3e5f5 !important;
  color: #7b1fa2 !important;
}
</style>