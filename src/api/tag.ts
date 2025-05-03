import request from '@/utils/request'; // 假设存在一个封装好的请求工具
import type {
  SaveTagRequest,
  SaveTagResponse,
  DeleteTagResponse,
  TagListQueryParams,
  TagListResponse,
  AllTagsResponse
} from './types/tag';

/**
 * 保存或更新标签
 * @param data 请求体，包含标签信息
 * @returns Promise<SaveTagResponse>
 */
export const saveTag = (data: SaveTagRequest): Promise<SaveTagResponse> => {
  return request({
    url: '/v1/tag',
    method: 'post',
    data
  });
};

/**
 * 删除标签
 * @param id 标签ID
 * @returns Promise<DeleteTagResponse>
 */
export const deleteTag = (id: number): Promise<DeleteTagResponse> => {
  return request({
    url: `/v1/tag/${id}`,
    method: 'delete'
  });
};

/**
 * 获取标签列表（分页）
 * @param params 查询参数，包含分页信息等
 * @returns Promise<TagListResponse>
 */
export const getTagList = (params: TagListQueryParams): Promise<TagListResponse> => {
  return request({
    url: '/v1/tag/list',
    method: 'get',
    params
  });
};

/**
 * 查询所有标签（不分页）
 * @returns Promise<AllTagsResponse>
 */
export const getAllTags = (): Promise<AllTagsResponse> => {
  return request({
    url: '/v1/tag/all',
    method: 'get'
  });
};