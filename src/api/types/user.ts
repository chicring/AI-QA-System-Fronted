
interface UserLoginRequest {
    username: string;
    password: string;
}


interface UserLoginResponse {
    token: string;
    nickname: string;
    username: string;
}

interface UserInfoResponse {
    username: string;
    nickname: string;
    mobile: string | null;
    sex: number;
    avatar: string | null;
    email: string | null;
}

interface UserRegisterRequest {
    username: string;
    password: string;
    nickname: string;
    mobile: string;
    email: string;
    sex: number;
}

interface UpdateUserInfoRequest  {
    nickname: string | null;
    email: string   | null;
    mobile: string  | null;
    sex: number | null;
    avatar: string | null;
}

// NotificationDTO

// NotificationItem
interface NotificationItem {
    id: number;
    title: string;
    content: string;
    type: number;
    status: number;
    createTime: Date;
}

interface NotificationListResponse  {
    pageNum: number;
    pageSize: number;
    total: number;
    data: NotificationItem[];
}
interface QueryNotificationVO {
    pageNum: number;
    pageSize: number;
    status: number | null;
    type: number | null;
}
export type { UserLoginRequest, UserLoginResponse, UserInfoResponse, UserRegisterRequest, UpdateUserInfoRequest, NotificationItem, NotificationListResponse, QueryNotificationVO };
