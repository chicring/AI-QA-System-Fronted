<script setup lang="ts">
import { ref } from 'vue';
import { LogoutIcon } from 'vue-tabler-icons';
import { useAuthStore } from '@/stores/auth';
import { useNavigationMenu } from '@/composables/useNavigationMenu';
import { useUserStore } from '@/stores/user';
const { navigationMenu } = useNavigationMenu();

const authStore = useAuthStore();
const userStore = useUserStore();
</script>

<template>
  <!-- ---------------------------------------------- -->
  <!-- profile DD -->
  <!-- ---------------------------------------------- -->
  <div class="pa-4">
    <h4 class="mb-n1">你好 <span class="font-weight-regular">{{ userStore.user.userInfo?.nickname }}</span></h4>
    <span class="text-subtitle-2 text-medium-emphasis">个人设置</span>

    <v-divider></v-divider>
    <perfect-scrollbar style="max-height: 515px">
      <div class="bg-lightwarning rounded-md px-3 my-3 circle sm-circle lg-circle">
        <!-- <h6 class="text-subtitle-2 text-medium-emphasis mr-1 mt-2">菜单</h6> -->

        <v-btn variant="text"
            v-for="item in navigationMenu"
            :key="item.label"
            :to="item.route"
            exact
            class="text-h6 text-high-emphasis mt-2 mb-2"
        >
            {{ item.label }}
        </v-btn>
      </div>

      <v-divider></v-divider>

      <div class="bg-lightprimary rounded-md px-5 py-3 my-3">
        
      </div>

      <v-divider></v-divider>

      <v-list class="mt-3">
        <v-list-item @click="authStore.logout()" color="secondary" rounded="md">
          <template v-slot:prepend>
            <LogoutIcon size="20" class="mr-2" />
          </template>

          <v-list-item-title class="text-subtitle-2">退出登录</v-list-item-title>
        </v-list-item>
      </v-list>
    </perfect-scrollbar>
  </div>
</template>
