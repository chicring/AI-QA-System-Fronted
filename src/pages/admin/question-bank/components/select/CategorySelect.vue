<template>
    <CategorySelector
        v-model="selectedCategory"
        return-type="name"
        :use-select-component="false"
        :with-search="false"
        label="选择所属分类"
        placeholder="请选择分类"
        :error="!!errorMessage"
        :error-messages="errorMessage"
        @update:model-value="handleCategoryChange"
    />
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import CategorySelector from './CategorySelector.vue';

// 定义Props
const props = defineProps<{
    categoryName: string
}>();

// 定义Emits
const emit = defineEmits<{
    (e: 'update:categoryName', value: string): void
}>();

// 状态
const selectedCategory = ref<string | null>(props.categoryName || null);
const errorMessage = ref<string>('');

// 监听props变化
watch(() => props.categoryName, (newVal) => {
    selectedCategory.value = newVal || null;
});

// 监听内部选择变化
const handleCategoryChange = (value: any) => {
    emit('update:categoryName', value || '');
};
</script>

<style scoped>
</style> 