
<template>
    <div
        class="w-full max-w-7xl mx-auto"
    >   
        <div class="flex justify-between items-center pt-1">
            <div class="flex justify-between items-center gap-3" >
                <div class="text-2xl font-bold">
                    <span>
                        OnChat
                    </span>
                </div>

                <div class="flex items-center gap-3 hidden md:flex">
                    <Button
                        v-for="item in navigationMenu"
                        :key="item.label"
                        text plain
                        >   
                        <RouterLink v-if="item.route" v-slot="{ herf, navigate }" :to="item.route">
                            <a v-ripple :href="herf" @click="navigate" class="flex items-center gap-2 text-inherit">
                                <i :class="item.icon" />
                                <span>{{ item.label }}</span>
                            </a>
                        </RouterLink>
                    </Button>
                </div>
            </div>

            <div class="flex items-center gap-4" >
                <Button
                    severity="secondary"
                    @click="toggleDarkMode"
                    size="small"
                >
                    <i :class="['pi', { 'pi-moon': isDarkMode, 'pi-sun': !isDarkMode }]" />
                </Button>
                <Button size="small" @click="toggleDarkMode" >
                    <RouterLink to="/auth/login">
                        登录
                    </RouterLink>
                </Button>
            </div>
        </div>
    </div>   
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useLayout } from '@/composables/useLayout';
import { useNavigationMenu } from '@/composables/useNavigationMenu';
import { useRoute } from 'vue-router';


const isDarkMode = ref(true);
const { toggleDarkMode } = useLayout();
const { navigationMenu } = useNavigationMenu();
const route = useRoute();
</script>

<style scoped>
</style>