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
                <v-col v-for="category in categoryList.records" :key="category.id" :cols="6" :sm="4" :md="3">
                    <CategoryCard :category="category" />
                </v-col>
            </v-row>
        </div>

        <v-row justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <v-pagination
              v-model="currentPage"
              :length="Math.ceil(totalItemsCount / categoryList.pageSize)"
              class="my-4"
              @next="jumpToPage(currentPage + 1)"
              @prev="jumpToPage(currentPage - 1)"
              @update:modelValue="handlePageChange"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { IconSearch } from '@tabler/icons-vue';
import type { CategoryListQueryParams, PaginatedData, CategoryItem } from '@/api';
import { ref, onMounted, computed } from 'vue';
import { getCategoryList } from '@/api';
import CategoryCard from '../components/CategoryCard.vue';

const params = ref<CategoryListQueryParams>({
    pageNum: 1,
    pageSize: 16,
    q: undefined,
});

const categoryList = ref<PaginatedData<CategoryItem>>({
  records: [] as CategoryItem[],
  totalRow: 0,
  totalPage: 0,
  pageNumber: 1,
  pageSize: 10
});

// 使用计算属性确保始终有值
const currentPage = computed({
  get: () => params.value.pageNum || 1,
  set: (val) => {
    params.value.pageNum = val;
  }
});

// 计算属性，提供总数据条数
const totalItemsCount = computed(() => {
  return categoryList.value?.totalRow || 0;
});

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
  try {
    const res = await getCategoryList(params.value);
    if (res.code === 200 && res.data) {
      categoryList.value = res.data;
    }
  } catch (error) {
    console.error('获取分类列表失败:', error);
  }
};

onMounted(() => {
  fetchCategoryList();
});
</script>
