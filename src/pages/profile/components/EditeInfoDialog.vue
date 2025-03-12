<template>
    <v-btn variant="text" icon size="small" @click="options.showDialog = true">
        <v-tooltip
            activator="parent"
            location="top"
        >   修改资料
        </v-tooltip>
        <IconPencil :size="20" stroke="2" />

        <v-dialog
            v-model="options.showDialog"
            max-width="600"
        >
            <v-card flat>
                <v-card-title>
                    修改资料
                </v-card-title>
                <v-divider></v-divider>

                <v-card-text>
                    <v-form v-model="options.valid">
                        <v-row dense>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                    placeholder="昵称"
                                    flat
                                    rounded="md"
                                    variant="solo-filled"
                                    density="compact"
                                    v-model="request.nickname"
                                    :rules="rules.nickname"
                                    required
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                    placeholder="邮箱"
                                    flat
                                    rounded="md"
                                    variant="solo-filled"
                                    density="compact"
                                    v-model="request.email"
                                    :rules="rules.email"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                    placeholder="手机号"
                                    flat
                                    rounded="md"
                                    variant="solo-filled"
                                    density="compact"
                                    v-model="request.mobile"
                                    :rules="rules.mobile"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-select
                                    placeholder="性别"
                                    v-model="request.sex"
                                    :items="sexList"
                                    item-title="label"
                                    item-value="value"
                                    :rules="rules.sex"
                                    flat
                                    rounded="md"
                                    variant="solo-filled"
                                    density="compact"
                                    :list-props="{
                                        nav: true,
                                        density: 'comfortable',
                                        rounded: 'md',
                                    }"
                                ></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <!-- <v-file-input
                                    label="头像"
                                    v-model="request.avatar"
                                    :rules="rules.avatar"
                                    required
                                ></v-file-input> -->
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>

                <v-divider></v-divider>
                <v-card-actions class="my-2 d-flex justify-end">
                    <v-btn
                        class="text-none"
                        rounded="md"
                        text="取消"
                        @click="options.showDialog = false"
                    ></v-btn>

                    <v-btn
                        class="text-none"
                        color="primary"
                        rounded="md"
                        text="提交"
                        variant="flat"
                        @click="submit"
                    ></v-btn>
              </v-card-actions>
            </v-card>
        </v-dialog>
    </v-btn>
</template>

<script setup lang="ts">
import { ref,onMounted } from 'vue';
import { IconPencil } from '@tabler/icons-vue';
import type { UpdateUserInfoRequest } from '@/api/types/user';
import { useUserStore } from '@/stores/user';
import { updateUserInfo } from '@/api/user';
import { useToast } from 'vue-toast-notification';

const toast = useToast();
const userStore = useUserStore();

const sexList = ref([
    {
        label: '男',
        value: 1,
    },
    {
        label: '女',
        value: 2,
    },
]);

const options = ref({
    showDialog: false, 
    valid: false,
});

const request = ref<UpdateUserInfoRequest>({
    nickname: null,
    email: null,
    mobile: null,
    sex: null,
    avatar: null
});

const rules = ref({
    nickname: [
        (v: string) => !!v || '昵称不能为空',
        (v: string) => !v || v.length <= 10 || '昵称不能超过10个字符',
    ],
    email: [
        (v: string) => !v || /.+@.+\..+/.test(v) || '邮箱格式不正确',
    ],
    mobile: [
        (v: string) => !v || /^1[3456789]\d{9}$/.test(v) || '手机号格式不正确',
    ],
    sex: [
        (v: number) => !!v || '性别不能为空',
    ],
    avatar: [
        (v: string) => !!v || '头像不能为空',
    ],
})

function submit() {
    if (!options.value.valid) {
        return;
    }
    updateUserInfo(request.value).then((res) => {
        userStore.fetchUserInfo();
        options.value.showDialog = false;
        toast.success('修改成功', { position: 'top' });
    }).catch((err) => {
        toast.error('修改失败', { position: 'top' });
    });
}

onMounted(() => {
    request.value = {
        nickname: userStore.user.userInfo?.nickname || null,
        email: userStore.user.userInfo?.email || null,
        mobile: userStore.user.userInfo?.mobile || null,
        sex: userStore.user.userInfo?.sex || null,
        avatar: userStore.user.userInfo?.avatar || null
    }
})
</script>