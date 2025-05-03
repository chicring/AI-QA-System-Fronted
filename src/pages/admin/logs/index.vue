<template>
  <div>
    <v-card flat>
      <v-card-item>
        <v-card-title>
          <v-row>
            <v-col cols="12" md="3">
              <v-date-input
                v-model="startDate"
                label="开始时间"
                prepend-icon=""
                prepend-inner-icon="$calendar"
                variant="solo-filled"
                density="comfortable"
                flat
                rounded="md"
                hide-details
              ></v-date-input>
            </v-col>
            <v-col cols="12" md="3">
              <v-date-input
                v-model="endDate"
                label="结束时间"
                prepend-icon=""
                prepend-inner-icon="$calendar"
                variant="solo-filled"
                density="comfortable"
                flat
                rounded="md"
                hide-details
              ></v-date-input>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                label="操作人"
                variant="solo-filled"
                flat
                rounded="md"
                density="comfortable"
                hide-details
                v-model="params.operator"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" align-self="center">
              <v-btn
                rounded="md"
                flat
                @click="reset"
                class="mr-2"
              >
                重置
              </v-btn>
              <v-btn
                color="primary"
                rounded="md"
                flat
                @click="fetchData"
              >
                搜索
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>
      </v-card-item>

      <v-data-table-server
        :headers="headers"
        :items="logList.records"
        :items-length="totalItemsCount"
        :loading="loading"
        :items-per-page="15"
        :items-per-page-options="[15, 20, 30, 40, 50]"
        density="comfortable"
        :page="params.pageNum"
        fixed-header
        hover
        loading-text="加载中..."
        no-data-text="暂无数据"
        no-results-text="暂无数据"
        items-per-page-text="每页条数"
        @update:options="fetchData"
        style="height: calc(100vh - 12rem - env(safe-area-inset-bottom))"
      >
        <template #item.methodName="{ item }">
          <small>{{ item.methodName }}</small>
        </template>
        <template #item.operator="{ item }"> 
          <v-chip
            size="small"
            color="primary"
            variant="outlined"
          >
            {{ item.operator }}
          </v-chip>
        </template>
        <template #item.timeTaken="{ item }">
          <v-chip
            :color="item.timeTaken > 1000 ? 'error' : 'success'"
            size="small"
          >
            {{ item.timeTaken }} ms
          </v-chip>
        </template>
        <template #item.operationTime="{ item }">
          {{ item.operationTime }}
        </template>
      </v-data-table-server>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { VDateInput } from 'vuetify/labs/VDateInput'
import { computed, onMounted, ref, shallowRef, watch } from 'vue'
import type { LogItem, LogListQueryParams, PaginatedData } from '@/api'
import { getLogList } from '@/api'

// 表格表头
const headers = [
  {
    title: 'ID',
    key: 'id',
    sortable: false,
  },
  {
    title: '操作内容',
    key: 'content',
    sortable: false,
  },
  {
    title: '方法名',
    key: 'methodName',
    sortable: false,
  },
  // {
  //   title: '请求参数',
  //   key: 'requestParams',
  //   sortable: false,
  // },
  {
    title: '操作人',
    key: 'operator',
    sortable: false,
  },
  {
    title: '操作时间',
    key: 'operationTime',
    sortable: false,
  },
  {
    title: '耗时',
    key: 'timeTaken',
    sortable: false,
  },  
]

// 将日期格式化为字符串，格式为："yyyy-MM-dd HH:mm:ss"
function formatDateToString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// 日期选择器值
const startDate = shallowRef()
const endDate = shallowRef()

// 查询参数
const params = ref<LogListQueryParams>({
  pageNum: 1,
  pageSize: 15,
  operator: undefined,
  startTime: undefined,
  endTime: undefined
})

// 日志列表数据
const logList = ref<PaginatedData<LogItem>>({
  records: [] as LogItem[],
  totalRow: 0,
  totalPage: 0,
  pageNumber: 1,
  pageSize: 15
})

// 加载状态
const loading = ref(false)

// 计算属性，提供总数据条数
const totalItemsCount = computed(() => {
  return logList.value?.totalRow || 0;
});

// 格式化时间戳为日期时间字符串
function formatDateTime(time: { seconds: number; nanos: number } | undefined): string {
  if (!time || !time.seconds) return '无数据';
  const date = new Date(time.seconds * 1000);
  return date.toLocaleString();
}

// 监听日期变化，转换为时间戳格式
watch(startDate, (newVal) => {
  if (newVal) {
    const date = new Date(newVal);
    // 设置为当天的00:00:00
    date.setHours(0, 0, 0, 0);
    params.value.startTime = formatDateToString(date);
  } else {
    params.value.startTime = undefined;
  }
})

watch(endDate, (newVal) => {
  if (newVal) {
    const date = new Date(newVal);
    // 设置为当天的23:59:59
    date.setHours(23, 59, 59, 999);
    params.value.endTime = formatDateToString(date);
  } else {
    params.value.endTime = undefined;
  }
})

// 重置过滤条件
function reset() {
  startDate.value = undefined;
  endDate.value = undefined;
  params.value = {
    pageNum: 1,
    pageSize: 15,
    operator: undefined,
    startTime: undefined,
    endTime: undefined
  };
  fetchData();
}

// 获取日志数据
async function fetchData(options?: any) {
  loading.value = true;
  try {
    if (options) {
      params.value.pageNum = options.page;
      params.value.pageSize = options.itemsPerPage;
    }
    
    const res = await getLogList(params.value);
    if (res.code === 200 && res.data) {
      logList.value = res.data;
    }
  } catch (error) {
    console.error('获取日志列表失败:', error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchData();
})
</script> 

<style lang="scss">
.v-table th {
  white-space: nowrap;
}

.v-table__wrapper {
  border-radius: 0;
}
</style>