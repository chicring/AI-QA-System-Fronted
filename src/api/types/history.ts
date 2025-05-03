import type { ApiResponse, PaginatedData, BasePageParams } from './common';
import type { QuestionItem } from './question'; // 引入 QuestionItem 因为历史记录中包含问题详情

/**
 * 历史记录项基本结构
 */
export interface HistoryItem {
  id: number; // 注意：openapi 定义为 int64
  questionId: number; // 注意：openapi 定义为 int64
  status: number;
  viewCount: number; // 注意：openapi 定义为 int64
  username: string;
  updateTime: string;
  question: QuestionItem; // 嵌套的问题详情
}

/**
 * `/v1/history/list` (GET) 请求查询参数类型
 */
export interface HistoryListQueryParams extends BasePageParams {
  status?: number;
  difficulty?: number;
  // q 继承自 BasePageParams，用于查询题目关键字
}

/**
 * `/v1/history/list` (GET) 响应类型
 */
export type HistoryListResponse = ApiResponse<PaginatedData<HistoryItem>>;

/**
 * `/v1/history` (PUT) 请求体类型 - 标记历史记录
 */
export interface MarkHistoryRequest {
  id?: number; // 注意：openapi 定义为 int64
  questionId?: number; // 注意：openapi 定义为 int64
  status: number;
}

/**
 * `/v1/history` (PUT) 响应类型
 */
export type MarkHistoryResponse = ApiResponse<string>;

/**
 * `/v1/history/{id}` (DELETE) 响应类型
 */
export type DeleteHistoryResponse = ApiResponse<string>;

/**
 * `/v1/history/heatmap` (GET) 响应数据项类型
 */
export interface HeatmapDataItem {
  date: string;
  count: number;
}

/**
 * `/v1/history/heatmap` (GET) 响应类型
 */
export type HeatmapResponse = ApiResponse<HeatmapDataItem[]>;