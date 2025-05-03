import type { ApiResponse, PaginatedData, BasePageParams } from './common';

/**
 * 分类项基本结构 (用于列表和详情)
 */
export interface CategoryItem {
  id: number; // 注意：openapi 定义为 int64，TS 中用 number
  categoryName: string;
  description: string;
  categoryLevel: number;
  sortNum: number;
  imageUrl: string;
}

/**
 * `/v1/category` (POST) 请求体类型 - 添加或更新分类
 */
export interface SaveCategoryRequest {
  id?: number; // 更新时需要 id
  categoryName: string;
  description: string;
  categoryLevel: number;
  sortNum: number;
  imageUrl: string;
}

/**
 * `/v1/category` (POST) 响应类型
 * data 通常是操作结果的标识或空，这里根据 openapi 定义为 string
 */
export type SaveCategoryResponse = ApiResponse<string>;

/**
 * `/v1/category/{id}` (GET) 响应类型 - 获取分类详情
 */
export type CategoryDetailResponse = ApiResponse<CategoryItem>;

/**
 * `/v1/category/list` (GET) 请求查询参数类型
 */
export interface CategoryListQueryParams extends BasePageParams {
  // 这里可以添加特定于分类列表查询的参数，如果 openapi 中有定义的话
}

/**
 * `/v1/category/list` (GET) 响应类型
 */
export type CategoryListResponse = ApiResponse<PaginatedData<CategoryItem>>;

/**
 * `/v1/category/{id}` (DELETE) 响应类型
 * 需要查看 openapi.yaml 确认是否有 DELETE 接口及其响应
 * 假设存在且响应结构类似
 */
// export type DeleteCategoryResponse = ApiResponse<string>;
// 经检查 openapi.yaml (截至 line 400)，未发现 /v1/category/{id} 的 DELETE 方法，故注释掉