import type { ApiResponse, PaginatedData, BasePageParams } from './common';

/**
 * 通知项基本结构
 */
export interface NoticeItem {
  id: number;
  title: string;
  content: string;
  type: number; // 1:系统通知 2:其它通知
  status: number; // 1:未读 2:已读
  avatar: string;
  username: string;
  createTime: string;
}

/**
 * `/v1/notice/list` 和 `/v1/notice/admin/page` (GET) 请求查询参数类型
 */
export interface NoticeListQueryParams extends BasePageParams {
  status?: number;
  type?: number;
}

/**
 * `/v1/notice/list` 和 `/v1/notice/admin/page` (GET) 响应类型
 */
export type NoticeListResponse = ApiResponse<PaginatedData<NoticeItem>>;

/**
 * `/v1/notice/mark-all-read` (PUT) 响应类型
 */
export type MarkAllReadResponse = ApiResponse<string>;

/**
 * `/v1/notice/{id}` (DELETE) 响应类型
 */
export type DeleteNoticeResponse = ApiResponse<string>;

/**
 * `/v1/notice/status/{id}` (GET) 请求查询参数类型
 */
export interface UpdateNoticeStatusParams {
  status: number;
}

/**
 * `/v1/notice/status/{id}` (GET) 响应类型
 */
export type UpdateNoticeStatusResponse = ApiResponse<string>;

/**
 * `/v1/notice/admin/send` (POST) 请求体类型
 */
export interface SendNoticeRequest {
  title: string;
  content: string;
  username: string;
}

/**
 * `/v1/notice/admin/send` (POST) 响应类型
 */
export type SendNoticeResponse = ApiResponse<string>; 