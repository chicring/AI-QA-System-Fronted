import request from "@/utils/request"
import type { 
    ApiResponse, 
    TagGroup,
    PageResponse,
    TagItem,
    TagUpdateRequest
} from "./types/index"

/**
 * 获取标签列表分组
 */
export function getTagListGroup(): Promise<ApiResponse<TagGroup[]>> {
    return request.get('/v1/tag/list-group')
}

/**
 * 获取标签列表
 * @param pageNum 页码
 * @param pageSize 每页大小
 * @param q 搜索关键词
 */
export function getTagList(pageNum: number, pageSize: number, q: string | null): Promise<ApiResponse<PageResponse<TagItem>>> {
    return request.get('/v1/tag/list', {
        params: {
            pageNum,
            pageSize,
            q
        }
    })
}

/**
 * 保存或更新标签
 * @param data 标签数据 {id?, tagName, categoryId}
 */
export function saveOrUpdateTag(data: TagUpdateRequest): Promise<ApiResponse<any>> {
    return request.post('/v1/tag', data)
}

/**
 * 删除标签
 * @param id 标签ID
 */
export function deleteTag(id: number): Promise<ApiResponse<any>> {
    return request.delete(`/v1/tag/${id}`)
}