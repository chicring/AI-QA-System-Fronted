<template>
    <div>
        <div class="d-flex align-start ga-2">

            <v-text-field
                        placeholder="搜索题目"
                        flat
                        rounded="md"
                        variant="solo-filled"
                        density="compact"
                        v-model="request.title"
                        @update:modelValue="fetchQuestions"
                    >
                        <template #prepend-inner>
                            <IconSearch class="text-medium-emphasis" />
                        </template>
            </v-text-field>

            <TagSelect :model-value="request.tagNames" :list="tagList" @update:modelValue="fetchQuestions" />


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
                    @update:modelValue="fetchQuestions"
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
            <v-list v-for="item in response.data">
                <v-list-item
                        :to= "{
                            path: `/question/detail/${item.questionId}`,
                            query: {
                                categoryId: item.categoryId,
                            }
                        }"
                >
                    <v-list-item-title>
                        <div class="d-flex justify-space-between">
                            <span>{{ item.questionTitle }}</span>

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
import { getQuestionList,getTagListGroup } from '@/api/question';
import type {QuestionListQueryParams,QuestionListResponse,QuestionItem,TagGroup } from '@/api/types/index';
import { difficultyItems } from '@/types/question';
import { IconReload, IconFlame,IconSearch } from '@tabler/icons-vue';
import { useRoute } from 'vue-router';
import TagSelect from '@/components/question/TagSelect.vue';
import TagChips from '@/components/question/TagChips.vue';
import DifficultyChip from '@/components/question/difficultyChip.vue';

const categoryId = useRoute().params.id as string

const request = ref<QuestionListQueryParams>({
    pageNum: 1,
    pageSize: 10,
    categoryId: categoryId ? parseInt(categoryId) : null,
    title: null,
    difficulty: null,
    tagNames: [] as string[],
})

const response = ref<QuestionListResponse>({
    pageNum: 1,
    pageSize: 10,
    total: 0,
    data: [] as QuestionItem[]
})
const tagList = ref<TagGroup[]>([]);
const fetchTagListGroup = async () => {
  try {
    const res = await getTagListGroup();
    tagList.value = res.data;
  } catch (error) {
    console.error('获取标签列表失败:', error);
  }
};
const fetchQuestions = async () => {
    const res = await getQuestionList(request.value)
    response.value = res.data
}

const reset = () => {
    request.value = {
        pageNum: 1,
        pageSize: 10,
        categoryId: null,
        title: null,
        difficulty: null,
        tagNames: [] as string[],
    }
    fetchQuestions()
}

const jumpToPage = (page: number) => {
    request.value.pageNum = page
    fetchQuestions()
}

const handlePageChange = (page: number) => {
    request.value.pageNum = page
    fetchQuestions()
}

onMounted(() => {
    fetchQuestions()
    fetchTagListGroup()
})
</script>

<style scoped>

</style>
