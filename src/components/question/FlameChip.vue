<template>
  <div 
    class="text-body-1 d-flex align-center text-medium-emphasis flame-container "
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <IconFlame 
      :size="20" 
      :class="{'flame-animate': isHovered}"
      :color="flameColor"
    ></IconFlame>
    <span class="ml-1">{{ value }}</span>
  </div>
</template>

<script setup lang="ts">
import { IconFlame } from '@tabler/icons-vue';
import { ref, computed } from 'vue';

const props = defineProps<{
    value: number;
}>();

const isHovered = ref(false);
const flameColor = computed(() => isHovered.value ? '#FF5722' : '#FF9800');
</script>

<style scoped>
.flame-container {
  transition: all 0.3s ease;
  padding: 0 4px;
  border-radius: 4px;
}

.flame-container:hover {
  background-color: rgba(255, 152, 0, 0.08);
}

.flame-animate {
  animation: shake 0.5s infinite;
}

@keyframes shake {
  0% { transform: rotate(-5deg); }
  50% { transform: rotate(5deg); }
  100% { transform: rotate(-5deg); }
}
</style>