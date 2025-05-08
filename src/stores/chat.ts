import { defineStore } from "pinia";
import type { chatState } from "./types";
import type { Message } from "@/types/chats/chat";
import { ref } from "vue";
import type { ChatRequest } from "@/api/types/chat";
import { chatClient } from "@/utils/chatClient";
import { generateId } from "@/utils/IdTool";
export const useChatStore = defineStore('chat', () => {
    const chat = ref<chatState>({
        messages: [],
        conversationId: '',
        isReplying: false
    })

    const sendMessage = async (request: ChatRequest) => {
        // 如果conversationId为空，则获取conversationId
        if(chat.value.conversationId === '') {
            chat.value.conversationId = generateId()
        }
        chat.value.isReplying = true
        const msg = {
            id: generateId(),
            content: request.message,
            role: 'user'
        }
        chat.value.messages.push(msg);
        
        request.conversationId = chat.value.conversationId

        const reply = {
            id: generateId(),
            content: '',
            role: 'assistant'
        }

        chatClient.post(request, (data) => {
            const msg = chat.value.messages.find(m => m.id === reply.id)
            if(msg) {
                msg.content = String(msg.content) + String(data)
            }else {
                reply.content = String(data)
                chat.value.messages.push(reply)
            }
        }, (response) => {
            console.log("完成对话")
            chat.value.isReplying = false
        }, (error) => {
            console.log(error)
            chat.value.isReplying = false
        })
    }

    const clearMessages = () => {
        console.log("清空对话")
        chat.value.messages = [];
        chat.value.conversationId = ''
    }



    return {
        chat,
        sendMessage,
        clearMessages
    }    
}, {
    persist: true,
})