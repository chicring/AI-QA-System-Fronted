<script setup lang="ts">
const props = defineProps<{
  item: Object
}>()
</script>

<template>
  <component :is="props.item" size="20" stroke-width="2" class="iconClass"></component>
</template>

<style scoped>

</style>