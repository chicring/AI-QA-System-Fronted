<script setup lang="ts">
import { ref, onMounted } from 'vue';
defineProps({
    tags: {
        type: Array,
        default: () => []
    }
});

</script>

<template>
    <div class="d-flex flex-wrap ga-2 align-content-start">
        <v-chip v-for="tag in tags" variant="outlined" size="small" rounded="sm">
            {{ tag }}
         </v-chip>
    </div>
</template>