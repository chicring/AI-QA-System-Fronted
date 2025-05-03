import { defineStore } from "pinia";
import { ref } from "vue";
import type { userState } from "./types";
import { getUserInfo } from "@/api";

export const useUserStore = defineStore('user', () => {
    const user = ref<userState>(
        {
            userInfo: null
        }
    );

    const fetchUserInfo = async () => {
        const res = await getUserInfo();
        user.value.userInfo = res.data;
    }

    const clearUserInfo = () => {
        user.value.userInfo = null;
    }

    return {
        user,
        fetchUserInfo,
        clearUserInfo
    }
}, {
    persist: true
})
