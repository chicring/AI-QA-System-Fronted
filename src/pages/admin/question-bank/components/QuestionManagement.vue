<template>
  <div>
      <!-- 搜索 -->
      <div class="d-flex align-start ga-2">
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

          <!-- 重置 -->
          <v-btn class="text-medium-emphasis" rounded="md" variant="tonal" @click="resetFilters"> <IconReload   /></v-btn>

          <QuestionCreateDialog @save="handleQuestionCreated" />
          <QuestionImportDialog @import-success="handleQuestionCreated" />
        
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
              :headers="questionHeaders"
              v-model:items-per-page="params.pageSize"
              v-model:page="params.pageNum"
              :items-per-page-options="[10, 20, 50, 100]"
              item-key="name"
              loading-text="正在加载..."
              items-per-page-text="每页条数"
              no-data-text="暂无数据"
              :loading="loading"
              hover
              style="height: calc(100vh - 17rem - env(safe-area-inset-bottom))"
              @update:options="fetchQuestions"
          >
              <template #item.questionId="{ value }">
                <div class="text-body-1" style="color: black;">{{ value }}</div>
              </template>
              <template #item.questionTitle="{ value, item }">
                  <!-- <RouterLink
                      :to= "{
                          path: `/question/detail/${item.questionId}`,
                          query: {
                              categoryId: item.categoryId,
                          }
                      }"
                      class="text-decoration-none"
                  >
                  </RouterLink> -->

                  <div class="text-body-1" style="color: black;">{{ value }}</div>

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

              <template #item.action="{item}">
                <div class="d-flex ga-2">
                  <v-btn color="primary" variant="flat" size="small" class="action-button"
                      rounded="md"
                      @click="openQuestionDetail(item.questionId)"
                  >
                    <IconEye></IconEye>查看
                  </v-btn>
                  <v-btn color="warning" variant="flat" size="small" class="action-button"
                      rounded="md"
                  >
                    <IconPencil></IconPencil>编辑
                  </v-btn>
                  <ConfirmButton title="提示" content="确定要删除题目吗？" @confirm="handleDeleteQuestion(item.questionId as number)" color="error" variant="flat" size="small" rounded="md">
                    <IconTrash></IconTrash>删除
                  </ConfirmButton>
                </div>
              </template>
          </v-data-table-server>
      </div>
      
      <!-- 添加题目详情对话框 -->
      <QuestionDialog
        v-model:dialog="questionDetailDialog"
        :question-id="selectedQuestionId"
      />
  </div>
</template>

<script setup lang="ts">
import { ref,onMounted } from 'vue';
import { IconSettings, IconSearch, IconReload,IconFlame  } from '@tabler/icons-vue';
import { deleteQuestion, getQuestionList, getTagListGroup } from '@/api'; 
import type { QuestionListQueryParams, QuestionListResponse, QuestionItem, TagGroup } from '@/api/types/index';
import { difficultyList } from '@/types/question/DifficultyType';
import TagSelect from '@/components/question/TagSelect.vue';
import { questionHeaders } from './header';
import DifficultyChip from '@/components/question/difficultyChip.vue';
import {IconEye, IconPencil,IconTrash} from '@tabler/icons-vue'
import QuestionCreateDialog from './dialog/QuestionCreateDialog.vue';
import QuestionImportDialog from './dialog/QuestionImportDialog.vue';
import QuestionDialog from './dialog/QuestionDialog.vue';
import ConfirmButton from '@/components/shared/ConfirmButton.vue';
import { useToast } from 'vue-toast-notification';

const toast = useToast();
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

const fetchQuestions = async (options?: any) => {
  loading.value = true
  try {
    if (options) {
      params.value.pageNum = options.page
      params.value.pageSize = options.itemsPerPage
    }
    const res = await getQuestionList(params.value);
    questionList.value = res.data;
  } catch (error) {
    console.error('获取问题列表失败:', error);
  } finally {
    loading.value = false;
  }
};

// 删除题目
const handleDeleteQuestion = async (questionId: number) => {
  try {
    await deleteQuestion(questionId);
    fetchQuestions();
  } catch (error) { 
    toast.error('删除题目失败，请重试', {position:'top'});
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

// 处理问题创建成功
const handleQuestionCreated = () => {
  resetFilters(); // 刷新问题列表
};

// 题目详情弹窗状态
const questionDetailDialog = ref(false);
const selectedQuestionId = ref<number>(0);

// 打开题目详情
const openQuestionDetail = (questionId: number) => {
  selectedQuestionId.value = questionId;
  questionDetailDialog.value = true;
};

onMounted(() => {
fetchTagListGroup();
});
</script>

<style lang="scss">
.v-table th {
  white-space: nowrap;
}

.v-table__wrapper {
  border-radius: 0;
}
</style>