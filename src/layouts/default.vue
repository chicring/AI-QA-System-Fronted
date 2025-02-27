<template>
    <div class="flex flex-col min-h-screen pl-2 pr-2 md:pr-0 md:pl-0 gap-4 bg-s">
        <AppHeader />
    
        <div class="flex flex-col w-full mx-auto flex-1 max-w-7xl"> 
            <RouterView v-slot="{ Component }">
                <keep-alive>
                    <component :is="Component" v-if="route.meta.keepAlive" :key="route.fullPath" />
                </keep-alive>
                <component :is="Component" v-if="!route.meta.keepAlive" :key="route.fullPath" />
            </RouterView>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<style scoped>

</style>
