<template>
  
    <v-card flat :to="`/question/bank/${category.id}`">
        <v-img :src="category.imageUrl" cover rounded="md"></v-img>
        <v-card-title>
            {{ category.categoryName }}
        </v-card-title>
        
        <v-card-subtitle>
            {{ category.description }}
        </v-card-subtitle>
    </v-card>

</template>

<script setup lang="ts">
import type { CategoryItem } from '@/api';

const props = defineProps<{
    category: CategoryItem
}>()

</script>


