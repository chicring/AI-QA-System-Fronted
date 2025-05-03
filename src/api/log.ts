import request from '@/utils/request';
import type { LogListQueryParams, LogListResponse } from './types/log';

/**
 * 查询操作日志（分页）
 * @param params 查询参数，包括分页信息和过滤条件
 * @returns Promise<LogListResponse>
 */
export const getLogList = (params: LogListQueryParams): Promise<LogListResponse> => {
  return request({
    url: '/v1/log/page',
    method: 'get',
    params
  });
}; 