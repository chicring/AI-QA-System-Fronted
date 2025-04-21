// 操作日志查询参数
interface QueryOperationLogVO {
    pageNum?: number;
    pageSize?: number;
    operator?: string | null;
    startTime?: string | null;
    endTime?: string | null;
}

// 操作日志项
interface OperationLogItem {
    id: number;
    content: string;
    methodName: string;
    requestParams: string;
    operator: string;
    operationTime: {
        seconds: number;
        nanos: number;
    };
    timeTaken: number;
}

// 操作日志响应
interface OperationLogResponse {
    pageNum: number;
    pageSize: number;
    total: number;
    data: OperationLogItem[];
}

export type { QueryOperationLogVO, OperationLogItem, OperationLogResponse }; 