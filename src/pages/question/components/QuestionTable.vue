<template>
    <div>
        <!-- 搜索 -->
        <v-row dense>
            <v-col cols="12" md="2">
                <v-select
                    v-model="params.difficulty"
                    :items="difficultyList"
                    item-title="name"
                    item-value="value"
                    variant="solo-filled"
                    density="compact"
                    rounded="md"
                    flat
                    placeholder="难度"
                    chips
                    hide-details
                    clearable
                    @update:modelValue="fetchQuestions"
                    :list-props="{
                        nav: true,
                        density: 'comfortable',
                        rounded: 'md',
                    }"
                ></v-select>
            </v-col>
            <v-col cols="12" md="3">
                <v-text-field
                    placeholder="搜索题目"
                    flat
                    rounded="md"
                    variant="solo-filled"
                    density="compact"
                    v-model="params.title"
                    @update:modelValue="fetchQuestions"
                    hide-details
                >
                    <template #prepend-inner>
                        <IconSearch class="text-medium-emphasis" />
                    </template>
                </v-text-field>
            </v-col>
            <v-col cols="12" md="5">
                <TagsSelect v-model:tagNames="selectedTags" @update:tagNames="updateTags" density="compact" />
            </v-col>

            <v-col cols="12" md="2">
                <!-- 设置 -->
                <v-btn class="text-medium-emphasis mr-2" rounded="md" variant="tonal"> <IconSettings  /></v-btn>

                <!-- 重置 -->
                <v-btn class="text-medium-emphasis" rounded="md" variant="tonal" @click="resetFilters"> <IconReload   /></v-btn>
            </v-col>
        </v-row>

        <!-- 表格 -->
        <div>
            <v-data-table-server
                :items-length="totalItemsCount"
                :items="questionList.records"
                :headers="headers"
                v-model:items-per-page="params.pageSize"
                v-model:page="params.pageNum"
                :items-per-page-options="[10, 20, 50, 100]"
                item-key="id"
                loading-text="正在加载..."
                items-per-page-text="每页条数"
                :loading="loading"
                @update:options="fetchQuestions"
                hover
                
            >
                <template #item.questionTitle="{ value, item }">
                    <div @click="questionStore.setCategoryAndQuestion(item.categoryName, item.id)" class="text-body-1" 
                        style="color: black;"
                    >
                        {{ value }}
                    </div>
                </template>
                <template #item.difficulty="{ value }">
                    <DifficultyChip :difficulty="value" />
                </template>
                <template #item.tagNames="{ value, item }">
                    <div @click="questionStore.setCategoryAndQuestion(item.categoryName, item.id)" class="d-flex flex-wrap ga-2 align-content-start">
                        <TagChips :tags="value" />
                    </div>
                </template>
                <template #item.viewCount="{ value }">
                    <FlameChip :value="value" />
                </template>
            </v-data-table-server>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { IconSettings, IconSearch, IconReload, IconFlame } from '@tabler/icons-vue';
import { getQuestionList } from '@/api'; 
import type { QuestionListRequest, PaginatedData, QuestionItem } from '@/api';
import { difficultyList } from '@/types/question/DifficultyType';
import TagsSelect from '@/pages/admin/question-bank/components/select/TagsSelect.vue';
import headers from './header';
import DifficultyChip from '@/components/question/DifficultyChip.vue';
import TagChips from '@/components/question/TagChips.vue';
import FlameChip from '@/components/question/FlameChip.vue';
import { useQuestionStore } from '@/stores/question';

const questionStore = useQuestionStore();

// 查询参数
const params = ref<QuestionListRequest>({
    pageNum: 1,
    pageSize: 10,
    categoryId: undefined,
    title: undefined,
    difficulty: undefined,
    tagNames: [],  // 确保始终是一个空数组而不是undefined
});

// 处理tagNames的计算属性，确保永远返回非空数组
const selectedTags = computed({
    get: () => params.value.tagNames || [],
    set: (val: string[]) => {
        params.value.tagNames = val;
    }
});

// 更新标签并触发查询
const updateTags = (tags: string[]) => {
    params.value.tagNames = tags;
    fetchQuestions();
};

// 问题列表数据
const questionList = ref<PaginatedData<QuestionItem>>({
  records: [] as QuestionItem[],
  totalRow: 0,
  totalPage: 0,
  pageNumber: 1,
  pageSize: 10
});

const loading = ref(false);

// 计算属性，提供总数据条数
const totalItemsCount = computed(() => {
  return questionList.value?.totalRow || 0;
});


const fetchQuestions = async (options?: any) => {
  loading.value = true;
  try {
    if (options) {
      params.value.pageNum = options.page;
      params.value.pageSize = options.itemsPerPage;
    }
    const res = await getQuestionList(params.value);
    if (res.code === 200 && res.data) {
      questionList.value = res.data;
    }
  } catch (error) {
    console.error('获取问题列表失败:', error);
  } finally {
    loading.value = false;
  }
};

// 重置所有筛选条件
const resetFilters = () => {
  params.value = {
    pageNum: 1,
    pageSize: params.value.pageSize, // 保留当前的每页条数
    categoryId: undefined,
    title: undefined,
    difficulty: undefined,
    tagNames: [] as string[]
  };
  fetchQuestions();
};

onMounted(() => {
  fetchQuestions();
});
</script>

