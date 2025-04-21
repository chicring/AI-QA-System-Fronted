import request from "@/utils/request"
import type {
    ApiResponse,
    QueryHistoryRequest,
    QueryHistoryResponse,
    MarkHistoryRequest
} from "./types/index"
import type { HeatmapItem } from "@/types/chats/heatmap"

/**
 * 查询历史
 * @param params 查询参数
 */
export function getQueryHistory(params: QueryHistoryRequest): Promise<ApiResponse<QueryHistoryResponse>> {
    return request.get('/v1/history/list', {
        params: params
    })
}

/**
 * 获取热力图数据
 */
export function getHeatmapData(): Promise<ApiResponse<HeatmapItem[]>> {
    return request.get('/v1/history/heatmap')
}

/**
 * 标记历史记录
 * @param data 历史记录标记数据
 */
export function markHistory(data: MarkHistoryRequest): Promise<ApiResponse<string>> {
    return request.put('/v1/history', data)
}

/**
 * 删除历史记录
 * @param id 历史记录ID
 */
export function deleteHistory(id: number): Promise<ApiResponse<string>> {
    return request.delete(`/v1/history/${id}`)
}

/**
 * 标记题目状态（旧版本，保留兼容性）
 * @param questionId 问题ID
 * @param status 状态码
 * @deprecated 请使用 markHistory 代替
 */
export function updateQuestionStatus(questionId: string, status: number): Promise<ApiResponse<null>> {
    return request.put(`/v1/history/${questionId}`, null, {
        params: { status }
    });
}