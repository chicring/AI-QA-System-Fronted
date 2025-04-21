<template>
    <v-container>
        <div class="d-flex justify-space-between align-self-center">
            <h1>全部</h1>

            <div style="min-width: 300px;">
                <v-text-field
                    placeholder="搜索题库"
                    flat
                    rounded="md"
                    variant="solo-filled"
                    density="compact"
                    v-model="params.q"
                    @update:modelValue="handleSearch"
                >
                    <template #prepend-inner>
                        <IconSearch class="text-medium-emphasis" />
                    </template>
                </v-text-field>
            </div>
        </div>

        <div>
            <v-row>
                <v-col v-for="category in categoryList.data" :cols="6" :sm="4" :md="3">
                    <CategoryCard :category="category" />
                </v-col>
            </v-row>
        </div>

        <v-row justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <v-pagination
              v-model="categoryList.pageNum"
              :length="Math.ceil(categoryList.total / categoryList.pageSize)"
              class="my-4"
              @next="jumpToPage(categoryList.pageNum + 1)"
              @prev="jumpToPage(categoryList.pageNum - 1)"
              @update:modelValue="handlePageChange"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { IconSearch } from '@tabler/icons-vue';
import type { CategoryListResponse, CategoryItem, CategoryListQueryParams } from '@/api/types/index';
import { ref } from 'vue';
import { getQuestionCategoryList } from '@/api';
import CategoryCard from '../components/CategoryCard.vue';

const params = ref<CategoryListQueryParams>({
    pageNum: 1,
    pageSize: 10,
    q: undefined,
})

const categoryList = ref<CategoryListResponse>({
  pageNum: 1,
  pageSize: 6, 
  total: 0,
  data: [] as CategoryItem[]
})

const updateParams = (newParams: Partial<typeof params.value>) => {
  // 合并新参数到现有参数
  params.value = { ...params.value, ...newParams };
  // 获取数据
  fetchCategoryList();
};

// 使用示例:
// 搜索
const handleSearch = (value: string) => {
  updateParams({ q: value });
};

// 跳转到指定页面
const jumpToPage = (page: number) => {
  updateParams({ pageNum: page });
};

// 处理页码变化
const handlePageChange = (page: number) => {
  updateParams({ pageNum: page });
};

const fetchCategoryList = async () => {
    const res = await getQuestionCategoryList(params.value);
    categoryList.value = res.data;
}

fetchCategoryList();
</script>
