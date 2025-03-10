<template>
    <div v-if="options.isExist" class="resume-card">
        <div class="resume-content" :class="{ 'resume-blur': options.isFilter }">
            <v-img :src="img" />
        </div>
    </div>

    <v-file-upload v-else rounded="md" min-height="300px" title="上传简历" thickness="2" density="comfortable" variant="comfortable">

        <template #icon>
            <IconUpload size="40" />
        </template>

        <template #title>
            <p class="text-h4 text-center text-medium-emphasis mt-3 mb-3">上传简历</p>
        </template>
    </v-file-upload>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IconUpload } from '@tabler/icons-vue';

const options = ref({
    isExist: true,
    isFilter: true,
})

const img = "https://static.fotor.com.cn/assets/projects/pages/205fa820-30d4-11e8-9596-075ccbd1735c_8be7f6b1-6e4f-4736-bd79-ee0094a735ed_thumb.jpg"
</script>

<style scoped>
.resume-card {
    border-color: rgba(0, 0, 0, 0.4) !important;
    border-width: 2px !important;
    padding: 10px;
    border: 2px dashed #666;
    min-height: 300px;
    border-radius: 10px;
}

.resume-content {
    height: 100%;
    width: 100%;
}

/* 简历内容模糊，边框不模糊 */
.resume-blur {
    filter: blur(2px);
}
</style>


