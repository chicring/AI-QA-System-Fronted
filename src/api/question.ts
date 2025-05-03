import request from '@/utils/request'; // 假设存在一个封装好的请求工具
import type {
  SaveQuestionRequest,
  SaveQuestionResponse,
  DeleteQuestionResponse,
  QuestionListRequest,
  QuestionListResponse,
  QuestionImportFormData,
  QuestionImportResponse,
  QuestionItem
} from './types/question';
import type { ApiResponse } from './types/common';


/**
 * 根据问题id获取问题
 * @param questionId 问题ID
 * @returns Promise<ApiResponse<QuestionItem>>
 */
export const getQuestionById = (questionId: number): Promise<ApiResponse<QuestionItem>> => {
  return request({
    url: `/v1/question/${questionId}`,
    method: 'get'
  });
};

/**
 * 保存或更新问题
 * @param data 请求体，包含问题信息
 * @returns Promise<SaveQuestionResponse>
 */
export const saveQuestion = (data: SaveQuestionRequest): Promise<SaveQuestionResponse> => {
  return request({
    url: '/v1/question',
    method: 'post',
    data
  });
};

/**
 * 删除问题
 * @param questionId 问题ID
 * @returns Promise<DeleteQuestionResponse>
 */
export const deleteQuestion = (questionId: number): Promise<DeleteQuestionResponse> => {
  return request({
    url: `/v1/question/${questionId}`,
    method: 'delete'
  });
};

/**
 * 获取问题列表（分页、筛选）
 * @param data 请求体，包含分页和筛选参数
 * @returns Promise<QuestionListResponse>
 */
export const getQuestionList = (data: QuestionListRequest): Promise<QuestionListResponse> => {
  return request({
    url: '/v1/question/list-question',
    method: 'post', // 注意：根据 openapi 定义，这里是 POST 请求
    data
  });
};

/**
 * 导入问题
 * @param formData FormData 对象，包含文件
 * @returns Promise<QuestionImportResponse>
 */
export const importQuestions = (formData: QuestionImportFormData): Promise<QuestionImportResponse> => {
  return request({
    url: '/v1/question/import',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: formData
  });
};

/**
 * 下载问题导入模板
 * @returns Promise<Blob>
 */
export const downloadQuestionTemplate = (): Promise<Blob> => {
  return request({
    url: '/v1/question/template',
    method: 'get',
    responseType: 'blob' // 重要：指定响应类型为 blob
  });
};