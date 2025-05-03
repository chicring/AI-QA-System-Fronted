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
                  hide-details
                  chips
                  @update:modelValue="fetchQuestions"
                  :list-props="{
                      nav: true,
                      density: 'comfortable',
                      rounded: 'md',
                  }"
                  clearable
                ></v-select>
          </v-col>

          <v-col cols="12" md="4">
              <v-text-field
                  placeholder="搜索题目"
                  flat
                  rounded="md"
                  variant="solo-filled"
                  density="compact"
                  v-model="params.title"
                  hide-details
                  @update:modelValue="fetchQuestions"
              >
                  <template #prepend-inner>
                      <IconSearch class="text-medium-emphasis" />
                  </template>
              </v-text-field>
          </v-col>

          <v-col cols="12" md="5">
              <TagsSelect v-model:tagNames="selectedTags" @update:tagNames="updateTags" :list="tagList" />
          </v-col>

          <v-col cols="12" md="1">
            <v-btn class="text-medium-emphasis mr-2" rounded="md" variant="tonal" @click="resetFilters"> <IconReload /></v-btn>
          </v-col>
      </v-row>
      <div class="d-flex ga-2 mt-2 justify-end">
        <!-- 重置 -->

        <QuestionCreateDialog @save="handleQuestionCreated" />
        <QuestionImportDialog @import-success="handleQuestionCreated" />
      </div>

      <div class="d-flex ga-2 mt-2">
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
              :items-length="totalItemsCount"
              :items="questionList.records"
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
                  <TagChips :tags="value" />
              </template>
              <template #item.viewCount="{ value }">
                  <FlameChip :value="value" />
              </template>

              <template #item.action="{item}">
                <div class="d-flex ga-2">
                  <v-btn color="primary" variant="flat" size="small" class="action-button"
                      rounded="md"
                      @click="openQuestionDetail(item.id)"
                  >
                    <IconEye></IconEye>查看
                  </v-btn>
                  <v-btn color="warning" variant="flat" size="small" class="action-button"
                      rounded="md"
                      @click="openQuestionEdit(item.id)"
                  >
                    <IconPencil></IconPencil>编辑
                  </v-btn>
                  <ConfirmButton title="提示" content="确定要删除题目吗？" @confirm="handleDeleteQuestion(item.id)" color="error" variant="flat" size="small" rounded="md">
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
      
      <!-- 编辑题目对话框 -->
      <QuestionEditDialog
        v-model:dialog="questionEditDialog"
        :question-id="selectedQuestionId"
        @save="handleQuestionUpdated"
      />
  </div>
</template>

<script setup lang="ts">
import { ref,onMounted, computed } from 'vue';
import { IconSettings, IconSearch, IconReload,IconFlame  } from '@tabler/icons-vue';
import { deleteQuestion, getQuestionList, getAllTags } from '@/api'; 
import type { QuestionListRequest, QuestionListResponse, QuestionItem, TagItem, PaginatedData } from '@/api';
import { difficultyList } from '@/types/question/DifficultyType';
import TagsSelect from '@/pages/admin/question-bank/components/select/TagsSelect.vue';
import { questionHeaders } from './header';
import DifficultyChip from '@/components/question/DifficultyChip.vue';
import {IconEye, IconPencil,IconTrash} from '@tabler/icons-vue'
import QuestionCreateDialog from './dialog/QuestionCreateDialog.vue';
import QuestionImportDialog from './dialog/QuestionImportDialog.vue';
import QuestionDialog from './dialog/QuestionDialog.vue';
import QuestionEditDialog from './dialog/QuestionEditDialog.vue';
import ConfirmButton from '@/components/shared/ConfirmButton.vue';
import { useToast } from 'vue-toast-notification';
import TagChips from '@/components/question/TagChips.vue';
import FlameChip from '@/components/question/FlameChip.vue';

const toast = useToast();
// 查询参数
const params = ref<QuestionListRequest>({
  pageNum: 1,
  pageSize: 10,
  categoryId: undefined,
  title: undefined,
  difficulty: undefined,
  tagNames: [] as string[],
})

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

const tagList = ref<TagItem[]>([]);
const loading = ref(false)

// 计算属性，提供总数据条数
const totalItemsCount = computed(() => {
  return questionList.value?.totalRow || 0;
})

const fetchTagListGroup = async () => {
try {
  const res = await getAllTags();
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
    if (res.code === 200 && res.data) {
      questionList.value = res.data;
    }
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
  categoryId: undefined,
  title: undefined,
  difficulty: undefined,
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
const questionEditDialog = ref(false);
const selectedQuestionId = ref<number>(0);

// 打开题目详情
const openQuestionDetail = (questionId: number) => {
  selectedQuestionId.value = questionId;
  questionDetailDialog.value = true;
};

// 打开题目编辑
const openQuestionEdit = (questionId: number) => {
  selectedQuestionId.value = questionId;
  questionEditDialog.value = true;
};

// 处理问题更新成功
const handleQuestionUpdated = () => {
  toast.success('题目更新成功', {position:'top'});
  fetchQuestions(); // 刷新问题列表
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