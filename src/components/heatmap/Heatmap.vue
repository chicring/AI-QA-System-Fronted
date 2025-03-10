<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'


interface HeatmapItem {
  date: string; // 日期，格式为 'YYYY-MM-DD'
  count: number; // 活动计数，例如提交次数、贡献次数等
  tooltip?: string; // 可选的提示文本
}

interface Props {
  data: HeatmapItem[];
  colorRange?: string[]; // 热力图颜色范围，从浅到深
  tooltipEnabled?: boolean; // 是否启用提示
  startDate?: string; // 开始日期，默认为一年前
  endDate?: string; // 结束日期，默认为今天
  emptyColor?: string; // 无数据的颜色
  title?: string; // 热力图标题
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  colorRange: () => ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
  tooltipEnabled: true,
  startDate: '',
  endDate: '',
  emptyColor: '#ebedf0',
  title: ''
})

// 当前展示的tooltip
const currentTooltip = ref({
  text: '',
  show: false,
  x: 0,
  y: 0
})

// 月份名称
const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']

// 日期范围
const dateRange = computed(() => {
  const end = props.endDate ? new Date(props.endDate) : new Date()
  const start = props.startDate 
    ? new Date(props.startDate) 
    : new Date(end.getFullYear() - 1, end.getMonth(), end.getDate())
  
  return { start, end }
})

// 找出最大值，用于计算颜色级别
const maxCount = computed(() => {
  if (props.data.length === 0) return 0
  return Math.max(...props.data.map(item => item.count))
})

// 处理月份数据
const monthsData = computed(() => {
  const { start, end } = dateRange.value
  const result: Record<string, Array<Array<Date | null>>> = {}
  
  // 初始化月份列表
  let currentDate = new Date(start)
  while (currentDate <= end) {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const key = `${year}-${month}`
    
    if (!result[key]) {
      // 创建日历网格
      result[key] = createCalendarGrid(year, month)
    }
    
    currentDate.setDate(currentDate.getDate() + 1)
  }
  
  return result
})

// 为一个月创建日历网格 - 7行（星期几）x N列（周）
function createCalendarGrid(year: number, month: number): Array<Array<Date | null>> {
  // 获取这个月的第一天
  const firstDayOfMonth = new Date(year, month, 1)
  
  // 获取这个月的最后一天
  const lastDayOfMonth = new Date(year, month + 1, 0)
  
  // 创建一个7行的网格，每行代表一个星期几（0=周一, 6=周日）
  const grid: Array<Array<Date | null>> = []
  for (let i = 0; i < 7; i++) {
    grid.push([])
  }
  
  // 找到第一天所在周的周一（可能在上个月）
  let currentDate = new Date(firstDayOfMonth)
  let dayOfWeek = currentDate.getDay()
  dayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1 // 转换为0=周一, 6=周日
  
  // 回退到这周的周一
  currentDate.setDate(currentDate.getDate() - dayOfWeek)
  
  // 确定我们需要多少列（周）来显示整个月
  // 先找到最后一天所在周的周日
  let lastDate = new Date(lastDayOfMonth)
  let lastDayOfWeek = lastDate.getDay()
  lastDayOfWeek = lastDayOfWeek === 0 ? 6 : lastDayOfWeek - 1
  
  // 向前推到这周的周日
  lastDate.setDate(lastDate.getDate() + (6 - lastDayOfWeek))
  
  // 计算总共有多少天需要显示
  const totalDays = Math.round((lastDate.getTime() - currentDate.getTime()) / (24 * 60 * 60 * 1000)) + 1
  // 确定需要多少列（每周7天）
  const totalWeeks = Math.ceil(totalDays / 7)
  
  // 填充网格
  for (let week = 0; week < totalWeeks; week++) {
    for (let day = 0; day < 7; day++) {
      const date = new Date(currentDate)
      
      // 只添加属于当前月的日期，否则为null
      if (date.getMonth() === month && date.getFullYear() === year) {
        grid[day][week] = date
      } else {
        grid[day][week] = null
      }
      
      // 移动到下一天
      currentDate.setDate(currentDate.getDate() + 1)
    }
  }
  
  return grid
}

// 获取颜色等级
function getColorLevel(count: number): number {
  if (count === 0) return 0
  if (maxCount.value === 0) return 0
  
  const step = maxCount.value / (props.colorRange.length - 1)
  return Math.min(Math.ceil(count / step), props.colorRange.length - 1)
}

// 获取颜色
function getColor(count: number): string {
  if (count === 0) return props.emptyColor
  return props.colorRange[getColorLevel(count)]
}

// 格式化日期为 YYYY-MM-DD
function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// 显示提示
function showTooltip(event: MouseEvent, date: Date | null, count: number, customTooltip?: string) {
  if (!props.tooltipEnabled || !date) return
  
  const dateString = formatDate(date)
  const tooltipText = customTooltip || `${dateString}: ${count} 活动`
  
  currentTooltip.value = {
    text: tooltipText,
    show: true,
    x: event.clientX,
    y: event.clientY
  }
}

// 隐藏提示
function hideTooltip() {
  currentTooltip.value.show = false
}

// 获取日期数据
function getDayData(date: Date | null) {
  if (!date) return { color: 'transparent', count: 0 }
  
  const dateString = formatDate(date)
  const dayData = props.data.find(item => item.date === dateString)
  const count = dayData ? dayData.count : 0
  
  return {
    date,
    count,
    tooltip: dayData?.tooltip,
    color: getColor(count)
  }
}
</script>

<template>
  <div class="heatmap-container">
    <div v-if="props.title" class="heatmap-title">
      {{ props.title }}
      <div class="legend">
        <span>不活跃</span>
        <div class="legend-items">
          <div 
            v-for="(color, index) in props.colorRange" 
            :key="index" 
            class="legend-item" 
            :style="{ backgroundColor: color }"
          ></div>
        </div>
        <span>活跃</span>
      </div>
    </div>
    
    <div class="calendar-wrapper">
      <PerfectScrollbar class="heatmap-scroll-container">
        <div class="months-container">
          <!-- 按月显示格子 -->
          <div 
            v-for="(monthGrid, monthKey, monthIndex) in monthsData" 
            :key="monthKey"
            class="month-container"
          >
            <div class="month-header">{{ monthNames[parseInt(monthKey.split('-')[1])] }}</div>
            
            <div class="month-grid">
              <!-- 每行是一个星期几 -->
              <div 
                v-for="(row, rowIndex) in monthGrid" 
                :key="`${monthKey}-row-${rowIndex}`"
                class="week-row"
              >
                <!-- 这一行中的每个格子（每个格子是一周中的某一天）-->
                <div 
                  v-for="(date, columnIndex) in row" 
                  :key="`${monthKey}-${rowIndex}-${columnIndex}`"
                  class="date-cell"
                >
                  <!-- 日期格子里只显示背景色 -->
                  <div 
                    v-if="date"
                    class="day-cell"
                    :style="{ backgroundColor: getDayData(date).color }"
                    @mouseover="showTooltip($event, date, getDayData(date).count, getDayData(date).tooltip)"
                    @mouseleave="hideTooltip"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PerfectScrollbar>
    </div>
    
    <!-- 提示框 -->
    <div 
      v-if="currentTooltip.show" 
      class="tooltip" 
      :style="{ left: `${currentTooltip.x + 10}px`, top: `${currentTooltip.y - 30}px` }"
    >
      {{ currentTooltip.text }}
    </div>
  </div>
</template>

<style scoped>
.heatmap-container {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  padding: 10px;
  position: relative;
  width: 100%;
}

.heatmap-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  font-size: 14px;
  color: #24292e;
}

.calendar-wrapper {
  position: relative;
  width: 100%;
  margin-top: 15px; /* 给滚动条留出更多空间 */
}

.heatmap-scroll-container {
  overflow-x: auto;
  padding-bottom: 15px; /* 增加底部间距，让滚动条下移 */
  width: 100%;
}

/* 定制 PerfectScrollbar 滚动条样式 */
:deep(.ps__rail-x) {
  bottom: 0 !important;
  height: 10px;
  opacity: 0.6;
}

:deep(.ps__thumb-x) {
  height: 6px;
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.3);
}

.months-container {
  display: flex;
  min-width: min-content;
}

.month-container {
  margin-right: 10px; /* Add gap between month grids */
}

.month-header {
  text-align: left;
  font-size: 14px;
  font-weight: 500;
  color: #24292e;
  margin-bottom: 8px;
  padding-left: 2px;
}

.month-grid {
  display: flex;
  flex-direction: column;
}

.week-row {
  display: flex;
  align-items: center;
  height: 10px;
  margin-bottom: 2px;
}

.date-cell {
  width: 10px;
  height: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 2px;
}

.day-cell {
  width: 8.52px;
  height: 8.52px;
  border-radius: 2px;
  cursor: pointer;
}

.legend {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #586069;
}

.legend-items {
  display: flex;
  margin: 0 5px;
}

.legend-item {
  width: 8px;
  height: 8px;
  margin: 0 1px;
  border-radius: 2px;
}

.tooltip {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 5px 8px;
  border-radius: 3px;
  font-size: 12px;
  z-index: 1000;
  pointer-events: none;
}
</style>
