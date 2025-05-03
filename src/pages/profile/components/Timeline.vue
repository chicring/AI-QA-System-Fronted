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
import { getHeatmapData } from '@/api';
import type { HeatmapResponse, HeatmapDataItem } from '@/api/types/history';

// 示例数据
const heatmapData = ref<HeatmapItem[]>([])

/**
 * 将时间戳对象转换为YYYY-MM-DD格式的日期字符串
 */
function convertTimestampToDateString(timestamp: { seconds: number; nanos: number }): string {
    // 将秒转换为毫秒
    const date = new Date(timestamp.seconds * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function fetchHeatmapData() {
    getHeatmapData().then((res: HeatmapResponse) => {
        // 转换API返回的数据格式
        const convertedData: HeatmapItem[] = res.data.map(item => ({
            date: item.date,
            count: item.count
        }));
        heatmapData.value = convertedData;
    })
}

onMounted(() => {
    fetchHeatmapData()
})
</script>
