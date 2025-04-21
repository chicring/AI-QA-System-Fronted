// Response structure
interface ApiResponse<T> {
    code: number;
    msg: string;
    requestId: string | null;
    data: T;
}

interface PageResponse<T> {
    pageNum: number;
    pageSize: number;
    total: number;
    data: T[];
}

export type { ApiResponse, PageResponse }; 