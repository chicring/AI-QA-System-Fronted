import request from "@/utils/request"
import type { 
    ApiResponse, 
    QueryOperationLogVO,
    OperationLogResponse
} from "./types/index"

/**
 * 获取操作日志列表
 * @param params 查询参数
 */
export function getOperationLogList(params: QueryOperationLogVO): Promise<ApiResponse<OperationLogResponse>> {
    return request.get('/v1/log/page', {
        params: params
    })
} 