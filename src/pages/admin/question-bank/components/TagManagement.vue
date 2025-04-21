<template>
  <div>
    <div class="d-flex align-start ga-2 mb-5">
      <v-row justify="space-between">
        <v-col cols="12" md="4">
          <div class="d-flex ga-2">
            <v-text-field
              label="标签名称"
              v-model="params.q"
              flat
              rounded="md"
              variant="solo-filled"
              density="compact"
              @update:modelValue="fetchTagList"
            ></v-text-field>

            <v-btn icon class="text-medium-emphasis" rounded="md" flat @click="fetchTagList"> <IconReload   /></v-btn>
          </div>

        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12" md="6">
          <div class="d-flex justify-end">
            <TagCreateDialog @save="handleCreateSuccess" />
          </div>
        </v-col>
      </v-row>
    </div>

    <div>
      <v-data-table-server
        :headers="tagHeaders"
        :items="response.data"
        :items-length="response.total"
        v-model:items-per-page="params.pageSize"
        v-model:page="params.pageNum"
        :items-per-page-options="[10, 20, 50, 100]"
        item-key="id"
        loading-text="正在加载..."
        no-data-text="暂无数据"
        items-per-page-text="每页条数"
        @update:options="fetchTagList"
        :loading="loading"
        hover
        style="height: calc(100vh - 17rem - env(safe-area-inset-bottom))"
      >
        <template #item.id="{ value }">
          <v-chip size="small" variant="tonal" color="primary">
            {{ value }}
          </v-chip>
        </template>
        <template #item.tagName="{ value }">
          <v-chip class="py-1 px-2" size="small" variant="tonal" color="primary" rounded="md">
            {{ value }}
          </v-chip>
        </template>
        <template #item.sortNum="{ value }">
          <span>{{ value }}</span>
        </template>
        <template #item.categoryId="{ value }">
          <span>{{ value }}</span>
        </template>
        <template #item.categoryName="{ value }">
          <span>{{ value }}</span>
        </template>
        <template #item.actions="{ item }">
          <div class="d-flex ga-2">
            <TagEditDialog :model-value="item" @save="handleEditSuccess" />

            <ConfirmButton title="提示" content="确定要删除标签吗？" @confirm="confirmDeleteTag(item)" color="error" variant="flat" size="small" rounded="md">
              <IconTrash></IconTrash>删除
            </ConfirmButton>
            <!-- <v-btn color="error" variant="flat" size="small" rounded="md" @click="confirmDeleteTag(item)">
              <IconTrash></IconTrash>删除
            </v-btn> -->
          </div>
        </template>
    </v-data-table-server>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { IconSearch, IconReload, IconPlus, IconEye } from '@tabler/icons-vue';
import { IconPencil, IconTrash } from '@tabler/icons-vue';
import { tagHeaders } from './header';
import type { PageResponse, TagItem } from '@/api/types';
import { getTagList, deleteTag } from '@/api';
import TagCreateDialog from './dialog/TagCreateDialog.vue';
import TagEditDialog from './dialog/TagEditDialog.vue';
import ConfirmButton from '@/components/shared/ConfirmButton.vue';
import { useToast } from 'vue-toast-notification';

const toast = useToast();
const loading = ref(false)

const params = ref({
  pageNum: 1,
  pageSize: 10,
  q: null,
})

const response = ref<PageResponse<TagItem>>({
  pageNum: 1,
  pageSize: 10,
  total: 0,
  data: [] as TagItem[]
})

const fetchTagList = async (options?: any) => {
  try {
    loading.value = true
    if (options) {
      params.value.pageNum = options.page
      params.value.pageSize = options.itemsPerPage
    }
    const res = await getTagList(params.value.pageNum, params.value.pageSize, params.value.q)
    response.value = res.data
  } catch (error) {
    console.error('获取标签列表失败:', error);
  } finally {
    loading.value = false
  }
}

// 添加标签
const addTag = () => {

};

// 编辑标签（这里只是占位，实际实现会更复杂）
const editTag = (tag: any) => {

};

// 删除标签确认
const confirmDeleteTag = async (tag: any) => {
  try {
      loading.value = true;
      await deleteTag(tag.id);
      fetchTagList(); // 刷新列表
    } catch (error) {
      toast.error('删除标签失败，请重试', {position:'top'});
    } finally {
      loading.value = false;
    }
};

// 处理标签创建成功
const handleCreateSuccess = () => {
  fetchTagList(); // 刷新标签列表
};

// 处理标签编辑成功
const handleEditSuccess = () => {
  fetchTagList(); // 刷新标签列表
};

</script>

<style lang="scss">
.v-table th {
  white-space: nowrap;
}

.v-table__wrapper {
  border-radius: 0;
}
</style>