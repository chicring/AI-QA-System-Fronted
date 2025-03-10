import type { UserInfoResponse } from "@/api/types/user";
import type { Message } from "@/types/chats/chat";
export interface authState {
    // 用户令牌
    token: string | null
    // 记住我
    remember: boolean
}

export interface layoutState {
    isDarkMode: boolean;
    primary: string;
    surface: string | null;
}

export interface userState {
    userInfo: UserInfoResponse | null;
}

export interface chatState {
    messages: Message[];
    conversationId: string;
    isReplying: boolean;
}

