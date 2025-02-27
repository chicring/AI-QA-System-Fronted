import request from '@/utils/request'
import type { LoginRequest } from './types'

export function login(data: LoginRequest) {
    return request.post('/auth/login', data)
}

export function register(data: any) {
    return request.post('/auth/register', data)
}
