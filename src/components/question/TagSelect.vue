<template>
        <v-select
            :items="list"
            v-model="props.modelValue"
            rounded="md"
            variant="solo-filled"
            density="compact"
            placeholder="标签"
            flat
            hide-details
            multiple
        >
            <template #selection="{ item, index }">
                <div v-if="index < 1">
                    <span  class="text-grey text-body-1 text-medium-emphasis" >
                        <v-badge :content="modelValue.length" color="primary" offset-x="-15" offset-y="5">
                            标签

                        </v-badge>
                    </span>
                </div>
            </template>

            <template #item="{ item }">
                
                <div class="ma-2" style="min-width: 200px; max-width: 100%;">
                    <span class="text-subtitle-2 text-medium-emphasis">
                            {{ item.raw.categoryName }}
                    </span>

                    <div class="d-flex flex-wrap ga-2 align-content-start my-3">
                        <v-chip v-for="tag in item.raw.tagNames" 
                            :key="tag" variant="tonal" size="small"
                            :color="tagColor(tag)"
                            @click="handleTagClick(tag)"
                        >
                            {{ tag }}
                        </v-chip>
                    </div>
                </div>
            </template>
        </v-select>
</template>

<script setup lang="ts">
import type { TagGroup } from '@/api/types/index';

const props = defineProps({
    modelValue: {
        type: Array<string>,
        default: () => []
    },
    list: {
        type: Array<TagGroup>,
        default: () => []
    }
})

const emit = defineEmits(['update:modelValue']);

const tagColor = (tag : string) =>{
    if(props.modelValue.includes(tag))    return 'primary'
}

const handleTagClick = (tag: string) => {
    
    if (props.modelValue.includes(tag)) {
        props.modelValue.splice(props.modelValue.indexOf(tag), 1);
        emit('update:modelValue', props.modelValue.filter((t) => t !== tag));
    } else {
        props.modelValue.push(tag);
        emit('update:modelValue', [...props.modelValue, tag]);
    }
}


</script>