<template>
    <v-autocomplete
        v-model="selectedTags"
        :items="tagOptions"
        :loading="loading"
        item-title="tagName"
        item-value="tagName"
        placeholder="请选择标签"
        :hide-details="!showMaxError"
        clearable
        multiple
        chips
        closable-chips
        @update:search="handleSearch"
        @update:model-value="handleTagsChange"
        :error="!!errorMessage || showMaxError"
        :error-messages="errorMessage || (showMaxError ? `最多允许选择${MAX_TAGS}个标签` : '')"
        rounded="md"
        flat
        variant="solo-filled"
        density="compact"
    
        :menu-props="{ 
            maxHeight: 300,
            maxWidth: 0,
            offset: 4
        }"
        :list-props="{
            rounded: 'md',
            class: 'd-flex flex-wrap'
        }"
    >
        
        <!-- 自定义标签项 -->
        <template #item="{ item, props }">
            <v-chip v-bind="props"  size="small" 
                :color="isSelected(item.raw.tagName) ? 'primary' : undefined"
                rounded="lg"
                class="ma-1"
                :disabled="isMaxTagsReached && !isSelected(item.raw.tagName)"
            >
                    {{ item.raw.tagName }}
            </v-chip>
        </template>

        <!-- 自定义选中标签显示 -->
        <template #selection="{ item, index }">
            <v-chip
                size="small"
                closable
                variant="outlined"
                color="primary"
                rounded="lg"
                class="selected-chip ma-1"
            >
                {{ item }}
            </v-chip>
        </template>

        <!-- 无数据提示 -->
        <template #no-data>
            <v-list-item v-if="!tagOptions.length && !loading">
                <v-list-item-subtitle>未找到匹配的标签</v-list-item-subtitle>
            </v-list-item>
            <v-list-item v-else-if="loading" class="text-center">
                <v-progress-circular indeterminate size="24" />
            </v-list-item>
        </template>
    </v-autocomplete>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue';
import { getTagList } from '@/api';
import type { TagItem, TagListQueryParams } from '@/api';

// 定义常量
const MAX_TAGS = 6;

// 定义Props
const props = defineProps<{
    tagNames: string[]
}>();

// 定义Emits
const emit = defineEmits<{
    (e: 'update:tagNames', value: string[]): void
}>();

// 状态
const selectedTags = ref<string[]>(props.tagNames || []);
const tagOptions = ref<TagItem[]>([]);
const loading = ref<boolean>(false);
const errorMessage = ref<string>('');
const showMaxError = ref<boolean>(false);

// 计算属性
const isMaxTagsReached = computed(() => {
    return selectedTags.value.length >= MAX_TAGS;
});

// 查询参数
const params = ref<TagListQueryParams>({
    pageNum: 1,
    pageSize: 100,
    q: '' // 确保q有初始值
});

// 防抖定时器
let searchDebounce: number | null = null;

// 处理标签变化
const handleTagsChange = (tags: string[]) => {
    if (tags.length > MAX_TAGS) {
        // 如果超过最大限制，截取前MAX_TAGS个标签
        selectedTags.value = tags.slice(0, MAX_TAGS);
        showMaxError.value = true;
        // 3秒后自动隐藏错误提示
        setTimeout(() => {
            showMaxError.value = false;
        }, 3000);
        return;
    }
    
    showMaxError.value = false;
    // 正常情况下更新标签
    selectedTags.value = tags;
};

// 处理搜索输入
const handleSearch = (value: string) => {
    // 清除之前的定时器
    if (searchDebounce !== null) {
        clearTimeout(searchDebounce);
    }
    
    // 设置新的定时器
    searchDebounce = window.setTimeout(() => {
        params.value.q = value || '';
        fetchTags();
    }, 300); // 300ms延迟
};

// 获取标签列表
const fetchTags = async () => {
    loading.value = true;
    errorMessage.value = '';
    
    try {
        const response = await getTagList(params.value);
        if (response.code === 200 && response.data) {
            tagOptions.value = response.data.records;
        } else {
            errorMessage.value = '获取标签列表失败';
        }
    } catch (error: any) {
        console.error('获取标签列表失败:', error);
        errorMessage.value = error.msg || '获取标签列表失败';
    } finally {
        loading.value = false;
    }
};

// 判断是否选中
const isSelected = (tagName: string) => {
    return selectedTags.value.includes(tagName);
};

// 组件挂载时加载标签列表
onMounted(() => {
    fetchTags();
    // 初始检查是否已超过最大标签数
    if (props.tagNames && props.tagNames.length > MAX_TAGS) {
        selectedTags.value = props.tagNames.slice(0, MAX_TAGS);
        showMaxError.value = true;
        setTimeout(() => {
            showMaxError.value = false;
        }, 3000);
    }
});

// 监听标签变化并通知父组件
watch(selectedTags, (newVal) => {
    emit('update:tagNames', newVal);
});

// 监听props变化
watch(() => props.tagNames, (newVal) => {
    if (newVal && newVal.length > MAX_TAGS) {
        selectedTags.value = newVal.slice(0, MAX_TAGS);
        showMaxError.value = true;
        setTimeout(() => {
            showMaxError.value = false;
        }, 3000);
    } else {
        selectedTags.value = newVal || [];
    }
});
</script>

<style scoped>

/* 标签弹性布局 */
:deep(.v-autocomplete__selection) {
  margin: 1px;
  flex-grow: 0;
  flex-shrink: 0;
}

:deep(.v-field__input) {
  display: flex;
  flex-wrap: wrap;
  min-height: 40px;
  align-items: center;
  padding-top: 3px !important;
  padding-bottom: 3px !important;
}

:deep(.v-field__input > .v-field__field) {
  flex-grow: 1;
  min-width: 100px;
}

.selected-chip {
  margin: 1px;
  font-size: 12px;
  height: auto !important;
  padding: 0 6px !important;
}

.chip-item {
  width: 100%;
  margin: 1px 0;
  font-size: 12px;
  height: auto !important;
  padding: 3px 10px;
}

/* 下拉菜单样式 */
:deep(.v-list-item) {
  min-height: 32px !important;
  padding: 2px 6px !important;
}

:deep(.v-list-item__content) {
  padding: 2px 0 !important;
}

/* 标签菜单样式 */
:deep(.tag-menu-content) {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* 标签项样式 */
:deep(.tag-list-item) {
  padding: 2px 8px !important;
  margin-bottom: 2px;
}

:deep(.tag-list-item:hover) {
  background-color: rgba(var(--v-theme-primary), 0.05);
}

:deep(.tag-list-item.v-list-item--active) {
  background-color: rgba(var(--v-theme-primary), 0.08);
}
</style> 