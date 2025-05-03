import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { authState } from './types';
import type { LoginRequest, LoginResponse } from '@/api';
import { login as loginApi } from '@/api';
import { router } from '@/router';

export const useAuthStore = defineStore('auth', () => {
    // 用户状态
    const auth = ref<authState>({
        token: null,
        remember: false
    });

    const getToken = () => {
        return auth.value?.token; // 使用可选链操作符
    }
    
    const isLoggedIn = () => {
        return auth.value?.token !== null;
    }

    const login = async (data: LoginRequest) => {
        const res = await loginApi(data);
        auth.value.token = res.data.token
    }
    
    const logout = () => {
        auth.value.token = null;
        router.push('/login');
    }

    const clearAuth = () => {
        auth.value.token = null;
    }

    return { 
        auth,
        getToken,
        isLoggedIn,
        login,
        logout,
        clearAuth
    };
}, {
    persist: true
});
