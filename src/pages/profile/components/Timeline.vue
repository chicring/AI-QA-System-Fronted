<template>
    <div >
        <Heatmap 
            :data="heatmapData"
            :color-range="heatmapColors[0]"
            start-date="2025-01-01"
            end-date="2025-12-31"
            title="2025 年刷题记录"
        />
    </div>
</template>

<script setup lang="ts">
import { heatmapColors, type HeatmapItem } from '@/types/chats/heatmap';
import Heatmap from '@/components/heatmap/Heatmap.vue';
import { ref, onMounted } from 'vue';
import { getHeatmapData } from '@/api/question';

// 示例数据
const heatmapData = ref<HeatmapItem[]>([])

function fetchHeatmapData() {
    getHeatmapData().then((res) => {
        heatmapData.value = res.data
    })
}

onMounted(() => {
    fetchHeatmapData()
})
</script>
