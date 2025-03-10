<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Heatmap from '@/components/heatmap/Heatmap.vue'

interface ActivityData {
  date: string;
  count: number;
  tooltip?: string;
}

// 示例数据
const heatmapData = ref<ActivityData[]>([])

// 生成随机的示例数据
function generateRandomData() {
  const data: ActivityData[] = []
  // 设置日期范围为2025年全年
  const startDate = new Date(2025, 0, 1) // 2025年1月1日
  const endDate = new Date(2025, 11, 31) // 2025年12月31日
  
  // 遍历2025年的每一天
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    // 随机决定是否有活动 (70% 的几率为 0)
    const randomFactor = Math.random()
    let count = 0
    
    if (randomFactor > 0.7) {
      // 生成 1-10 的随机数，但让更高的数字出现概率更低
      if (randomFactor > 0.95) {
        count = Math.floor(Math.random() * 5) + 6 // 6-10
      } else {
        count = Math.floor(Math.random() * 5) + 1 // 1-5
      }
    }
    
    // 格式化日期为 YYYY-MM-DD
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    const dateString = `${year}-${month}-${day}`
    
    // 创建活动数据
    const item: ActivityData = {
      date: dateString,
      count: count
    }
    
    // 如果有活动，添加定制的工具提示
    if (count > 0) {
      item.tooltip = `${dateString}: ${count} 个贡献`
    }
    
    data.push(item)
  }
  
  return data
}

// 自定义颜色方案
const colorSchemes = [
  // GitHub 默认
  ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
  // 蓝色主题
  ['#ebedf0', '#b3d4ff', '#6fa4fc', '#2a6cdb', '#0c2d6b'],
  // 紫色主题
  ['#ebedf0', '#d8b9ff', '#b266ff', '#8000ff', '#5200a3'],
  // 热力图配色
  ['#ebedf0', '#ffdf7f', '#ffc156', '#f58021', '#c03011'],
]

// 当前选中的颜色方案
const selectedColorScheme = ref(0)

// 切换颜色方案
function changeColorScheme() {
  selectedColorScheme.value = (selectedColorScheme.value + 1) % colorSchemes.length
}

onMounted(() => {
  // 生成示例数据
  heatmapData.value = generateRandomData()
})
</script>

<template>
  <div class="demo-container">
    <h1>GitHub 风格热力图示例</h1>
    
    <div class="controls">
      <v-btn color="primary" @click="changeColorScheme">
        切换颜色主题
      </v-btn>
      <v-btn class="ml-4" @click="heatmapData = generateRandomData()">
        重新生成数据
      </v-btn>
    </div>
    
    <div class="heatmap-wrapper">
      <Heatmap 
        :data="heatmapData"
        :color-range="colorSchemes[selectedColorScheme]"
        start-date="2025-01-01"
        end-date="2025-12-31"
        title="2025 年共发布题解 0 次，累计天数: 0 天"
      />
    </div>
    
    <!-- 展示不同颜色主题的热力图 -->
    <div class="theme-examples">
      <h2>不同主题示例</h2>
      <div class="theme-grid">
        <div v-for="(scheme, index) in colorSchemes" :key="index" class="theme-item">
          <h3>{{ ['默认主题', '蓝色主题', '紫色主题', '热力主题'][index] }}</h3>
          <Heatmap 
            :data="heatmapData"
            :color-range="scheme"
            start-date="2025-01-01"
            end-date="2025-12-31"
          />
        </div>
      </div>
    </div>
    
    <div class="usage-info">
      <h2>如何使用</h2>
      <pre>
&lt;script setup&gt;
import Heatmap from '@/components/heatmap/Heatmap.vue'

// 准备数据
const heatmapData = [
  {
    date: '2025-01-01',
    count: 5,
    tooltip: '可选的自定义提示文本'
  },
  // 更多数据...
]
&lt;/script&gt;

&lt;template&gt;
  &lt;Heatmap 
    :data="heatmapData"
    title="2025 年共发布题解 0 次，累计天数: 0 天"
    start-date="2025-01-01"
    end-date="2025-12-31"
  /&gt;
&lt;/template&gt;
      </pre>
      
      <h3>组件属性</h3>
      <ul>
        <li><strong>data</strong>: 活动数据数组，必须包含 date 和 count 属性</li>
        <li><strong>colorRange</strong>: 颜色范围数组，从低到高活跃度</li>
        <li><strong>tooltipEnabled</strong>: 是否启用提示框，默认为 true</li>
        <li><strong>startDate</strong>: 开始日期，格式为 'YYYY-MM-DD'，默认为一年前</li>
        <li><strong>endDate</strong>: 结束日期，格式为 'YYYY-MM-DD'，默认为今天</li>
        <li><strong>emptyColor</strong>: 无活动日期的颜色，默认为 '#ebedf0'</li>
        <li><strong>title</strong>: 热力图标题，显示在图表上方</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.demo-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.controls {
  margin-bottom: 20px;
  display: flex;
}

.heatmap-wrapper {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 30px;
  overflow-x: auto;
}

.theme-examples {
  margin-top: 40px;
}

.theme-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.theme-item {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.theme-item h3 {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 16px;
}

.usage-info {
  margin-top: 40px;
}

pre {
  background-color: #f6f8fa;
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
}

h2 {
  font-size: 20px;
  margin-bottom: 16px;
}

h3 {
  font-size: 18px;
  margin: 16px 0 8px 0;
}

ul {
  padding-left: 20px;
}

li {
  margin-bottom: 8px;
}
</style> 