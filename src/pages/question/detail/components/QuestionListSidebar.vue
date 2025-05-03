<template>
    <v-navigation-drawer
        left
        app
        elevation="0"
        floating
        width="270"
        :rail="isCollapse"
    >
        <template #prepend>
            <div class="pa-2 d-flex justify-space-between">
                <v-text-field
                    v-if="!isCollapse"
                    class="ma-0 pa-0"
                    placeholder="搜索"
                    flat
                    variant="solo-filled"
                    density="compact"
                    rounded="sm"
                    :hideDetails="true"
                    v-model="searchTitle"
                    @update:modelValue="questionStore.searchQuestion(searchTitle)"
                >
                </v-text-field>

                <v-btn v-if="!isCollapse" icon flat class="ma-0 pa-0 opacity-50" @click="isCollapse = !isCollapse">
                    <IconLayoutSidebarLeftCollapse />
                </v-btn>

                <v-btn v-else icon flat class="ma-0 pa-0 opacity-70" @click="isCollapse = !isCollapse">
                    <IconLayoutSidebarRightCollapse />
                </v-btn>

            </div>
        </template>

        <perfect-scrollbar v-if="!isCollapse" class="scrollnavbar">
            <v-list
                nav
                density="comfortable"
                transition="slide-y-transition"
            >
                <v-list-item
                   
                    color="secondary"
                    activeColor="secondary"
                    hoverColor="secondary"
                    rounded="sm"
                    v-for="item in questionStore.questionData.responseData.records"
                    :key="item.id"
                    :active="questionStore.questionData.currentQuestionId === item.id"
                    @click="questionStore.toggleQuestion(item.id)"
                >
                    <v-list-item-title>
                        <strong>{{ item.questionTitle }}</strong>
                    </v-list-item-title>
                </v-list-item>

                <!-- <v-btn v-else v-for="item in questionStore.questionData.responseData.records" size="small" class="mb-1 pa-0" flat variant="tonal">
                        {{ item.id }}
                </v-btn> -->
                
                <!-- 无限滚动加载器 -->
                <div v-if="questionStore.questionData.responseData.records.length > 0" 
                     v-intersect="loadMoreQuestions"
                     class="load-more-trigger pa-2 text-center">
                    <v-progress-circular v-if="questionStore.questionData.loading.list" 
                                        indeterminate 
                                        size="24" 
                                        color="primary" 
                                        class="my-2"></v-progress-circular>
                    <div v-else-if="!hasMoreQuestions" class="text-caption text-medium-emphasis">没有更多问题</div>
                </div>
            </v-list>
        </perfect-scrollbar>


    </v-navigation-drawer>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue';
import { useQuestionStore } from '@/stores/question';
import { IconLayoutSidebarLeftCollapse, IconLayoutSidebarRightCollapse } from '@tabler/icons-vue';
// 引入perfect-scrollbar组件
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';
// 初始化问题store
const questionStore = useQuestionStore();

const isCollapse = ref(false);

// 创建一个本地title用于搜索输入框
const searchTitle = ref<string>('');

// 判断是否还有更多问题
const hasMoreQuestions = computed(() => {
    const { pageNumber, totalPage } = questionStore.questionData.responseData;
    return pageNumber < totalPage;
});

// 加载更多问题
const loadMoreQuestions = (isIntersecting: boolean) => {
    if (isIntersecting && !questionStore.questionData.loading.list && hasMoreQuestions.value) {
        questionStore.loadMoreQuestions();
    }
};

</script>

<style scoped>
.scrollnavbar {
    height: calc(100vh - 140px);
    overflow-y: auto;
}

.load-more-trigger {
    min-height: 48px;
}
</style>
