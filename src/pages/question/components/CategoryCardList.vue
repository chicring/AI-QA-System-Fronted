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
        <v-row>
            <v-col v-if="categoryList.data.length > 0" v-for="category in categoryList.data"  :cols="12" :sm="4" :md="3">
                <CategoryCard :category="category"/>
            </v-col>
            <v-col v-else :cols="6" :sm="4" :md="3" v-for="i in 4" :key="i">
                <v-skeleton-loader type="card"></v-skeleton-loader>
            </v-col>
        </v-row>

    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getQuestionCategoryList } from '@/api/question';
import type { CategoryListQueryParams, CategoryListResponse, CategoryItem } from '@/api/types/index';
import CategoryCard from './CategoryCard.vue';
import { IconChevronCompactRight } from '@tabler/icons-vue';


const categoryList = ref<CategoryListResponse>({
  pageNum: 1,
  pageSize: 6, 
  total: 0,
  data: [] as CategoryItem[]
})

onMounted(async () => {
  const res = await getQuestionCategoryList({ pageNum: 1, pageSize: 10 });
  categoryList.value = res.data;
})

</script>
