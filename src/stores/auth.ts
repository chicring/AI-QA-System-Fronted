import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { authState } from './types';

export const useAuthStore = defineStore('user', () => {
    // 用户状态
    const auth = ref<authState>({
        token: null,
        remember: false
    });

    const getToken = () => {
        return auth.value?.token; // 使用可选链操作符
    }

    const setToken = (token: string | null) => {
        auth.value.token = token;
    }

    const clearToken = () => {
        auth.value.token = null;
    }

    return { 
        auth,
        getToken,
        setToken,
        clearToken 
    };
}, {
    persist: true
});
