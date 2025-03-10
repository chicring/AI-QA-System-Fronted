import { useAuthStore } from "@/stores/auth"
import type { ChatRequest, ChatResponse } from "@/api/types/chat"

export type DataCallback = (data: string) => void
export type ErrorCallback = (error: Error) => void
export type ResponseCallback = (response: string) => void

class ChatClient {
    private static instance: ChatClient
    private decoder: TextDecoder

    private constructor() {
        this.decoder = new TextDecoder('utf-8')
    }

    // 单例模式获取实例
    public static getInstance(): ChatClient {
        if (!ChatClient.instance) {
            ChatClient.instance = new ChatClient()
        }
        return ChatClient.instance
    }

    async post(
        chatRequest: ChatRequest,
        onData: DataCallback,
        onResponse: ResponseCallback,
        onError: ErrorCallback
    ) {
        const url = import.meta.env.VITE_API_URL + '/v1/chat/stream'
        // const token = useAuthStore().getToken()
        const token = "sadljasfjksadhfj"

        if (!token) {
            onError(new Error('Authentication token is missing'))
            return
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(chatRequest)
        }

        let finalResult = ""
        let partialData = "" // 存储跨数据块的不完整数据

        try {
            const response = await fetch(url, options)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            const reader = response.body!.getReader()
            
            // 处理流式数据
            while (true) {
                const { value, done } = await reader.read()
                
                if (done) break
                
                // 解码二进制数据为文本
                const chunkText = this.decoder.decode(value, { stream: true })
                let lines = chunkText.split("\n")
                
                // 处理上一个数据块的不完整数据
                if (partialData) {
                    lines[0] = partialData + lines[0]
                    partialData = ""
                }
                
                // 如果当前数据块以不完整行结束，保存它
                if (!chunkText.endsWith("\n") && lines.length > 0) {
                    partialData = lines.pop() || ""
                }

                // 处理每一行数据
                for (const line of lines) {
                    if (!line.length) continue
                    
                    // 检查行是否以"data:"开头
                    if (!line.startsWith("data:")) {
                        console.log("非预期格式:", line)
                        continue
                    }
                    
                    const content = line.substring(5).trim()
                    if (!content) continue
                    
                    try {       
                        const chatResponse: ChatResponse = JSON.parse(content)
                        
                        // 如果响应结束，返回最终结果
                        if (chatResponse.finishReason === "STOP") {
                            onResponse(finalResult)
                            return
                        }
                        
                        // 处理响应内容
                        const responseContent = chatResponse.content || ''
                        finalResult += responseContent
                        onData(responseContent)
                    } catch (err) {
                        console.log("JSON解析错误:", line)
                        
                        // 只为看起来像JSON的内容报告解析错误
                        if (content.startsWith("{") || content.startsWith("[")) {
                            onError(err instanceof Error ? err : new Error(String(err)))
                        }
                    }
                }
            }
        } catch (err) {
            onError(err instanceof Error ? err : new Error(String(err)))
        }
    }
}

export const chatClient = ChatClient.getInstance()


