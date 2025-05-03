import request from '@/utils/request';
import type {
  LoginRequest,
  LoginResponse,
  UpdateUserInfoRequest,
  UpdateUserInfoResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
  GetUserInfoResponse,
  AdminUserListQueryParams,
  AdminUserListResponse,
  UserRegisterRequest,
  RegisterResponse
} from './types/account';

/**
 * 用户登录
 * @param data 登录信息
 * @returns Promise<LoginResponse>
 */
export const login = (data: LoginRequest): Promise<LoginResponse> => {
  return request({
    url: '/v1/account/login',
    method: 'post',
    data
  });
};

/**
 * 更新用户信息
 * @param data 用户信息
 * @returns Promise<UpdateUserInfoResponse>
 */
export const updateUserInfo = (data: UpdateUserInfoRequest): Promise<UpdateUserInfoResponse> => {
  return request({
    url: '/v1/account',
    method: 'put',
    data
  });
};

/**
 * 修改密码
 * @param data 密码信息
 * @returns Promise<ChangePasswordResponse>
 */
export const changePassword = (data: ChangePasswordRequest): Promise<ChangePasswordResponse> => {
  return request({
    url: '/v1/account/change-password',
    method: 'post',
    data
  });
};

/**
 * 获取当前用户信息
 * @returns Promise<GetUserInfoResponse>
 */
export const getUserInfo = (): Promise<GetUserInfoResponse> => {
  return request({
    url: '/v1/account/me',
    method: 'get'
  });
};

/**
 * 管理员获取用户列表
 * @param params 查询参数
 * @returns Promise<AdminUserListResponse>
 */
export const getAdminUserList = (params: AdminUserListQueryParams): Promise<AdminUserListResponse> => {
  return request({
    url: '/user/admin/page',
    method: 'get',
    params
  });
};

/**
 * 用户注册
 * @param data 注册信息
 * @returns Promise<RegisterResponse>
 */
export const register = (data: UserRegisterRequest): Promise<RegisterResponse> => {
  return request({
    url: '/v1/account',
    method: 'post',
    data
  });
};