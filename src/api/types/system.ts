import type { ApiResponse } from './common';

/**
 * 系统信息结构
 */
export interface SystemInfo {
  questionCount: number;
  userCount: number;
  todayLogCount: number;
  totalLogCount: number;
}

/**
 * `/v1/system/info` (GET) 响应类型
 */
export type SystemInfoResponse = ApiResponse<SystemInfo>; 