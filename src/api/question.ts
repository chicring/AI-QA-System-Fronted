import request from "@/utils/request"
import type { 
    ApiResponse, 
    QuestionListQueryParams,
    QuestionListResponse,
    QuestionItem,
    QuestionCreateRequest
} from "./types/index"

/**
 * 获取问题列表
 * @param params 查询参数
 */
export function getQuestionList(params: QuestionListQueryParams): Promise<ApiResponse<QuestionListResponse>> {
    return request.post('/v1/question/list-question',
        params
    )
}

/**
 * 根据ID获取问题详情
 * @param id 问题ID
 */
export function getQuestionDetailById(id: string): Promise<ApiResponse<QuestionItem>> {
    return request.get(`/v1/question/${id}`)
}


/**
 * 创建问题
 * @param data 问题数据
 */
export function createQuestion(data: QuestionCreateRequest): Promise<ApiResponse<any>> {
    return request.post('/v1/question', data)
}

/**
 * 删除问题
 * @param id 问题ID
 */
export function deleteQuestion(id: number): Promise<ApiResponse<any>> {
    return request.delete(`/v1/question/${id}`)
}

export function importQuestion(data: any): Promise<ApiResponse<any>> {
    return request.post('/v1/question/import', data)
}
