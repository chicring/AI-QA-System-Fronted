<template>
  <div>
    <v-card flat>
      <v-card-item>
        <v-card-title>
          <v-row>
            <v-col cols="12" md="3">
              <v-date-input
                v-model="startTime"
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
                v-model="endTime"
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
        :items="response.data"
        :items-length="response.total"
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
      </v-data-table-server>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { VDateInput } from 'vuetify/labs/VDateInput'
import { computed, onMounted, ref, shallowRef } from 'vue'
import {  type OperationLogItem, type OperationLogResponse, type QueryOperationLogVO } from '@/api/types'
import { getOperationLogList } from '@/api'
// 组件逻辑

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

const startTime = shallowRef()
const endTime = shallowRef()

const params = ref<QueryOperationLogVO>({
  pageNum: 1,
  pageSize: 15,
  operator: '',
  startTime: '',
  endTime: '',
})

const response = ref<OperationLogResponse>({
  pageNum: 1,
  pageSize: 10,
  total: 0,
  data: [] as OperationLogItem[],
})

const loading = ref(false)

function reset() {
  startTime.value = ''
  endTime.value = ''
  params.value.startTime = ''
  params.value.endTime = ''
}

async function fetchData(options?: any) {
  loading.value = true
  try {
    params.value.startTime = startTime.value
    params.value.endTime = endTime.value
    if (options) {
      params.value.pageNum = options.page
      params.value.pageSize = options.itemsPerPage
    }
    const res = await getOperationLogList(params.value)
    response.value = res.data
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}


onMounted(() => {
  fetchData()
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