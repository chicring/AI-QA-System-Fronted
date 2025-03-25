<script setup lang="ts">
import { shallowRef } from 'vue';
import { useCustomizerStore } from '../../../stores/customizer';
import sidebarItems from './sidebarItem';
import { useRoute } from 'vue-router';


import NavItem from './NavItem.vue';

const customizer = useCustomizerStore();
const sidebarMenu = shallowRef(sidebarItems);
const route = useRoute();

</script>

<template>
  <v-navigation-drawer
    left
    v-model="customizer.Sidebar_drawer"
    elevation="0"
    rail-width="75"
    mobile-breakpoint="lg"
    app
    class="leftSidebar"
    width="220"
    :rail="customizer.mini_sidebar"
  >

    <perfect-scrollbar class="scrollnavbar">
      <v-list class="pa-4" style="height: auto;">
        <template v-for="(item, i) in sidebarMenu" :key="i">
          <NavItem :item="item" class="leftPadding" />
        </template>
      </v-list>
      <div class="pa-4 text-center">
        <v-chip color="inputBorder" size="small"> v1.3.0 </v-chip>
      </div>
    </perfect-scrollbar>
  </v-navigation-drawer>
</template>
