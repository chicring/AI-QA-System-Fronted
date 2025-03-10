import axios from 'axios'
import { useAuthStore } from '@/stores/auth';
import { router } from '@/router';

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
        
        if (res.code === 200) {
            return res
        } else if (res.code === 401) {
            // useAuthStore().logout()
           
            // router.push('/auth/login')
        } else {

            return Promise.reject(res)
        }
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
);

export default service