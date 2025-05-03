import request from '@/utils/request';
import type {
  NoticeListQueryParams,
  NoticeListResponse,
  MarkAllReadResponse,
  DeleteNoticeResponse,
  UpdateNoticeStatusParams,
  UpdateNoticeStatusResponse,
  SendNoticeRequest,
  SendNoticeResponse
} from './types/notice';

/**
 * 获取通知列表（分页）
 * @param params 查询参数，包括分页信息和过滤条件
 * @returns Promise<NoticeListResponse>
 */
export const getNoticeList = (params: NoticeListQueryParams): Promise<NoticeListResponse> => {
  return request({
    url: '/v1/notice/list',
    method: 'get',
    params
  });
};

/**
 * 标记所有通知为已读
 * @returns Promise<MarkAllReadResponse>
 */
export const markAllNoticesRead = (): Promise<MarkAllReadResponse> => {
  return request({
    url: '/v1/notice/mark-all-read',
    method: 'put'
  });
};

/**
 * 删除通知
 * @param id 通知ID
 * @returns Promise<DeleteNoticeResponse>
 */
export const deleteNotice = (id: number): Promise<DeleteNoticeResponse> => {
  return request({
    url: `/v1/notice/${id}`,
    method: 'delete'
  });
};

/**
 * 更新通知状态
 * @param id 通知ID
 * @param params 查询参数，包含状态信息
 * @returns Promise<UpdateNoticeStatusResponse>
 */
export const updateNoticeStatus = (id: number, params: UpdateNoticeStatusParams): Promise<UpdateNoticeStatusResponse> => {
  return request({
    url: `/v1/notice/status/${id}`,
    method: 'get',
    params
  });
};

/**
 * 管理端获取通知列表（分页）
 * @param params 查询参数，包括分页信息和过滤条件
 * @returns Promise<NoticeListResponse>
 */
export const getAdminNoticeList = (params: NoticeListQueryParams): Promise<NoticeListResponse> => {
  return request({
    url: '/v1/notice/admin/page',
    method: 'get',
    params
  });
};

/**
 * 管理端发送通知
 * @param data 请求体，包含通知信息
 * @returns Promise<SendNoticeResponse>
 */
export const sendNotice = (data: SendNoticeRequest): Promise<SendNoticeResponse> => {
  return request({
    url: '/v1/notice/admin/send',
    method: 'post',
    data
  });
}; 