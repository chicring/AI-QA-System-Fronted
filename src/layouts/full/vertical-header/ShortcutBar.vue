<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { 
  IconHome, 
  IconBook, 
  IconWriting, 
  IconUser,
  IconX,
  IconApps
} from '@tabler/icons-vue'
import { useDisplay } from 'vuetify'

const route = useRoute()
const router = useRouter()
const display = useDisplay()

const appsMenu = ref(false)

const menuMaxWidth = ref(420)

// 定义捷径列表
const shortcuts = [
  {
    title: '首页',
    subtitle: '首页',
    path: '/',
    icon: IconHome
  },
  {
    title: '题库',
    subtitle: '题库',
    path: '/question',
    icon: IconBook
  },
  {
    title: '练习',
    subtitle: '练习',
    path: '/practice',
    icon: IconWriting
  },
  {
    title: '我的',
    subtitle: '我的',
    path: '/profile',
    icon: IconUser
  }
]



// 导航到指定路径
const navigateTo = (path: string) => {
  if (route.path !== path) {
    router.push(path)
  }
}



</script>

<template>
  <v-menu
    v-model="appsMenu"
    max-height="560"
    :max-width="menuMaxWidth"
    width="100%"
    location="top end"
    origin="top end"
    close-on-content-click
    close-on-back
    scrim
    class="ma-0 pa-0"
  >
    <template #activator="{ props }">
      <v-btn icon variant="text" v-bind="props" class="opacity-70">
        <IconApps size="24" stroke-width="2" />
      </v-btn>
    </template>

    <VCard class="overflow-hidden">
      <VCardItem class="py-3">
        <VCardTitle>捷径</VCardTitle>
        <template #append>
          <v-btn icon variant="text" @click="appsMenu = false">
            <IconX />
          </v-btn>
        </template>
      </VCardItem>

      <VDivider />

      <div class="pa-3">
        <v-row dense>
          <v-col cols="6" v-for="(item, index) in shortcuts" :key="index">
            <VCard
              flat
              
              class="pa-2 d-flex align-center rounded-lg cursor-pointer transition-transform duration-300 hover:-translate-y-1 border"
              hover
              @click="navigateTo(item.path)"
            >
              <VAvatar variant="text" size="48" rounded="lg">
                <VIcon color="primary" :icon="item.icon" size="24" />
              </VAvatar>
              <div>
                <div class="text-body-1 text-high-emphasis font-weight-medium">{{ item.title }}</div>
                <div class="text-caption text-medium-emphasis">{{ item.subtitle }}</div>
              </div>
            </VCard>
          </v-col>
        </v-row>
      </div>
    </VCard>
    
  </v-menu>
</template>

<style scoped>
.shortcut-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background-color: rgb(var(--v-theme-surface));
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  padding-bottom: env(safe-area-inset-bottom, 0);
}

.shortcut-container {
  display: flex;
  justify-content: space-evenly;
  padding: 8px 0;
}

.shortcut-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 8px 0;
  flex: 1;
  transition: all 0.3s ease;
  color: rgb(var(--v-theme-on-surface));
}

.shortcut-item.active {
  color: rgb(var(--v-theme-primary));
  font-weight: 500;
}

.shortcut-item.active :deep(svg) {
  stroke-width: 2;
}

.shortcut-title {
  font-size: 12px;
  margin-top: 4px;
  line-height: 1.2;
}

/* 针对较小屏幕的样式 */
@media (max-width: 600px) {
  .shortcut-container {
    padding: 6px 0;
  }
  
  .shortcut-item {
    padding: 6px 0;
  }
}
</style>
