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

interface MarkHistoryRequest {
    id: number;
    questionId: number;
    status: number;
}

export type { QueryHistoryRequest, QueryHistoryItem, QueryHistoryResponse, MarkHistoryRequest };