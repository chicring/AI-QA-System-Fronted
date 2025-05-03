import type { UserInfo } from "@/api";
import type { Message } from "@/types/chats/chat";
import type { CategoryItem } from "@/api/types/category";
import type { QuestionItem, QuestionListRequest, QuestionListResponse } from "@/api/types/question";
import type { PaginatedData, BasePageParams } from "@/api/types/common";

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
    userInfo: UserInfo | null;
}

export interface chatState {
    messages: Message[];
    conversationId: string;
    isReplying: boolean;
}

export interface questionState {
    currentQuestionId: number | null;
    currentQuestion: QuestionItem | null;

    // API请求参数 (确保包含分页参数)
    requestParams: QuestionListRequest;

    // API响应数据
    responseData: PaginatedData<QuestionItem>;

    // 加载状态
    loading: {
        list: boolean;
        detail: boolean;
    };
    error: string | null;
}

export interface userSettingsState {
  // 是否默认展示答案
  showAnswersByDefault: boolean;

  // 夜间模式
  darkMode: boolean;

  // 学习时长
  learningTime: number;
  
  // 学习目标提醒
  learningGoalReminder: boolean;

}

