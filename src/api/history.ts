import request from '@/utils/request';
import type {
  HistoryListQueryParams,
  HistoryListResponse,
  MarkHistoryRequest,
  MarkHistoryResponse,
  DeleteHistoryResponse,
  HeatmapResponse
} from './types/history';

/**
 * 查询历史记录（分页）
 * @param params 查询参数，包括分页信息和过滤条件
 * @returns Promise<HistoryListResponse>
 */
export const getHistoryList = (params: HistoryListQueryParams): Promise<HistoryListResponse> => {
  return request({
    url: '/v1/history/list',
    method: 'get',
    params
  });
};

/**
 * 标记历史记录
 * @param data 请求体，包含状态信息
 * @returns Promise<MarkHistoryResponse>
 */
export const markHistory = (data: MarkHistoryRequest): Promise<MarkHistoryResponse> => {
  return request({
    url: '/v1/history',
    method: 'put',
    data
  });
};

/**
 * 删除历史记录
 * @param id 历史记录ID
 * @returns Promise<DeleteHistoryResponse>
 */
export const deleteHistory = (id: number): Promise<DeleteHistoryResponse> => {
  return request({
    url: `/v1/history/${id}`,
    method: 'delete'
  });
};

/**
 * 获取热力图数据
 * @returns Promise<HeatmapResponse>
 */
export const getHeatmapData = (): Promise<HeatmapResponse> => {
  return request({
    url: '/v1/history/heatmap',
    method: 'get'
  });
}; 