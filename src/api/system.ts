import request from '@/utils/request';
import type { SystemInfoResponse } from './types/system';

/**
 * 获取系统信息
 * @returns Promise<SystemInfoResponse>
 */
export const getSystemInfo = (): Promise<SystemInfoResponse> => {
  return request({
    url: '/v1/system/info',
    method: 'get'
  });
}; 