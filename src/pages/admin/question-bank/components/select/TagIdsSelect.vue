<template>
    <v-select
        :model-value="selectedTagIds"
        @update:model-value="updateSelectedTags"
        :items="tagOptions"
        item-title="tagName"
        item-value="id"
        label="标签"
        multiple
        density="compact"
        variant="outlined"
        hide-details
        :loading="loading"
        chips
        closable-chips
        return-object
    >
        <template #prepend-item>
            <v-text-field
                class="ma-2"
                v-model="params.q"
                label="搜索"
                variant="outlined"
                density="compact"
                @update:model-value="fetchTagOptions"
                hide-details
            ></v-text-field>
        </template>

        <template #no-data>
            <v-list-item>
                <v-list-item-title>
                    {{ loading ? '加载中...' : '没有找到匹配的标签' }}
                </v-list-item-title>
            </v-list-item>
        </template>
    </v-select>

</template>

<script setup lang="ts">
import { getTagList } from '@/api'
import type { TagItem } from '@/api/types';
import { ref, computed, onMounted, watch } from 'vue';

// 定义props
const props = defineProps<{
    tagIds: number[]
}>();

// 定义emit
const emit = defineEmits<{
    (e: 'update:tagIds', value: number[]): void
}>();

// 本地状态
const loading = ref(false);
const selectedTagIds = computed({
    get: () => {
        // 根据tagIds找到对应的TagItem对象
        return tagOptions.value.filter(tag => props.tagIds.includes(tag.id));
    },
    set: (value) => {
        // 由于value可能是TagItem对象数组，需要提取id
        const ids = Array.isArray(value) 
            ? value.map(item => typeof item === 'object' ? item.id : item)
            : [];
        emit('update:tagIds', ids);
    }
});

// 搜索参数
const params = ref({
    pageNum: 1,
    pageSize: 20,
    q: null as string | null
});

// 标签选项列表
const tagOptions = ref<TagItem[]>([]);

// 更新选中的标签
const updateSelectedTags = (value: any) => {
    // 确保提取id值
    const ids = Array.isArray(value) 
        ? value.map(item => typeof item === 'object' ? item.id : item)
        : [];
    emit('update:tagIds', ids);
};

// 获取标签选项
const fetchTagOptions = async () => {
    loading.value = true;
    try {   
        const res = await getTagList(params.value.pageNum, params.value.pageSize, params.value.q);
        tagOptions.value = res.data.data;
    } catch (error) {
        console.error('获取标签列表失败:', error);
    } finally {
        loading.value = false;
    }
};

// 监听props.tagIds变化，确保当tagIds更新时选中状态也更新
watch(() => props.tagIds, (newTagIds) => {
    // 如果tagOptions还没加载完，我们不需要做任何事
    if (tagOptions.value.length === 0) return;
    
    // 确认选中项是最新的
    if (JSON.stringify(selectedTagIds.value.map(tag => tag.id).sort()) !== 
        JSON.stringify(newTagIds.sort())) {
        // 这里不需要做任何事，计算属性会自动更新
        console.log('tagIds已更新:', newTagIds);
    }
}, { immediate: true });

// 初始加载标签
onMounted(() => {
    fetchTagOptions();
});
</script>
