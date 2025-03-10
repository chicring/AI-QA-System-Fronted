import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { authState } from './types';
import type { UserLoginRequest, UserLoginResponse } from '@/api/types/user';
import { loginByUsername } from '@/api/user';

export const useAuthStore = defineStore('auth', () => {
    // 用户状态
    const auth = ref<authState>({
        token: null,
        remember: false
    });

    const getToken = () => {
        return auth.value?.token; // 使用可选链操作符
    }

    const login = async (data: UserLoginRequest) => {
        const res = await loginByUsername(data);
        auth.value.token = res.data.token
    }

    const logout = () => {
        auth.value.token = null;
    }

    return { 
        auth,
        getToken,
        login,
        logout 
    };
}, {
    persist: true
});
