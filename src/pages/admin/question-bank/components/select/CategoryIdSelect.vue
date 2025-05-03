<template>
    <CategorySelector
        v-model="internalCategoryId"
        return-type="id"
        :use-select-component="true"
        :with-search="true"
        label="所属分类"
        variant="outlined"
        density="compact"
    />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import CategorySelector from './CategorySelector.vue';

// 定义props
const props = defineProps<{
    categoryId: number | null | string
}>();

// 定义emit
const emit = defineEmits<{
    (e: 'update:categoryId', value: number | null): void
}>();

// 内部状态 - 将字符串类型的ID转换为数字类型
const internalCategoryId = computed({
    get: () => {
        if (props.categoryId === null || props.categoryId === undefined || props.categoryId === '') {
            return null;
        }
        return typeof props.categoryId === 'string' ? parseInt(props.categoryId, 10) : props.categoryId;
    },
    set: (value) => {
        emit('update:categoryId', value);
    }
});
</script> 