<template>
    <v-card flat>
        <div class="d-flex align-center justify-space-between">
            <strong>
                用户信息
            </strong>

            <div>
                <EditeInfoDialog />

                <v-btn variant="text" icon size="small">
                    <v-tooltip
                        activator="parent"
                        location="top"
                    >个人设置</v-tooltip>
                    <IconSettings :size="20" stroke="2" />
                </v-btn>
            </div>

        </div>
        <v-divider class="my-2"></v-divider>
        <v-card-title class="d-flex flex-column align-center justify-center">
            <v-avatar size="80">
                <v-img :src="userStore.user?.userInfo?.avatar!" />
            </v-avatar>
            <span class="text-h4 my-1">
                {{ userStore.user?.userInfo?.nickname }}
            </span>

            <p class="text-body-2 my-2">个人简介</p>

            <div>
                <v-btn variant="text" icon size="small" color="#BDBDBD" @click="copyText('email')">
                    <IconMail :size="20" stroke="2" />
                </v-btn>
                <v-btn variant="text" icon size="small" color="#BDBDBD" @click="copyText('phone')">
                    <IconPhone :size="20" stroke="2" />
                </v-btn>
            </div>

            <p class="my-2 text-body-1 text-medium-emphasis">name: {{ userStore.user?.userInfo?.username }}</p>
        </v-card-title>
        <v-card-text>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import { IconPencil, IconSettings, IconMail, IconPhone } from '@tabler/icons-vue';
import { useUserStore } from '@/stores/user';
import EditeInfoDialog from './EditeInfoDialog.vue';
import { useToast } from 'vue-toast-notification';
import copy from 'copy-to-clipboard';

const userStore = useUserStore();
const toast = useToast();

function copyText(type: string) {
    const text = type === 'email' ? userStore.user?.userInfo?.email : userStore.user?.userInfo?.mobile;
    if (copy(text || '')) {
        toast.success('复制成功', { position: 'top' });
    } else {
        toast.error('复制失败', { position: 'top' });
    }
}
</script>
