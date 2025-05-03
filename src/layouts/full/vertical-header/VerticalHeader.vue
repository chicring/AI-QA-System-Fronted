<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useNavigationMenu } from '@/composables/useNavigationMenu';
// Icon Imports
import { IconLogin2 } from '@tabler/icons-vue';
import Logo from '../logo/LogoMain.vue';
import { useUserStore } from '@/stores/user';
import { useDisplay } from 'vuetify'
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

// dropdown imports
import NotificationDD from './NotificationDD.vue';
import ProfileDD from './ProfileDD.vue';
import ShortcutBar from './ShortcutBar.vue';


const showSearch = ref(false);
const isScrolled = ref(false);

const { mdAndUp } = useDisplay();
const { navigationMenu } = useNavigationMenu();
const userStore = useUserStore();
const authStore = useAuthStore();
const router = useRouter();
// 监听滚动事件
const handleScroll = () => {
  isScrolled.value = window.scrollY > 0;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

userStore.fetchUserInfo();
</script>

<template>
  <v-app-bar 
    elevation="0" 
    height="60"
    :class="{'app-bar-transparent': !isScrolled, 'app-bar-scrolled': isScrolled}"
  >
    <Logo class="ml-4" />

    <div  v-if="mdAndUp" class="d-flex ga-2 ml-4">
      <v-btn variant="text"
        v-for="item in navigationMenu"
        :key="item.label"
        :to="item.route"
        exact
        class="text-h4"
      >
        {{ item.label }}
      </v-btn>
    </div>
    <!-- <v-btn
      class="hidden-md-and-down text-secondary"
      color="lightsecondary"
      icon
      rounded="sm"
      variant="flat"
      @click.stop="customizer.SET_MINI_SIDEBAR(!customizer.mini_sidebar)"
      size="small"
    >
      <Menu2Icon size="20" stroke-width="1.5" />
    </v-btn>
    <v-btn
      class="hidden-lg-and-up text-secondary ms-3"
      color="lightsecondary"
      icon
      rounded="sm"
      variant="flat"
      @click.stop="customizer.SET_SIDEBAR_DRAWER"
      size="small"
    >
      <Menu2Icon size="20" stroke-width="1.5" />
    </v-btn> -->

    <!-- search mobile -->
    <!-- <v-btn
      class="hidden-lg-and-up text-secondary ml-3"
      color="lightsecondary"
      icon
      rounded="sm"
      variant="flat"
      size="small"
      @click="searchbox"
    >
      <SearchIcon size="17" stroke-width="1.5" />
    </v-btn>

    <v-sheet v-if="showSearch" class="search-sheet v-col-12">
      <Searchbar :closesearch="searchbox" />
    </v-sheet> -->

    <!-- ---------------------------------------------- -->
    <!-- Search part -->
    <!-- ---------------------------------------------- -->
    <!-- <v-sheet class="mx-3 v-col-3 v-col-xl-2 v-col-lg-4 d-none d-lg-block">
      <Searchbar />
    </v-sheet> -->

    <!---/Search part -->

    <v-spacer />
    <!-- ---------------------------------------------- -->
    <!---right part -->
    <!-- ---------------------------------------------- -->

    <!-- ---------------------------------------------- -->
    <!-- Notification -->
    <!-- ---------------------------------------------- -->
    <!-- <v-menu :close-on-content-click="false">
      <template v-slot:activator="{ props }">
        <v-btn icon class="text-secondary mx-3" color="lightsecondary" rounded="sm" size="small" variant="flat" v-bind="props">
          <BellIcon stroke-width="1.5" size="22" />
        </v-btn>
      </template>
      <v-sheet rounded="md" width="330" elevation="12">
      </v-sheet>
    </v-menu> -->

    <ShortcutBar />

    <NotificationDD />


    <!-- ---------------------------------------------- -->
    <!-- User Profile -->
    <!-- ---------------------------------------------- -->
    <v-menu v-if="authStore.isLoggedIn()" :close-on-content-click="false">
      <template v-slot:activator="{ props }">

        <v-avatar class="mr-5 ml-2" :image="userStore.user?.userInfo?.avatar!" v-bind="props">
            <img style="width: 36px; height: 36px; border-radius: 50%;" :src="userStore.user?.userInfo?.avatar!" />
        </v-avatar>
      </template>
      <v-sheet rounded="md" width="330" elevation="12">
        <ProfileDD />
      </v-sheet>
    </v-menu>

    <v-btn v-else  class="ml-2 mr-4" rounded="sm" density="comfortable" variant="outlined" @click="router.push('/login')">
      <span class="font-weight-bold">登录</span>
      <template #append>
        <IconLogin2 size="22" stroke-width="1.5"/>
      </template>
    </v-btn>
  </v-app-bar>
</template>

<style>
.app-bar-transparent {
  background-color: transparent !important;
  backdrop-filter: none;
  transition: all 0.3s ease;
  box-shadow: none !important;
}

.app-bar-scrolled {
  background-color: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(15px);
  transition: all 0.3s ease;
  box-shadow: none !important;
}
</style>
