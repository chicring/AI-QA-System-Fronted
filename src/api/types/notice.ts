// 通知项类型
export interface NotificationItem {
    id: number;
    title: string;
    content: string;
    type: number;
    status: number;
    createTime: Date;
    username?: string;
    avatar?: string;
}

// 通知列表响应
export interface NotificationListResponse {
    pageNum: number;
    pageSize: number;
    total: number;
    data: NotificationItem[];
}

// 通知查询参数
export interface QueryNotificationVO {
    pageNum: number;
    pageSize: number;
    status: number | null;
    type: number | null;
}

// 管理端通知查询参数
export interface AdminNotificationQueryVO {
    pageNum?: number;
    pageSize?: number;
    status?: number | null;
    type?: number | null;
}

// 管理端通知响应
export interface AdminNotificationResponse {
    pageNum: number;
    pageSize: number;
    total: number;
    data: NotificationItem[];
} 

//  发送通知请求
export interface SendNotificationRequest {
    title: string;
    content: string;
    username: string;
}
