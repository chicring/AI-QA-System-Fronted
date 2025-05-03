import type { ApiResponse, PaginatedData, BasePageParams } from './common';

/**
 * 用户信息结构
 */
export interface UserInfo {
  username: string;
  nickname: string;
  email: string;
  mobile: string;
  sex: number; // 性别：1-男性，2-女性
  avatar: string;
  role: string;
}

/**
 * 用户列表项结构（管理端）
 */
export interface UserListItem extends UserInfo {
  enabled: boolean; // 状态：1-启用，2-禁用
  loginIp: string;
  usedQuota: number;
  requestCount: number;
}

/**
 * 登录请求体类型
 */
export interface LoginRequest {
  username: string;
  password?: string;
}

/**
 * 登录响应数据结构
 */
export interface LoginResponseData {
  username: string;
  nickname: string;
  token: string;
}

/**
 * 登录响应类型
 */
export type LoginResponse = ApiResponse<LoginResponseData>;

/**
 * 更新用户信息请求体类型
 */
export interface UpdateUserInfoRequest {
  nickname?: string;
  email?: string;
  mobile?: string;
  sex?: number;
  avatar?: string;
}

/**
 * 更新用户信息响应类型
 */
export type UpdateUserInfoResponse = ApiResponse<string>;

/**
 * 修改密码请求体类型
 */
export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

/**
 * 修改密码响应类型
 */
export type ChangePasswordResponse = ApiResponse<string>;

/**
 * 获取用户信息响应类型
 */
export type GetUserInfoResponse = ApiResponse<UserInfo>;

/**
 * 管理员查询用户列表参数
 */
export interface AdminUserListQueryParams extends BasePageParams {
  username?: string;
}

/**
 * 管理员查询用户列表响应类型
 */
export type AdminUserListResponse = ApiResponse<PaginatedData<UserListItem>>;

/**
 * 用户注册请求类型
 */
export interface UserRegisterRequest {
  username: string;
  password: string;
  nickname: string;
  mobile: string;
  email: string;
  sex: number; // 性别：1-男性，2-女性
}

/**
 * 用户注册响应类型
 */
export type RegisterResponse = ApiResponse<string>; 