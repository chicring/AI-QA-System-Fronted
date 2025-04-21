<template>
    <v-select
        :model-value="selectedCategory"
        @update:model-value="updateSelectedCategory"
        :items="categoryOptions"
        item-title="categoryName"
        item-value="id"
        label="所属分类"
        density="compact"
        variant="outlined"
        :loading="loading"
        return-object
        hide-details
    >
        <template #prepend-item>
            <v-text-field
                class="ma-2"
                v-model="params.q"
                label="搜索分类"
                variant="outlined"
                density="compact"
                @update:model-value="fetchCategoryOptions"
                hide-details
            ></v-text-field>
        </template>
        <template #no-data>
            <v-list-item>
                <v-list-item-title>
                    {{ loading ? '加载中...' : '没有找到匹配的分类' }}
                </v-list-item-title>
            </v-list-item>
        </template>
    </v-select>

</template>

<script setup lang="ts">
import { getQuestionCategoryList } from '@/api'
import type { CategoryItem, CategoryListQueryParams } from '@/api/types';
import { ref, computed, onMounted, watch } from 'vue';

// 定义props
const props = defineProps<{
    categoryId: number | null | string
}>();

// 定义emit
const emit = defineEmits<{
    (e: 'update:categoryId', value: number | null): void
}>();

// 本地状态
const loading = ref(false);
const selectedCategory = computed({
    get: () => {
        // 如果没有选择分类，返回null
        if (props.categoryId === null) return null;
        
        // 根据categoryId找到对应的CategoryItem对象
        return categoryOptions.value.find(category => category.id === props.categoryId) || null;
    },
    set: (value) => {
        // 提取id值，如果是对象的话
        const id = value && typeof value === 'object' ? value.id : value;
        emit('update:categoryId', id);
    }
});

// 搜索参数
const params = ref<CategoryListQueryParams>({
    pageNum: 1,
    pageSize: 50,
    q: null
});

// 分类选项列表
const categoryOptions = ref<CategoryItem[]>([]);

// 更新选中的分类
const updateSelectedCategory = (value: any) => {
    // 提取id值，如果是对象的话
    const id = value && typeof value === 'object' ? value.id : value;
    emit('update:categoryId', id);
};

// 获取分类选项
const fetchCategoryOptions = async () => {
    loading.value = true;
    try {   
        const res = await getQuestionCategoryList(params.value);
        categoryOptions.value = res.data.data;
    } catch (error) {
        console.error('获取分类列表失败:', error);
    } finally {
        loading.value = false;
    }
};

// 监听props.categoryId变化，确保当categoryId更新时选中状态也更新
watch(() => props.categoryId, (newCategoryId) => {
    // 如果categoryOptions还没加载完，我们不需要做任何事
    if (categoryOptions.value.length === 0) return;
    
    // 确认选中项是最新的
    const currentSelectedId = selectedCategory.value ? selectedCategory.value.id : null;
    if (currentSelectedId !== newCategoryId) {
        // 这里不需要做任何事，计算属性会自动更新
        console.log('categoryId已更新:', newCategoryId);
    }
}, { immediate: true });

// 初始加载分类
onMounted(() => {
    fetchCategoryOptions();
});
</script> 