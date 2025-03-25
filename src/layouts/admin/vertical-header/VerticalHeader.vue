<script setup lang="ts">
import Logo from '../logo/LogoMain.vue';
import { useCustomizerStore } from '../../../stores/customizer';
import {IconMenu2} from '@tabler/icons-vue';

const customizer = useCustomizerStore();

</script>

<template>
  <v-app-bar elevation="0" height="55">

    <v-btn style="margin-left: 22px;" class="hidden-md-and-down text-secondary" color="lightsecondary" icon rounded="sm"
      variant="flat" @click.stop="customizer.SET_MINI_SIDEBAR(!customizer.mini_sidebar)" size="small">
      <IconMenu2></IconMenu2>
    </v-btn>
    <v-btn class="hidden-lg-and-up text-secondary ms-3" color="lightsecondary" icon rounded="sm" variant="flat"
      @click.stop="customizer.SET_SIDEBAR_DRAWER" size="small">
      <IconMenu2></IconMenu2>

    </v-btn>

    <div class="ml-3">
      <Logo />
    </div>

    <v-spacer></v-spacer>

  </v-app-bar>
</template> 