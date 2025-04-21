// Category related types
interface CategoryUpdateRequest {
    id?: number | null;
    categoryName?: string | null;
    description?: string | null;
    categoryLevel?: number | null;
    sortNum?: number | null;
    imageUrl?: string | null;
}

interface CategoryCreateRequest {
    id?: number | null;
    categoryName?: string | null;
    description?: string | null;
    categoryLevel?: number | null;
    sortNum?: number | null;
    imageUrl?: string | null;
}

interface CategoryItem {
    id: number | null;
    categoryName: string | null;
    description: string | null;
    categoryLevel: number | null;
    sortNum: number | null;
    imageUrl: string | null;
}

interface CategoryListResponse {
    records: CategoryItem[];
    pageNumber: number;
    pageSize: number;
    maxPageSize: number;
    totalPage: number;
    totalRow: number;
    optimizeCountQuery: boolean;
}

// Query parameter types
interface CategoryListQueryParams {
    pageNum?: number;  // default: 1
    pageSize?: number;  // default: 10
    q?: string | null;
}

export type { CategoryUpdateRequest, CategoryCreateRequest, CategoryItem, CategoryListResponse, CategoryListQueryParams };