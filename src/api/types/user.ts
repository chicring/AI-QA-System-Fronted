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

// 用户信息
export interface UserItem {
  username: string;
  nickname: string;
  email: string;
  mobile: string;
  sex: number;
  avatar: string;
  role: string;
  status: string;
  loginIp: string;
  used_quota: number;
  requestCount: number;
}

// 用户分页查询参数
export interface UserPageQueryVO {
  page: number;
  size: number;
  username?: string;
}

// 用户分页响应
export interface UserPageResponse {
  pageNum: number;
  pageSize: number;
  total: number;
  data: UserItem[];
}

// API 响应
export interface ApiResponse<T> {
  code: number;
  msg: string;
  requestId: string;
  data: T;
}

// 用户状态切换请求
export interface UserStatusToggleRequest {
  username: string;
  status: string;
}

export type { UserLoginRequest, UserLoginResponse, UserInfoResponse, UserRegisterRequest, UpdateUserInfoRequest };
