import request from "@/utils/request"
import type { 
    ApiResponse 
} from "./types/index"

import type {
    UserLoginRequest,
    UserLoginResponse,
    UserInfoResponse,
    UserRegisterRequest,
    UpdateUserInfoRequest,
    UserPageQueryVO,
    UserPageResponse,
    UserStatusToggleRequest
} from "./types/user"

export function loginByUsername(data: UserLoginRequest): Promise<ApiResponse<UserLoginResponse>> {
    return request.post('/v1/account/login', data)
}

export function getUserInfo(): Promise<ApiResponse<UserInfoResponse>> {
    return request.get('/v1/account/me')
}

export function register(data: UserRegisterRequest): Promise<ApiResponse<UserInfoResponse>> {
    return request.post('/v1/account', data)
}

export function updateUserInfo(data : UpdateUserInfoRequest): Promise<ApiResponse<null>> {
    return request.put('/v1/account', data)
}

/**
 * 获取用户列表（分页）
 * @param params 查询参数
 */
export function getUserList(params: UserPageQueryVO): Promise<ApiResponse<UserPageResponse>> {
    return request.get('/user/admin/page', {
        params: {
            page: params.page,
            size: params.size,
            username: params.username
        }
    })
}

/**
 * 切换用户状态
 * @param data 状态切换请求
 */
export function toggleUserStatus(data: UserStatusToggleRequest): Promise<ApiResponse<null>> {
    return request.put('/user/admin/status', data)
}