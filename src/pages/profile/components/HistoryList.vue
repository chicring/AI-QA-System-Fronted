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
            <v-list>
                <v-list-item v-for="item in response.data" :key="item.questionId">
                    <v-list-item-title>
                        <div class="d-flex justify-space-between">
                            <RouterLink 
                                :to= "{
                                    path: `/question/detail/${item.questionId}`,
                                    query: {
                                        categoryId: item.categoryId,
                                    }
                                }"
                                class="text-decoration-none"
                            >
                                <span style="color: black;">{{ item.questionTitle }}</span>
                            </RouterLink>
                    

                            <div class="d-flex flex-wrap ga-2 align-content-start">
                                <v-chip v-for="tag in item.tagNames" :key="tag" variant="outlined" size="small" rounded="sm">
                                    {{ tag }}
                                </v-chip>
                            </div>
                        </div>
                    </v-list-item-title>

                    <v-list-item-subtitle>
                        <div class="d-flex align-center justify-start ga-2">
                            <span>{{ item.lastViewTime }}</span>

                            <IconEye />
                            <span>已刷题 {{ item.viewCount }} 次</span>

                            <v-chip size="small" rounded="sm">
                                {{ historyStatusItems.find(i => i.value === item.status)?.label }}
                            </v-chip>
                        </div>
                    </v-list-item-subtitle>
                </v-list-item>
            </v-list>

            <v-pagination
              v-model="response.pageNum"
              :length="Math.ceil(response.total / response.pageSize)"
              class="my-4"
              @next="jumpToPage(response.pageNum + 1)"
              @prev="jumpToPage(response.pageNum - 1)"
              @update:modelValue="handlePageChange"
            ></v-pagination>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getQueryHistory } from '@/api';
import type { QueryHistoryRequest, QueryHistoryResponse } from '@/api/types/index';
import { historyStatusItems, difficultyItems } from '@/types/question';
import { IconReload, IconEye,IconSearch } from '@tabler/icons-vue';


const request = ref<QueryHistoryRequest>({
    pageNum: 1,
    pageSize: 10,
    status: null,
    q: null,
    difficulty: null
})

const response = ref<QueryHistoryResponse>({
    pageNum: 0,
    pageSize: 0,
    total: 0,
    data: [] 
})

const fetchHistory = async () => {
    const res = await getQueryHistory(request.value)
    response.value = res.data
}

const reset = () => {
    request.value = {
        pageNum: 1,
        pageSize: 10,
        status: null,
        q: null,
        difficulty: null
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
