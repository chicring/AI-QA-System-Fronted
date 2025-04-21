import request from "@/utils/request"
import type { ApiResponse } from "./types/index"
import type { ChatRequest, ChatResponse } from "./types/chat"

/**
 * 上传文件
 * @param conversationId 会话ID
 * @param file 要上传的文件
 */
export function uploadFile(conversationId: string, file: File): Promise<ApiResponse<string>> {
    const formData = new FormData()
    formData.append('file', file)
    return request.post(`/v1/chat/upload?conversationId=${conversationId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}