<template>
    <v-navigation-drawer
        left
        app
        elevation="0"
        floating
    >
        <template #prepend>
            <div class="pa-2">
                <v-text-field
                    placeholder="搜索"
                    flat
                    variant="solo-filled"
                    density="compact"
                    rounded="sm"
                    :hideDetails="true"
                    v-model="params.title"
                    @update:modelValue="updateParams({ title: $event })"
                ></v-text-field>
            </div>
            <!-- <div>
                <v-btn flat variant="tonal" size="small">
                    <IconArrowLeft />
                    上一题
                </v-btn>

                <v-btn flat variant="tonal" size="small">
                    <IconArrowRight />
                    下一题
                </v-btn>

            </div> -->
        </template>

        <v-list
            nav
            density="comfortable"
            transition="slide-y-transition"
        >
            <v-list-item
                color="primary"
                rounded="sm"
                v-for="item in questionList.data"
                :key="item.questionId"
                :to= "{
                    path: `/question/detail/${item.questionId}`,
                    query: {
                        categoryId: item.categoryId,
                    }
                }"
            >
                <v-list-item-title>
                    
                    <strong>{{ item.questionTitle }}</strong>
                </v-list-item-title>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import type { QuestionListQueryParams, QuestionListResponse, QuestionItem } from '@/api/types/index';
import { getQuestionList } from '@/api/question';
const props = defineProps<{
    categoryId: string;
}>();

const params = ref<QuestionListQueryParams>({
    pageNum: 1,
    pageSize: 50,
    categoryId: Number(props.categoryId),
    title: undefined,
    difficulty: undefined,
    tagNames: [] as string[],
})

const questionList = ref<QuestionListResponse>({
    pageNum: 1,
    pageSize: 50,
    total: 0,
    data: [] as QuestionItem[],
})

const fetchQuestionList = async () => {
    const res = await getQuestionList(params.value);
    questionList.value = res.data;
}

// 更新查询参数并重新获取数据
const updateParams = (newParams: Partial<QuestionListQueryParams>) => {
  params.value = { ...params.value, ...newParams };
  // 当更新筛选条件时，重置到第一页
  if ('categoryId' in newParams || 'title' in newParams || 'difficulty' in newParams || 'tagNames' in newParams) {
    params.value.pageNum = 1;
  }
  fetchQuestionList();
};

fetchQuestionList();
</script>
