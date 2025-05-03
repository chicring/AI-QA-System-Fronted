<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="4" >
                <v-card flat>
                    <v-img rounded="md" :src="categoryDetail.imageUrl" height="180px" cover>
                    </v-img>

                    <v-card-title>{{ categoryDetail.categoryName }}</v-card-title>

                    <div class="text-body-1 text-medium-emphasis px-4">{{ categoryDetail.description }}</div>
                </v-card>
            </v-col>

            <v-col cols="12" md="8">
                <QuestionList :categoryName="categoryDetail.categoryName" />
            </v-col>
        </v-row>

    </v-container>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import QuestionList from './components/QuestionList.vue';
import type { CategoryItem } from '@/api';
import { ref, onMounted } from 'vue';
import { getCategoryDetail } from '@/api';

const route = useRoute();
const id = parseInt(route.params.id as string);

const categoryDetail = ref<CategoryItem>({
    id: 0,
    categoryName: '',
    description: '',
    categoryLevel: 0,
    sortNum: 0,
    imageUrl: '',
});

async function fetchCategoryDetail() {
    try {
        const res = await getCategoryDetail(id);
        if (res.code === 200 && res.data) {
            categoryDetail.value = res.data;
        }
    } catch (error) {
        console.error('获取分类详情失败:', error);
    }
}

onMounted(() => {
    fetchCategoryDetail();
});
</script>

<style scoped>
.sticky-card-container {
  /* 默认样式 - 小屏幕下正常滚动 */
  position: relative;
  height: auto;
}

/* 中等及以上屏幕使用sticky定位 */
@media (min-width: 960px) {
  .sticky-card-container {
    position: sticky;
    top: 80px; /* 根据实际应用顶部导航栏高度调整 */
    height: fit-content;
    align-self: flex-start;
    z-index: 1;
  }
}
</style>

