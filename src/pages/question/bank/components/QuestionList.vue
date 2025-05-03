<template>
    <div>

        <v-row dense>

            <v-col cols="12" md="4">
                <v-text-field
                    placeholder="搜索题目"
                    flat
                    rounded="md"
                    variant="solo-filled"
                    density="compact"
                    v-model="request.title"
                    @update:modelValue="fetchQuestions"
                    hide-details
                >
                    <template #prepend-inner>
                        <IconSearch class="text-medium-emphasis" />
                    </template>
                </v-text-field>
            </v-col>

            <v-col cols="12" md="5">
                <TagsSelect v-model:tagNames="safeTagNames" density="compact" />
            </v-col>

            <v-col cols="12" md="2">
                <v-select
                    v-model="request.difficulty"
                    :items="difficultyItems"
                    item-title="name"
                    item-value="value"
                    variant="solo-filled"
                    density="compact"
                    rounded="md"
                    flat
                    placeholder="难度"
                    chips
                    clearable
                    hide-details
                    @update:modelValue="fetchQuestions"
                    :list-props="{
                        nav: true,
                        density: 'comfortable',
                        rounded: 'md',
                    }"
                ></v-select>
            </v-col>

            <v-col cols="12" md="1">
                <v-btn
                    rounded="md"
                    class="text-medium-emphasis" 
                    icon
                    variant="tonal"
                    @click="reset"
                >
                    <IconReload />
                </v-btn>
            </v-col>

        </v-row>

        <perfect-scrollbar class="question-list-scroll">
            <div>
                <v-list v-for="item in allRecords" :key="item.id">
                    <v-list-item
                        @click="questionStore.setCategoryAndQuestion(item.categoryName, item.id)"
                        rounded="md"
                    >
                        <v-list-item-title>
                            <div class="d-flex justify-space-between">
                                <span class="text-body-1 mb-1 font-weight-bold d-inline-block text-truncate"
                                style="max-width: 350px;"
                                >{{ item.questionTitle }}</span>

                                <TagChips :tags="item.tagNames" />
                            </div>
                        </v-list-item-title>

                        <v-list-item-subtitle>
                            <div class="d-flex align-center justify-start ga-1">

                                <span>
                                    <DifficultyChip :difficulty="item.difficulty" />
                                </span>

                                
                                <IconFlame :size="16" />
                                <span>{{ item.viewCount }}</span>

                                
                            </div>
                        </v-list-item-subtitle>
                    </v-list-item>
                </v-list>

                <!-- 无限滚动加载指示器 -->
                <div 
                    v-if="hasMore" 
                    v-intersect="fetchMoreQuestions"
                    class="text-center my-2"
                >
                    <v-progress-circular
                        v-if="loading"
                        indeterminate
                        color="primary"
                        size="24"
                    ></v-progress-circular>
                    <span v-else>上拉加载更多</span>
                </div>
                <div v-else class="text-center my-2 text-caption">
                    没有更多数据了
                </div>
            </div>
        </perfect-scrollbar>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { getQuestionList } from '@/api';
import type { QuestionListRequest, PaginatedData, QuestionItem } from '@/api';
import { difficultyItems } from '@/types/question';
import { IconReload, IconFlame, IconSearch } from '@tabler/icons-vue';
import { useRoute } from 'vue-router';
import TagsSelect from '@/pages/admin/question-bank/components/select/TagsSelect.vue';
import TagChips from '@/components/question/TagChips.vue';
import DifficultyChip from '@/components/question/DifficultyChip.vue';
import { useQuestionStore } from '@/stores/question';
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';

const questionStore = useQuestionStore();

const props = defineProps<{
    categoryName: string;
}>();

const request = ref<QuestionListRequest>({
    pageNum: 1,
    pageSize: 10,
    categoryName: props.categoryName,
    title: undefined,
    difficulty: undefined,
    tagNames: [] as string[],
});

const response = ref<PaginatedData<QuestionItem>>({
    records: [] as QuestionItem[],
    totalRow: 0,
    totalPage: 0,
    pageNumber: 1,
    pageSize: 10
});

// 存储所有已加载的记录
const allRecords = ref<QuestionItem[]>([]);
// 加载状态
const loading = ref(false);
// 是否还有更多数据
const hasMore = ref(true);

// 监听props.categoryName的变化
watch(() => props.categoryName, (newCategoryName) => {
    if (newCategoryName && newCategoryName !== request.value.categoryName) {
        request.value.categoryName = newCategoryName;
        fetchQuestions();
    }
});

// 添加计算属性确保tagNames始终是数组
const safeTagNames = computed({
  get: () => request.value.tagNames || [],
  set: (val: string[]) => {
    request.value.tagNames = val;
    fetchQuestions();
  }
});

// 加载更多数据的函数
const fetchMoreQuestions = async () => {
    // 如果已经在加载或没有更多数据，则不执行任何操作
    if (loading.value || !hasMore.value || !request.value.categoryName) {
        return;
    }
    
    loading.value = true;
    try {
        const res = await getQuestionList(request.value);
        if (res.code === 200 && res.data) {
            // 更新响应对象，供可能需要的地方使用
            response.value = res.data;
            
            // 将新记录添加到累积数组中
            allRecords.value.push(...res.data.records);
            
            // 检查是否还有更多数据
            hasMore.value = res.data.records.length > 0 && 
                           response.value.pageNumber < response.value.totalPage;
            
            // 准备下一页请求
            if (hasMore.value) {
                request.value.pageNum = (request.value.pageNum || 1) + 1;
            }
        }
    } catch (error) {
        console.error('获取问题列表失败:', error);
        hasMore.value = false;
    } finally {
        loading.value = false;
    }
};

// 搜索或筛选时重置并重新获取数据
const fetchQuestions = () => {
    // 重置分页和累积数据
    request.value.pageNum = 1;
    allRecords.value = [];
    hasMore.value = true;
    
    fetchMoreQuestions();
};

const reset = () => {
    request.value = {
        pageNum: 1,
        pageSize: 10,
        categoryName: props.categoryName,
        title: undefined,
        difficulty: undefined,
        tagNames: [] as string[],
    };
    // 重置累积数据和状态
    allRecords.value = [];
    hasMore.value = true;
    
    if (request.value.categoryName) {
        fetchMoreQuestions();
    }
};

onMounted(() => {
    if (props.categoryName) {
        fetchMoreQuestions();
    }
});
</script>

<style scoped>
.question-list-scroll {
    height: calc(100vh - 160px);
    overflow-y: auto;
}
</style>
