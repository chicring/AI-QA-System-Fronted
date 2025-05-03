import type { ApiResponse, PaginatedData, BasePageParams } from './common';

/**
 * 日志项基本结构
 */
export interface LogItem {
  id: number;
  content: string;
  methodName: string;
  requestParams: string;
  operator: string;
  operationTime: { seconds: number; nanos: number };
  timeTaken: number;
}


/**
 * `/v1/log/page` (GET) 请求查询参数类型
 */
export interface LogListQueryParams extends BasePageParams {
  operator?: string;
  startTime?: string;
  endTime?: string;
}

/**
 * `/v1/log/page` (GET) 响应类型
 */
export type LogListResponse = ApiResponse<PaginatedData<LogItem>>; 