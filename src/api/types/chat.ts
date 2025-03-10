interface ChatRequest {
    message: string;
    conversationId: string;
    files: string;
}

interface ChatResponse {
    id: string | null;
    content: string | null;
    finishReason: string | null;
}
export type { ChatRequest, ChatResponse };
