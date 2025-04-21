import request from "@/utils/request"
import type { ApiResponse, SystemInfo } from './types/index';

// 获取系统信息
export function getSystemInfo(): Promise<ApiResponse<SystemInfo>> {
    return request.get('/v1/system/info');
}
