import type { ApiResponse } from './common';

/**
 * `/v1/chat/stream` 请求体类型
 */
export interface ChatStreamRequest {
  message: string;
  conversationId: string;
  files?: string; // 附加文件名，可以通过上传接口拿到 (根据 description 设为可选)
  interviewer: string; // 面试官
}

/**
 * `/v1/chat/stream` 响应流中的单个消息项类型
 */
export interface ChatStreamResponseItem {
  id: string;
  content: string;
  finishReason: 'STOP' | string; // STOP - 停止 (根据 description 添加枚举)
}

// 类型别名，用于保持向后兼容性
export type ChatRequest = ChatStreamRequest;
export type ChatResponse = ChatStreamResponseItem;

// 注意：/v1/chat/stream 的完整响应是 ChatStreamResponseItem[]
// 通常流式响应在客户端需要特殊处理，这里只定义单个消息项的结构

/**
 * `/v1/chat/upload` 请求参数类型 (Query)
 */
export interface ChatUploadQueryParams {
  conversationId: string;
}

/**
 * `/v1/chat/upload` 请求体类型 (FormData)
 * FormData 在 TypeScript 中通常不直接定义接口，但在函数签名中会体现
 * 这里可以定义一个辅助类型说明需要包含 'file' 字段
 */
export interface ChatUploadFormData {
  file: File; // 或者 Blob
}

/**
 * `/v1/chat/upload` 响应类型
 * data 是上传后的文件名或标识符
 */
export type ChatUploadResponse = ApiResponse<string>;