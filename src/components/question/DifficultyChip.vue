<template>
    <v-chip :color="difficultyColor" variant="tonal" size="small" rounded="sm">
        {{ difficultyText }}
    </v-chip>
</template>

<script setup lang="ts">
import { difficultyList } from '@/types/question/DifficultyType';
import { computed } from 'vue';

const props = defineProps<{
    difficulty: number;
}>();


const difficultyText = computed(() => {
    return difficultyList.find(item => item.id === props.difficulty)?.name;
});

const difficultyColor = computed(() => {
    return difficultyList.find(item => item.id === props.difficulty)?.color;
});



</script>
