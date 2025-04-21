import type { UserInfoResponse } from "@/api/types/user";
import type { Message } from "@/types/chats/chat";
import type { CategoryItem } from "@/api/types/category";
import type { QuestionItem } from "@/api/types/question";

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

export interface questionState {
    currentCategory: CategoryItem | null;
    currentQuestionId: number | null;
    questions: QuestionItem[];
}

