import axios from 'axios'
import { useAuthStore } from '@/stores/auth';
import { useToast } from "primevue/usetoast";
import router from '@/router';

const AuthTokenKey = 'Authorization'


const service = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 5000,
});

service.interceptors.request.use(
    (config) => {
        const token = useAuthStore().getToken()
        if (token) {
            config.headers[AuthTokenKey] = token
        }
        return config;
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
);

service.interceptors.response.use(
    response => {
        const res = response.data
        const toast = useToast()
        if (res.code === 200) {
            return res.data
        } else if (res.code === 401) {
            useAuthStore().clearToken()
            toast.add({ severity: 'error', summary: '登录失效', detail: res.message, life: 3000 })
            router.push('/auth/login')
        } else {
            toast.add({ severity: 'error', summary: '错误', detail: res.message, life: 3000 })
            return Promise.reject(res)
        }
    },
    error => {
        const toast = useToast()
        toast.add({ severity: 'error', summary: '错误', detail: error.response.data.message, life: 3000 })
        return Promise.reject(error)
    }
);

export default service