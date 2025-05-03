import request from '@/utils/request'; // 假设存在一个封装好的请求工具
import type {
  SaveCategoryRequest,
  SaveCategoryResponse,
  CategoryDetailResponse,
  CategoryListQueryParams,
  CategoryListResponse
} from './types/category';

/**
 * 添加或更新分类
 * @param data 请求体，包含分类信息
 * @returns Promise<SaveCategoryResponse>
 */
export const saveCategory = (data: SaveCategoryRequest): Promise<SaveCategoryResponse> => {
  return request({
    url: '/v1/category',
    method: 'post',
    data
  });
};

/**
 * 获取分类详情
 * @param id 分类ID
 * @returns Promise<CategoryDetailResponse>
 */
export const getCategoryDetail = (id: number): Promise<CategoryDetailResponse> => {
  return request({
    url: `/v1/category/${id}`,
    method: 'get'
  });
};

/**
 * 获取分类列表（分页）
 * @param params 查询参数，包含分页信息等
 * @returns Promise<CategoryListResponse>
 */
export const getCategoryList = (params: CategoryListQueryParams): Promise<CategoryListResponse> => {
  return request({
    url: '/v1/category/list',
    method: 'get',
    params
  });
};

// 注意：openapi.yaml 中未定义 /v1/category/{id} 的 DELETE 方法，因此不创建 deleteCategory 函数