<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import VerticalSidebar from './vertical-sidebar/VerticalSidebar.vue';
import VerticalHeader from './vertical-header/VerticalHeader.vue';

const route = useRoute();

</script>

<template>
  <v-app theme="PurpleTheme">

    <VerticalHeader/>

    <VerticalSidebar />

    <!-- 主要内容区域 -->
    <v-main>
      <div fluid class="page-wrapper-admin">
        <RouterView v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" v-if="route.meta.keepAlive" :key="route.fullPath" />
          </keep-alive>
          <component :is="Component" v-if="!route.meta.keepAlive" :key="route.fullPath" />
        </RouterView>
      </div>
    </v-main>
  </v-app>
</template>

<style scoped>
</style>
