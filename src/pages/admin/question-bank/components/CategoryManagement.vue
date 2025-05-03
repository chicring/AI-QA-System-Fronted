<template>
  <div>
    <div class="d-flex align-start ga-2 mb-5">
      <v-row justify="space-between">
        <v-col cols="12" md="4">
          <div class="d-flex ga-2">
            <v-text-field
              label="分类名称"
              v-model="params.q"
              flat
              rounded="md"
              variant="solo-filled"
              density="compact"
              @update:modelValue="fetchCategories"
            ></v-text-field>

            <v-btn icon class="text-medium-emphasis" rounded="md" flat @click="fetchCategories"> <IconReload   /></v-btn>
          </div>
        </v-col>

        <v-spacer></v-spacer>
        <v-col cols="12" md="6">
          <div class="d-flex justify-end">
            <CategoryCreateDialog @created="fetchCategories" />
          </div>
        </v-col>
      </v-row>
    </div>

    <v-data-table-server
      :headers="categoryHeaders"
      :items="response.data.records"
      :items-length="totalItemsCount"
      v-model:items-per-page="params.pageSize"
      v-model:page="params.pageNum"
      :items-per-page-options="[10, 20, 50, 100]"
      item-key="id"
      :loading="isLoading"
      loading-text="正在加载..."
      no-data-text="暂无数据"
      items-per-page-text="每页条数"
      hover
      style="height: calc(100vh - 17rem - env(safe-area-inset-bottom))"
      @update:options="fetchCategories"
    >
      <template #item.id="{ value }">
        <span>{{ value }}</span>
      </template>
      <template #item.categoryName="{ value }">
        <span>{{ value }}</span>
      </template>
      <template #item.imageUrl="{ value }">
        <v-img
          :src="value"
          width="50"
          height="50"
          rounded="sm"
        ></v-img>
      </template>
      <template #item.description="{ value }">
        <span>{{ value }}</span>
      </template>
      <!-- <template #item.categoryLevel="{ value }">
        <span>{{ value }}</span>
      </template>
      <template #item.parentCategoryId="{ value }">
        <span>{{ value }}</span>
      </template> -->
      <template #item.sortNum="{ value }">
        <span>{{ value }}</span>
      </template>
      <template #item.actions="{ item }">
        <div class="d-flex ga-2">
          <!-- <v-btn color="primary" variant="flat" size="small" rounded="md">
            <IconEye></IconEye>查看
          </v-btn> -->
          <CategoryEditDialog :model-value="item" @save="fetchCategories" />
          <ConfirmButton title="提示" content="确定要删除分类吗？" @confirm="deleteCategory(item.id as number)" color="error" variant="flat" size="small" rounded="md">
            <IconTrash></IconTrash>删除
          </ConfirmButton>
          <!-- <v-btn color="error" variant="flat" size="small" rounded="md" @click="deleteCategory(item.id as number)">
            <IconTrash></IconTrash>删除
          </v-btn> -->
        </div>
      </template>
    </v-data-table-server>
  </div>

</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { IconReload, IconPlus } from '@tabler/icons-vue';
import { IconEye, IconPencil, IconTrash } from '@tabler/icons-vue';
import { categoryHeaders } from './header';
import type { CategoryItem, CategoryListResponse, CategoryListQueryParams } from '@/api';
import { getCategoryList, saveCategory } from '@/api';
import CategoryCreateDialog from './dialog/CategoryCreateDialog.vue';
import CategoryEditDialog from './dialog/CategoryEditDialog.vue';
import ConfirmButton from '@/components/shared/ConfirmButton.vue';
import { useToast } from 'vue-toast-notification';

const toast = useToast();
const params = ref<CategoryListQueryParams>({
  pageNum: 1,
  pageSize: 10,
  q: undefined,
})

const response = ref<CategoryListResponse>({
  code: 0,
  msg: '',
  requestId: '',
  data: {
    records: [] as CategoryItem[],
    totalRow: 0,
    totalPage: 0,
    pageNumber: 1,
    pageSize: 10
  }
})

const isLoading = ref(false)

// 计算属性，提供总数据条数
const totalItemsCount = computed(() => {
  return response.value?.data?.totalRow || 0;
})

const fetchCategories = async (options?: any) => {
  try {
    isLoading.value = true
    if (options) {
      params.value.pageNum = options.page
      params.value.pageSize = options.itemsPerPage
    }
    const res = await getCategoryList(params.value);
    if (res.code === 200) {
      response.value = res;
    }
  } catch (error) {
    console.error('获取分类列表失败:', error);
  } finally {
    isLoading.value = false
  }
}


// 处理保存分类
const handleSaveCategory = async () => {
  fetchCategories();
};


// 删除分类
const deleteCategory = async (id: number) => {
  try {
      toast.warning('删除分类功能暂未实现', {position: 'top'});
      // 从本地列表移除，模拟效果
      const index = response.value.data.records.findIndex(item => item.id === id);
      if (index > -1) {
        response.value.data.records.splice(index, 1);
        response.value.data.totalRow--;
      }
  } catch (error) {
      console.error('删除分类失败:', error);
      toast.error('删除分类失败', {position: 'top'});
  }
};

onMounted(() => {
  fetchCategories();
})
</script>

<style lang="scss">
.v-table th {
  white-space: nowrap;
}

.v-table__wrapper {
  border-radius: 0;
}
</style>