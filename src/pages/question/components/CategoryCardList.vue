<template>
    <div >
        <div class="mb-3">
            <v-btn flat to="/question/bank">
                <span class="text-h3">
                    题库  
                </span>
                <IconChevronCompactRight stroke="2"/>
            </v-btn>
        </div>
        <v-carousel hide-delimiters  show-arrows="hover" height="auto" cycle continuous>
          <template #prev="{ props }">
            <v-btn variant="text" v-bind="props"><IconChevronCompactLeft stroke="2"/></v-btn>
          </template>

          <template #next="{ props }">
            <v-btn variant="text" v-bind="props"><IconChevronCompactRight stroke="2"/></v-btn>
          </template>

          <v-carousel-item v-if="categoryList.records && categoryList.records.length > 0" 
            v-for="(group, groupIndex) in groupedCategories" :key="groupIndex">
            <v-row>
              <v-col v-for="category in group" :key="category.id" 
                :cols="6" :md="3">
                <CategoryCard :category="category"/>
              </v-col>
            </v-row>
          </v-carousel-item>
          
          <v-carousel-item v-else>
            <v-row>
              <v-col :cols="6" :sm="4" :md="3" v-for="i in 4" :key="i">
                <v-skeleton-loader type="card"></v-skeleton-loader>
              </v-col>
            </v-row>
          </v-carousel-item>
        </v-carousel>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { getCategoryList } from '@/api';
import type { CategoryListQueryParams, PaginatedData, CategoryItem } from '@/api';
import CategoryCard from './CategoryCard.vue';
import { IconChevronCompactRight, IconChevronCompactLeft } from '@tabler/icons-vue';

// 分类列表数据
const categoryList = ref<PaginatedData<CategoryItem>>({
  records: [] as CategoryItem[],
  totalRow: 0,
  totalPage: 0,
  pageNumber: 1,
  pageSize: 6
});

// 计算属性，提供总数据条数
const totalItemsCount = computed(() => {
  return categoryList.value?.totalRow || 0;
});

// 将分类列表分组，每组4个
const groupedCategories = computed(() => {
  const records = categoryList.value.records || [];
  const result = [];
  
  for (let i = 0; i < records.length; i += 4) {
    result.push(records.slice(i, i + 4));
  }
  
  return result;
});

// 查询参数
const params: CategoryListQueryParams = {
  pageNum: 1,
  pageSize: 12
};

// 获取分类列表
const fetchCategories = async () => {
  try {
    const res = await getCategoryList(params);
    if (res.code === 200 && res.data) {
      categoryList.value = res.data;
    }
  } catch (error) {
    console.error('获取分类列表失败:', error);
  }
};

onMounted(() => {
  fetchCategories();
});
</script>

<style scoped>
/* 确保轮播高度适配内容 */
:deep(.v-carousel) {
  min-height: 0;
}

/* 轮播项内容垂直居中 */
:deep(.v-carousel-item) {
  display: flex;
  align-items: center;
}
</style>
