<template>
    <div>
        <div class="mt-3 mb-5">
            <strong>刷题记录</strong>
        </div>
        <div class="d-flex align-start ga-2">

            <v-text-field
                        placeholder="搜索题目"
                        flat
                        rounded="md"
                        variant="solo-filled"
                        density="compact"
                        v-model="request.q"
                        @update:modelValue="fetchHistory"
                    >
                        <template #prepend-inner>
                            <IconSearch class="text-medium-emphasis" />
                        </template>
            </v-text-field>

            <v-select
                        v-model="request.status"
                        :items="historyStatusItems"
                        item-title="label"
                        item-value="value"
                        variant="solo-filled"
                        density="compact"
                        rounded="md"
                        flat
                        placeholder="状态"
                        @update:modelValue="fetchHistory"
                        :list-props="{
                            nav: true,
                            density: 'comfortable',
                            rounded: 'md',
                        }"
            ></v-select>

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
                    @update:modelValue="fetchHistory"
                    :list-props="{
                        nav: true,
                        density: 'comfortable',
                        rounded: 'md',
                    }"
            ></v-select>
            
            <v-btn
                rounded="md"
                class="text-medium-emphasis" 
                icon
                variant="tonal"
               @click="reset"
            >
                <IconReload />
            </v-btn>
        </div>

        <div>
            <v-list v-if="response.records && response.records.length > 0">
                <v-list-item rounded="md" v-for="item in response.records" :key="item.questionId" class="mb-2"
                @click="item.question && item.question.categoryName && item.question.id && questionStore.setCategoryAndQuestion(item.question.categoryName, item.question.id)">
                    <v-list-item-title>
                        <div class="d-flex justify-space-between">
                            <span class="text-body-1">{{ item.question?.questionTitle || '无标题' }}</span>

                            <TagChips :tags="item.question?.tagNames || []" />
                        </div>
                    </v-list-item-title>

                    <v-list-item-subtitle>
                        <div class="d-flex align-center justify-start ga-2">
                            <span>{{ item.updateTime || '-' }}</span>

                            <IconEye />
                            <span>已刷题 {{ item.viewCount || 0 }} 次</span>

                            <v-chip size="small" rounded="sm" >
                                {{ historyStatusItems.find(i => i.value === item.status)?.label || '未知状态' }}
                            </v-chip>
                        </div>
                    </v-list-item-subtitle>
                </v-list-item>
            </v-list>
            <div v-else class="text-center pa-4">
                <p>暂无刷题记录</p>
            </div>

            <v-pagination
              v-model="response.pageNumber"
              :length="response.pageSize > 0 ? Math.ceil(totalItemsCount / response.pageSize) : 0"
              class="my-4"
              @next="jumpToPage(response.pageNumber + 1)"
              @prev="jumpToPage(response.pageNumber - 1)"
              @update:modelValue="handlePageChange"
            ></v-pagination>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { getHistoryList } from '@/api';
import type { HistoryListQueryParams, HistoryListResponse } from '@/api/types/history';
import { historyStatusItems, difficultyItems } from '@/types/question';
import { IconReload, IconEye,IconSearch } from '@tabler/icons-vue';
import TagChips from '@/components/question/TagChips.vue';
import { useQuestionStore } from '@/stores/question';

const questionStore = useQuestionStore();

const request = ref<HistoryListQueryParams>({
    pageNum: 1,
    pageSize: 10,
    status: undefined,
    q: undefined,
    difficulty: undefined
})

const response = ref<HistoryListResponse['data']>({
    records: [],
    pageNumber: 0,
    pageSize: 10,
    totalRow: 0,
    totalPage: 0,
})

// 计算属性，提供总数据条数
const totalItemsCount = computed(() => {
  return response.value?.totalRow || 0;
});

const fetchHistory = async () => {
    try {
        const res = await getHistoryList(request.value)
        // 确保res.data存在且有效，否则使用默认值
        if (res && res.data) {
            response.value = {
                records: Array.isArray(res.data.records) ? res.data.records : [],
                pageNumber: res.data.pageNumber || 0,
                pageSize: res.data.pageSize || 10,
                totalRow: res.data.totalRow || 0,
                totalPage: res.data.totalPage || 0,
            }
        }
    } catch (error) {
        console.error('获取历史记录失败:', error)
        // 出错时重置为默认值
        response.value = {
            records: [],
            pageNumber: 0,
            pageSize: 10,
            totalRow: 0,
            totalPage: 0,
        }
    }
}

const reset = () => {
    request.value = {
        pageNum: 1,
        pageSize: 10,
        status: undefined,
        q: undefined,
        difficulty: undefined
    }
    fetchHistory()
}

const jumpToPage = (page: number) => {
    request.value.pageNum = page
    fetchHistory()
}

const handlePageChange = (page: number) => {
    request.value.pageNum = page
    fetchHistory()
}

fetchHistory()
</script>

<style scoped>

</style>
