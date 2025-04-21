// Question related types
interface QuestionCreateRequest {
    id?: number | null;
    questionTitle: string;
    questionTips: string;
    difficulty: number;
    answer: string;
    categoryName: string;
    tagNames: string[];
}

interface QuestionItem {
    id: number;
    questionTitle: string;
    questionTips: string;
    difficulty: number;
    answer: string;
    categoryName: string;
    tagNames: string[];
    viewCount: number;
    createTime: string | null;
}

interface QuestionListResponse {
    records: QuestionItem[];
    pageNumber: number;
    pageSize: number;
    maxPageSize: number;
    totalPage: number;
    totalRow: number;
    optimizeCountQuery: boolean;
}

interface QuestionAnswerItem {
    questionId: number;
    questionAnswers: string[];
}

// Query parameter types
interface QuestionListQueryParams {
    pageNum?: number;  // default: 1
    pageSize?: number;  // default: 10
    categoryId?: number | null;
    categoryName?: string | null;
    title?: string | null;
    difficulty?: number | null;
    tagNames?: string[];
}

export type { QuestionCreateRequest, QuestionItem, QuestionListResponse, QuestionAnswerItem, QuestionListQueryParams };