import request from "@/utils/request"
import type { ApiResponse } from "./types/index"
import type {
    NotificationItem,
    NotificationListResponse,
    QueryNotificationVO,
    AdminNotificationQueryVO,
    AdminNotificationResponse,
    SendNotificationRequest
} from "./types/notice"

/**
 * 删除通知
 * @param id 通知ID
 */
export function deleteNotification(id: number): Promise<ApiResponse<string>> {
    return request.delete(`/v1/notice/${id}`)
}

/**
 * 更新通知状态
 * @param id 通知ID
 * @param status 状态值
 */
export function updateNotificationStatus(id: number, status: number): Promise<ApiResponse<string>> {
    return request.get(`/v1/notice/status/${id}`, {
        params: { status }
    })
}

/**
 * 分页查询通知
 * @param params 查询参数
 */
export function getNotificationList(params: QueryNotificationVO): Promise<ApiResponse<NotificationListResponse>> {
    return request.get('/v1/notice/list', {
        params: params
    })
}

/**
 * 标记所有通知已读
 */
export function markAllRead(): Promise<ApiResponse<string>> {
    return request.put('/v1/notice/mark-all-read')
}

/**
 * 管理端分页查询通知
 * @param params 查询参数
 */
export function getAdminNotificationList(params: AdminNotificationQueryVO): Promise<ApiResponse<AdminNotificationResponse>> {
    return request.get('/v1/notice/admin/page', {
        params: params
    })
} 

/**
 * 发送通知
 * @param data 发送通知请求
 */
export function sendNotification(data: SendNotificationRequest): Promise<ApiResponse<string>> {
    return request.post('/v1/notice/admin/send', data)
}