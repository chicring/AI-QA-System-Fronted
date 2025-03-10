
// Response structure
interface ApiResponse<T> {
    code: number;
    msg: string;
    requestId: string | null;
    data: T;
}

// Tag related types
interface TagUpdateRequest {
    id?: number;
    tagName: string;  // Required, min length 1, max length 20
    categoryId?: number;
    sortNum?: number;
}

// Category related types
interface CategoryUpdateRequest {
    id?: number;
    categoryName?: string;
    Description?: string;  // Note: capital D in Description as per API spec
    categoryLevel?: number;
    parentCategoryId?: number;
    sortNum?: number;
    imageUrl?: string;
}

interface CategoryItem {
    id: number | null;
    categoryName: string | null;
    description: string | null;  // Note: capital D in Description as per API spec
    categoryLevel: number | null;
    parentCategoryId: number | null;
    sortNum: number;
    imageUrl: string | null;
}

interface CategoryListResponse {
    pageNum: number;
    pageSize: number;
    total: number;
    data: CategoryItem[];
}

// Tag group types
interface TagGroup {
    categoryName: string;
    tagNames: string[];
}

// Question related types
interface QuestionCreateRequest {
    questionTitle: string;
    questionTips: string;
    difficulty: number;
    categoryId: number;
    tagIds: number[];
    answers: string[];
}

interface QuestionItem {
    questionId: number;
    questionTitle: string;
    questionTips: string;
    difficulty: number;
    viewCount: number;
    createTime: Date | null;
    tagNames: string[];
    categoryId: number | null;
}

interface QuestionListResponse {
    pageNum: number;
    pageSize: number;
    total: number;
    data: QuestionItem[];
}

// Query parameter types
interface CategoryListQueryParams {
    pageNum?: number;  // default: 1
    pageSize?: number;  // default: 10
    q?: string;
}

interface QuestionListQueryParams {
    pageNum?: number;
    pageSize?: number;
    categoryId?: number | null;
    title?: string | null;
    difficulty?: number | null;
    tagNames?: string[];
}

interface QuestionAnswerItem {
    questionId: number;
    questionAnswers: string[];
}


interface QueryHistoryRequest {
    pageNum: number;
    pageSize: number;
    status: number | null;
    q: string | null;
    difficulty: number | null;
}

interface QueryHistoryItem {
    questionId: number;
    questionTitle: string;
    questionTips: string;
    difficulty: number;
    viewCount: number;
    createTime: Date;
    tagNames: string[];
    status: number;
    lastViewTime: Date;
    categoryId?: number | null;
}

interface QueryHistoryResponse {
    pageNum: number;
    pageSize: number;
    total: number;
    data: QueryHistoryItem[];
}


// Export all types
export type {
    ApiResponse,
    TagUpdateRequest,
    CategoryUpdateRequest,
    CategoryItem,
    CategoryListResponse,
    TagGroup,
    QuestionCreateRequest,
    QuestionItem,
    QuestionListResponse,
    CategoryListQueryParams,
    QuestionListQueryParams,
    QuestionAnswerItem,
    QueryHistoryRequest,
    QueryHistoryItem,
    QueryHistoryResponse
};