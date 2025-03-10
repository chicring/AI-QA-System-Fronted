<template>
    <div>
        <!-- 搜索 -->
        <div class="d-flex align-start ga-2">

            <v-select
                placeholder="状态"
                variant="solo-filled"
                flat
                rounded="md"
                disabled
                density="compact"
            ></v-select>

            <v-select
                :items="difficultyList"
                item-title="name"
                item-value="value"
                v-model="params.difficulty"
                @update:modelValue="fetchQuestions"
                placeholder="难度"
                variant="solo-filled"
                flat
                rounded="md"
                chips
                density="compact"
            ></v-select>

            <TagSelect :model-value="params.tagNames" :list="tagList" @update:modelValue="fetchQuestions" />

            <v-text-field
                placeholder="搜索题目"
                flat
                rounded="md"
                variant="solo-filled"
                density="compact"
                v-model="params.title"
                @update:modelValue="fetchQuestions"
            >
                <template #prepend-inner>
                    <IconSearch class="text-medium-emphasis" />
                </template>
            </v-text-field>

            <!-- 设置 -->
            <v-btn class="text-medium-emphasis" rounded="md" variant="tonal"> <IconSettings  /></v-btn>

            <!-- 重置 -->
            <v-btn class="text-medium-emphasis" rounded="md" variant="tonal" @click="resetFilters"> <IconReload   /></v-btn>
        </div>

        <div class="d-flex ga-2">
            <v-chip
                v-for="tag in params.tagNames"
                :key="tag"
                closable
                size="small"
                @click:close="handleTagClick(tag)"
                
            >
                {{ tag }}
            </v-chip>
        </div>

        <!-- 表格 -->
        <div>
            <v-data-table-server
                :items-length="questionList.total"
                :items="questionList.data"
                :headers="headers"
                v-model:items-per-page="params.pageSize"
                v-model:page="params.pageNum"
                :items-per-page-options="[10, 20, 50, 100]"
                item-key="name"
                loading-text="正在加载..."
                items-per-page-text="每页条数"
                :loading="loading"
                @update:options="fetchQuestions"
            >
                <template #item.questionTitle="{ value, item }">
                    <RouterLink
                        :to= "{
                            path: `/question/detail/${item.questionId}`,
                            query: {
                                categoryId: item.categoryId,
                            }
                        }"
                        class="text-decoration-none"
                    >
                        <div class="text-body-1" style="color: black;">{{ value }}</div>
                    </RouterLink>
                </template>
                <template #item.difficulty="{ value }">
                    <DifficultyChip :difficulty="value" />
                </template>
                <template #item.tagNames="{ value }">
                    <div class="d-flex flex-wrap ga-2 align-content-start">
                        <v-chip v-for="tag in value" :key="tag" variant="outlined" size="small" rounded="sm">
                            {{ tag }}
                        </v-chip>
                    </div>
                </template>
                <template #item.viewCount="{ value }">
                    <div class="text-body-1 d-flex  align-center text-medium-emphasis" >
                        <IconFlame :size="20"></IconFlame>
                        <span>{{ value}}</span>
                    </div>
                </template>
            </v-data-table-server>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref,onMounted } from 'vue';
import { IconSettings, IconSearch, IconReload,IconFlame  } from '@tabler/icons-vue';
import { getQuestionList,getTagListGroup } from '@/api/question'; 
import type { QuestionListQueryParams, QuestionListResponse, QuestionItem, TagGroup } from '@/api/types/index';
import { difficultyList } from '@/types/question/DifficultyType';
import TagSelect from '@/components/question/TagSelect.vue';
import headers from './header';
import DifficultyChip from '@/components/question/difficultyChip.vue';
// 查询参数
const params = ref<QuestionListQueryParams>({
    pageNum: 1,
    pageSize: 10,
    categoryId: null,
    title: null,
    difficulty: null,
    tagNames: [] as string[],
})

// 问题列表数据
const questionList = ref<QuestionListResponse>({
  pageNum: 1,
  pageSize: 10,
  total: 0,
  data: [] as QuestionItem[]
});

const tagList = ref<TagGroup[]>([]);
const loading = ref(false)

const fetchTagListGroup = async () => {
  try {
    const res = await getTagListGroup();
    tagList.value = res.data;
  } catch (error) {
    console.error('获取标签列表失败:', error);
  }
};
const handleTagClick = (tag: string) => {
    
    if (params.value.tagNames!.includes(tag)) {
        params.value.tagNames!.splice(params.value.tagNames!.indexOf(tag), 1);
    } else {
        params.value.tagNames!.push(tag);
    }
    fetchQuestions();
};

const fetchQuestions = async () => {
  loading.value = true
  try {
    const res = await getQuestionList(params.value);
    questionList.value = res.data;
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
    pageSize: 10, // 保留当前的每页条数
    categoryId: null,
    title: null,
    difficulty: null,
    tagNames: [] as string[]
  };
  fetchQuestions();
};

onMounted(() => {
  fetchTagListGroup();
});
</script>

