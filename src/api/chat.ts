import request from '@/utils/request'; // 假设存在一个封装好的请求工具
// 注意：流式请求可能需要特殊的客户端处理，这里假设 request 或特定工具能处理
// import chatClient from '@/utils/chatClient'; // 或者使用专门的 chatClient
import type {
  ChatStreamRequest,
  ChatStreamResponseItem, // 单个消息项
  ChatUploadQueryParams,
  ChatUploadFormData,
  ChatUploadResponse
} from './types/chat';


/**
 * 上传聊天相关文件
 * @param params Query 参数，包含 conversationId
 * @param formData FormData 对象，包含文件
 * @returns Promise<ChatUploadResponse>
 */
export const uploadChatFile = (params: ChatUploadQueryParams, formData: FormData): Promise<ChatUploadResponse> => {
  // 注意：openapi.yaml 定义 formData 包含 file 字段，类型为 binary
  // 实际调用时需确保 formData.append('file', fileObject);
  return request({
    url: '/v1/chat/upload',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    params, // Query 参数
    data: formData // 请求体
  });
};