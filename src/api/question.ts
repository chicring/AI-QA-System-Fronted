import request from "@/utils/request"
import type { 
    CategoryListQueryParams, 
    ApiResponse, 
    CategoryListResponse,
    QuestionListQueryParams,
    QuestionListResponse,
    QuestionItem,
    TagGroup,
    QuestionAnswerItem,
    QueryHistoryRequest,
    QueryHistoryResponse,
    CategoryItem
} from "./types/index"
import type { HeatmapItem } from "@/types/chats/heatmap"


export function getQuestionCategoryList(params: CategoryListQueryParams): Promise<ApiResponse<CategoryListResponse>> {
    return request.get('/v1/category/list',
        {
            params: params
        }
    )
}

export function getQuestionList(params: QuestionListQueryParams): Promise<ApiResponse<QuestionListResponse>> {
    return request.post('/v1/question/list-question',
        params
    )
}

export function getTagListGroup(): Promise<ApiResponse<TagGroup[]>> {
    return request.get('/v1/tag/list-group')
}

export function getQuestionDetailById(id: string): Promise<ApiResponse<QuestionItem>> {
    return request.get(`/v1/question/${id}`)
}

export function getQuestionAnswerList(id: number): Promise<ApiResponse<QuestionAnswerItem>> {
    return request.get(`/v1/answer/${id}`)
}


// 查询历史
export function getQueryHistory(params: QueryHistoryRequest): Promise<ApiResponse<QueryHistoryResponse>> {
    return request.get('/v1/history/list', {
        params: params
    })
}

// 获取热力图数据
export function getHeatmapData(): Promise<ApiResponse<HeatmapItem[]>> {
    return request.get('/v1/history/heatmap')
}

// 获取分类详情
export function getCategoryDetail(id: string): Promise<ApiResponse<CategoryItem>> {
    return request.get(`/v1/category/${id}`)
}

// 标记题目状态
export function updateQuestionStatus(questionId: string, status: number): Promise<ApiResponse<null>> {
    return request.put(`/v1/history/${questionId}`, null, {
        params: { status }
    });
}