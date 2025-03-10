import { defineStore } from "pinia";
import { ref } from "vue";
import type { userState } from "./types";
import { getUserInfo } from "@/api/user";

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

    return {
        user,
        fetchUserInfo
    }
}, {
    persist: true
})
