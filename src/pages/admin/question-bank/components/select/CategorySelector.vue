<template>
    <v-autocomplete
        v-if="!useSelectComponent"
        v-model="selectedValue"
        :items="categoryOptions"
        :loading="loading"
        item-title="categoryName"
        :item-value="returnType === 'id' ? 'id' : 'categoryName'"
        :label="label"
        :placeholder="placeholder"
        hide-details
        clearable
        @update:search="fetchCategoryOptions"
        @update:model-value="handleValueChange"
        :error="!!errorMessage"
        :error-messages="errorMessage"
        :return-object="returnObject"
        :density="density"
        :variant="variant"
        rounded="md"
        flat
    >
        <template v-slot:append-item>
            <v-divider class="mb-2"></v-divider>
            <v-list-item v-if="!categoryOptions.length && !loading">
                <v-list-item-subtitle>未找到匹配的分类</v-list-item-subtitle>
            </v-list-item>
        </template>
    </v-autocomplete>

    <v-select
        v-else
        :model-value="selectedValue"
        @update:model-value="handleValueChange"
        :items="categoryOptions"
        item-title="categoryName"
        :item-value="returnType === 'id' ? 'id' : 'categoryName'"
        :label="label"
        :density="density"
        :variant="variant"
        :loading="loading"
        :return-object="returnObject"
        hide-details
        rounded="md"
        flat
    >
        <template v-if="withSearch" #prepend-item>
            <v-text-field
                class="ma-2"
                v-model="params.q"
                label="搜索分类"
                variant="outlined"
                density="compact"
                @update:model-value="fetchCategoryOptions"
                hide-details
            ></v-text-field>
        </template>
        <template #no-data>
            <v-list-item>
                <v-list-item-title>
                    {{ loading ? '加载中...' : '没有找到匹配的分类' }}
                </v-list-item-title>
            </v-list-item>
        </template>
    </v-select>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { getCategoryList } from '@/api';
import type { CategoryItem, CategoryListQueryParams } from '@/api';

// 定义Props
const props = defineProps({
    // 当前选中的值（可以是id或categoryName）
    modelValue: {
        type: [String, Number, Object, null],
        default: null
    },
    // 返回类型：'id' 或 'name'
    returnType: {
        type: String,
        default: 'name',
        validator: (value: string) => ['id', 'name'].includes(value)
    },
    // 是否使用Select组件（否则使用Autocomplete）
    useSelectComponent: {
        type: Boolean,
        default: false
    },
    // 是否包含搜索功能（仅在useSelectComponent=true时有效）
    withSearch: {
        type: Boolean,
        default: false
    },
    // 标签文本
    label: {
        type: String,
        default: '所属分类'
    },
    // 占位符文本
    placeholder: {
        type: String,
        default: '请选择分类'
    },
    // 是否返回整个对象
    returnObject: {
        type: Boolean,
        default: false
    },
    // 密度
    density: {
        type: String as () => 'default' | 'comfortable' | 'compact' | undefined,
        default: 'default'
    },
    // 变体样式
    variant: {
        type: String as () => 'filled' | 'outlined' | 'plain' | 'solo' | 'solo-inverted' | 'solo-filled' | 'underlined' | undefined,
        default: 'solo-filled'
    }
});

// 定义Emits
const emit = defineEmits([
    'update:modelValue',
    // 为了兼容性保留
    'update:categoryName',
    'update:categoryId'
]);

// 状态
const loading = ref<boolean>(false);
const errorMessage = ref<string>('');
const categoryOptions = ref<CategoryItem[]>([]);

// v-model双向绑定
const selectedValue = computed({
    get: () => {
        // 如果modelValue是空值，直接返回null
        if (props.modelValue === null || props.modelValue === undefined || props.modelValue === '') {
            return null;
        }
        
        // 如果返回整个对象，则需要根据ID或名称找到对应的分类
        if (props.returnObject) {
            // 没有选项时直接返回null
            if (categoryOptions.value.length === 0) return null;
            
            // 根据returnType决定查找方式
            if (props.returnType === 'id') {
                return categoryOptions.value.find(item => item.id === props.modelValue) || null;
            } else {
                return categoryOptions.value.find(item => item.categoryName === props.modelValue) || null;
            }
        }
        
        // 否则直接返回值
        return props.modelValue;
    },
    set: (value) => {
        handleValueChange(value);
    }
});

// 搜索参数
const params = ref<CategoryListQueryParams>({
    pageNum: 1,
    pageSize: props.withSearch ? 50 : 100,
    q: undefined
});

// 值变化处理
const handleValueChange = (value: any) => {
    // 根据returnType和returnObject决定如何处理值
    let emitValue;
    
    if (value === null || value === undefined || value === '') {
        emitValue = props.returnType === 'id' ? null : '';
    } else if (typeof value === 'object' && value !== null) {
        // 如果值是对象（特别是当returnObject为true时）
        emitValue = props.returnType === 'id' ? value.id : value.categoryName;
    } else {
        // 如果值是原始类型
        emitValue = value;
    }
    
    // 发出通用事件
    emit('update:modelValue', emitValue);
    
    // 为了兼容性，同时发出特定类型事件
    if (props.returnType === 'id') {
        emit('update:categoryId', emitValue);
    } else {
        emit('update:categoryName', emitValue);
    }
};

// 监听搜索参数变化，在有搜索功能时重新加载
watch(() => params.value.q, () => {
    if (props.withSearch) {
        fetchCategoryOptions();
    }
});

// 获取分类选项
const fetchCategoryOptions = async () => {
    loading.value = true;
    errorMessage.value = '';
    
    try {
        const response = await getCategoryList(params.value);
        if (response.code === 200 && response.data) {
            categoryOptions.value = response.data.records;
        } else {
            errorMessage.value = '获取分类列表失败';
        }
    } catch (error: any) {
        console.error('获取分类列表失败:', error);
        errorMessage.value = error.msg || '获取分类列表失败';
    } finally {
        loading.value = false;
    }
};

// 组件挂载时加载分类列表
onMounted(fetchCategoryOptions);
</script> 