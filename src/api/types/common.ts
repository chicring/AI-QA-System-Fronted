/**
 * 通用 API 响应结构
 */
export interface ApiResponse<T = any> {
  code: number; // 业务状态码，通常 0 表示成功
  msg: string; // 响应消息
  requestId: string; // 请求 ID
  data: T; // 响应数据
}

/**
 * 通用分页数据结构
 */
export interface PaginatedData<T = any> {
  records: T[]; // 当前页数据列表
  totalPage: number; // 总页数
  totalRow: number; // 总行数
  pageNumber: number; // 当前页码
  pageSize: number; // 每页数量

  // 可能还有其他分页相关字段，如 totalPages
}

/**
 * 通用分页查询参数结构
 */
export interface BasePageParams {
  pageNum?: number; // 页码，默认为 1
  pageSize?: number; // 每页数量，默认为 10
  q?: string; // 通用查询关键字
  // 可以根据需要添加其他通用过滤参数，如排序字段、排序方向等
  // orderBy?: string;
  // orderDirection?: 'asc' | 'desc';
}