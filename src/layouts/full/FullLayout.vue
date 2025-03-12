<script setup lang="ts">
import { RouterView } from 'vue-router';
import VerticalSidebarVue from './vertical-sidebar/VerticalSidebar.vue';
import VerticalHeaderVue from './vertical-header/VerticalHeader.vue';
import Customizer from './customizer/CustomizerPanel.vue';
import FooterPanel from './footer/FooterPanel.vue';
import { useCustomizerStore } from '../../stores/customizer';
import { useRoute } from 'vue-router';
const customizer = useCustomizerStore();
const route = useRoute();
</script>

<template>
    <v-app
      theme="PurpleTheme"
    >
      <VerticalHeaderVue v-if="!route.meta.hiddenHeader" />

      <v-main>
        <div fluid class="page-wrapper">
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
