import request from "@/utils/request"
import type {
    CategoryListQueryParams,
    ApiResponse,
    CategoryListResponse,
    CategoryItem,
    CategoryUpdateRequest,
    CategoryCreateRequest
} from "./types/index"

/**
 * 获取问题分类列表
 * @param params 查询参数
 */
export function getQuestionCategoryList(params: CategoryListQueryParams): Promise<ApiResponse<CategoryListResponse>> {
    return request.get('/v1/category/list',
        {
            params: params
        }
    )
}

/**
 * 获取分类详情
 * @param id 分类ID
 */
export function getCategoryDetail(id: number): Promise<ApiResponse<CategoryItem>> {
    return request.get(`/v1/category/${id}`)
}

/**
 * 更新分类信息
 * @param data 分类更新数据
 */
export function updateCategory(data: CategoryUpdateRequest): Promise<ApiResponse<string>> {
    return request.put('/v1/category', data)
}

/**
 * 添加新分类
 * @param data 分类创建数据
 */
export function addCategory(data: CategoryCreateRequest): Promise<ApiResponse<string>> {
    return request.post('/v1/category', data)
}

/**
 * 删除分类
 * @param id 分类ID
 */
export function deleteCategory(id: number): Promise<ApiResponse<string>> {
    return request.delete(`/v1/category/${id}`)
}