import type { ApiResponse, PaginatedData, BasePageParams } from './common';

/**
 * 标签项基本结构 (用于列表和详情)
 */
export interface TagItem {
  id: number; // 注意：openapi 定义为 int64，TS 中用 number
  tagName: string;
  category?: string; // 列表接口可能会返回关联的分类名称，设为可选
}

/**
 * `/v1/tag` (POST) 请求体类型 - 保存或更新标签
 */
export interface SaveTagRequest {
  id?: number; // 更新时需要 id
  tagName: string;
  category?: string;
}

/**
 * `/v1/tag` (POST) 响应类型
 * data 通常是操作结果的标识或空，这里根据 openapi 定义为 string
 */
export type SaveTagResponse = ApiResponse<string>;

/**
 * `/v1/tag/{id}` (DELETE) 响应类型
 * data 通常是操作结果的标识或空，这里根据 openapi 定义为 string
 */
export type DeleteTagResponse = ApiResponse<string>;

/**
 * `/v1/tag/list` (GET) 请求查询参数类型
 */
export interface TagListQueryParams extends BasePageParams {
  // 这里可以添加特定于标签列表查询的参数，如果 openapi 中有定义的话
  // 例如：categoryId?: string;
}

/**
 * `/v1/tag/list` (GET) 响应类型
 */
export type TagListResponse = ApiResponse<PaginatedData<TagItem>>;

/**
 * `/v1/tag/all` (GET) 响应类型
 */
export type AllTagsResponse = ApiResponse<TagItem[]>;