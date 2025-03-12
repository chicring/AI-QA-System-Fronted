<script setup lang="ts">
import { ref,onMounted } from 'vue';
import { notificationStatusList } from '@/types/sys';
import type {QueryNotificationVO, NotificationListResponse, NotificationItem} from '@/api/types/notification'
import { getNotificationList,markAllRead } from '@/api/user'


const request = ref<QueryNotificationVO>({
  pageNum: 1,
  pageSize: 50,
  status: notificationStatusList[0].status,
  type: null,
})

const reposne = ref<NotificationListResponse>(
  {
    pageNum: 0,
    pageSize: 0,
    total: 0,
    list: [],
  }
)

function fetchNotices(){
  getNotificationList(request.value).then((res) => {
    reposne.value = res
  })
}

function fetchMarkAllRead(){
  markAllRead().then((res) => {
    fetchNotices()
  })
}

onMounted(() => {
  fetchNotices()
})
</script>

<template>
  <!-- ---------------------------------------------- -->
  <!-- notifications DD -->
  <!-- ---------------------------------------------- -->
  <div class="pa-4">
    <div class="d-flex align-center justify-space-between mb-3">
      <h6 class="text-subtitle-1">
        通知
        <v-chip v-if="reposne.total > 0" color="warning" variant="flat" size="small" class="ml-2 text-white">{{ reposne.total }}</v-chip>
      </h6>
      <a href="#" class="text-decoration-underline text-primary text-subtitle-2">全部标记为已读</a>
    </div>
    <v-select :items="notificationStatusList" v-model="request.status" 
              color="primary" 
              variant="outlined" 
              density="compact" 
              hide-details
              item-title="description"
              item-value="status"
              @update:model-value="fetchNotices"
    >
            
    </v-select>
  </div>
  <v-divider></v-divider>
  <perfect-scrollbar style="max-height: 650px">
    <v-list v-if="reposne.total > 0" class="py-0" lines="three" v-for="item in reposne.list" :key="item.id">
      <v-list-item value="" color="secondary" class="no-spacer">

        <div class="d-inline-flex align-center justify-space-between w-100">
          <h6 class="text-subtitle-1 font-weight-regular">{{ item.title }}</h6>
          <span class="text-subtitle-2 text-medium-emphasis">{{ item.createTime }}</span>
        </div>

        <p class="text-subtitle-2 text-medium-emphasis mt-1">{{ item.content }}</p>
        <div class="mt-3">
          <v-chip size="small" text="Unread" color="error" variant="tonal" class="mr-2" />
          <v-chip size="small" text="New" color="warning" variant="tonal" />
        </div>
      </v-list-item>
      <v-divider></v-divider>
    </v-list>

    <div v-else class="bg-lightprimary rounded-md px-5 py-3 my-3 mx-4">
       
      <span class="text-subtitle-1 text-medium-emphasis">暂无通知</span>

    </div>
  </perfect-scrollbar>


  <v-divider></v-divider>

  <!-- 底部按钮 -->
  <div class="pa-2 text-center">
    <v-btn color="primary" variant="text">全部</v-btn>
  </div>
</template>
