interface ChatRequest {
    message: string;
    conversationId: string;
    files: string; // 附加文件名，可以通过上传接口拿到
    interviewer: string; // 面试官 根据这个字段来区分不同的面试官
}

interface ChatResponse {
    id: string | null;
    content: string | null;
    finishReason: string | null;
}
export type { ChatRequest, ChatResponse };
