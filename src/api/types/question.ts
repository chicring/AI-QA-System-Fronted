import type { ApiResponse, PaginatedData, BasePageParams } from './common';

/**
 * 问题项基本结构 (用于列表和详情)
 */
export interface QuestionItem {
  id: number; // 注意：openapi 定义为 int64，TS 中用 number
  questionTitle: string;
  questionTips: string;
  difficulty: number;
  answer: string;
  categoryName: string;
  tagNames: string[];
  viewCount?: number; // 列表接口包含，设为可选
  createTime?: { seconds: number; nanos: number }; // 列表接口包含，设为可选
}

/**
 * `/v1/question` (POST) 请求体类型 - 保存或更新问题
 */
export interface SaveQuestionRequest {
  id?: number; // 更新时需要 id
  questionTitle: string;
  questionTips: string;
  difficulty: number;
  answer: string;
  categoryName: string;
  tagNames: string[];
}

/**
 * `/v1/question` (POST) 响应类型
 * data 通常是操作结果的标识或空，这里根据 openapi 定义为 string
 */
export type SaveQuestionResponse = ApiResponse<string>;

/**
 * `/v1/question/{questionId}` (DELETE) 响应类型
 */
export type DeleteQuestionResponse = ApiResponse<string>;

/**
 * `/v1/question/list-question` (POST) 请求体类型
 */
export interface QuestionListRequest extends BasePageParams {
  categoryId?: number; // 注意：openapi 定义为 int64
  categoryName?: string;
  title?: string;
  difficulty?: number;
  tagNames?: string[];
}

/**
 * `/v1/question/list-question` (POST) 响应类型
 */
export type QuestionListResponse = ApiResponse<PaginatedData<QuestionItem>>;

/**
 * `/v1/question/import` (POST) 请求体类型 (FormData)
 */
export interface QuestionImportFormData {
  file: File; // 或 Blob
}

/**
 * `/v1/question/import` (POST) 响应类型
 */
export type QuestionImportResponse = ApiResponse<string>;

// `/v1/question/template` (GET) 通常是文件下载，响应类型可能为 Blob 或 ArrayBuffer
// 在 API 函数中处理，这里不定义特定类型