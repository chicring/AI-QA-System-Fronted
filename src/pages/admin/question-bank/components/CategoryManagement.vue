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
      :items="response.data"
      :items-length="response.total"
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
import type { CategoryItem, CategoryListResponse, CategoryListQueryParams } from '@/api/types';
import { getQuestionCategoryList } from '@/api';
import CategoryCreateDialog from './dialog/CategoryCreateDialog.vue';
import CategoryEditDialog from './dialog/CategoryEditDialog.vue';
import ConfirmButton from '@/components/shared/ConfirmButton.vue';
const params = ref<CategoryListQueryParams>({
  pageNum: 1,
  pageSize: 10,
  q: null,
})

const response = ref<CategoryListResponse>({
  pageNum: 1,
  pageSize: 10,
  total: 0,
  data: [] as CategoryItem[]
})

const isLoading = ref(false)

const fetchCategories = async (options?: any) => {
  try {
    isLoading.value = true
    if (options) {
      params.value.pageNum = options.page
      params.value.pageSize = options.itemsPerPage
    }
    const res = await getQuestionCategoryList(params.value);
    response.value = res.data;
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
      // 这里应该调用API来删除分类，暂时只是模拟
      console.log('删除分类:', id);
      
      // 从本地列表移除
      const index = response.value.data.findIndex(item => item.id === id);
      if (index > -1) {
        response.value.data.splice(index, 1);
        response.value.total--;
      }
  } catch (error) {
      console.error('删除分类失败:', error);
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