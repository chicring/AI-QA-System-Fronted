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
    NotificationListResponse,
    QueryNotificationVO,
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


// 查询通知列表
export function getNotificationList(params: QueryNotificationVO): Promise<ApiResponse<NotificationListResponse>> {
    return request.get('/v1/notice/list', {
        params: params
    })
}

// 删除通知
export function deleteNotification(id: number): Promise<ApiResponse<null>> {
    return request.delete(`/v1/notice/${id}`)
}


// 标记全部已读
export function markAllRead(): Promise<ApiResponse<null>> {
    return request.put('/v1/notice/mark-all-read')
}