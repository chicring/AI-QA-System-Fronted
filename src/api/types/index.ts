// Import all types from their respective files
import type { ApiResponse, PageResponse } from './common';
import type { TagUpdateRequest, TagItem, TagGroup } from './tag';
import type { CategoryUpdateRequest, CategoryCreateRequest, CategoryItem, CategoryListResponse, CategoryListQueryParams } from './category';
import type { QuestionCreateRequest, QuestionItem, QuestionListResponse, QuestionAnswerItem, QuestionListQueryParams } from './question';
import type { QueryHistoryRequest, QueryHistoryItem, QueryHistoryResponse, MarkHistoryRequest } from './history';
import type { UserLoginRequest, UserLoginResponse, UserInfoResponse, UserRegisterRequest, UpdateUserInfoRequest } from './user';
import type { ChatRequest, ChatResponse } from './chat';
import type { QueryOperationLogVO, OperationLogItem, OperationLogResponse } from './log';
import type { NotificationItem, NotificationListResponse, QueryNotificationVO, AdminNotificationQueryVO, AdminNotificationResponse, SendNotificationRequest } from './notice';
import type { SystemInfo } from './system';

// Re-export all types
export type {
    // Common types
    ApiResponse,
    PageResponse,

    // Tag related types
    TagUpdateRequest,
    TagItem,
    TagGroup,

    // Category related types
    CategoryUpdateRequest,
    CategoryCreateRequest,
    CategoryItem,
    CategoryListResponse,
    CategoryListQueryParams,

    // Question related types
    QuestionCreateRequest,
    QuestionItem,
    QuestionListResponse,
    QuestionAnswerItem,
    QuestionListQueryParams,

    // History related types
    QueryHistoryRequest,
    QueryHistoryItem,
    QueryHistoryResponse,
    MarkHistoryRequest,

    // User related types
    UserLoginRequest,
    UserLoginResponse,
    UserInfoResponse,
    UserRegisterRequest,
    UpdateUserInfoRequest,

    // Notification related types
    NotificationItem,
    NotificationListResponse,
    QueryNotificationVO,
    AdminNotificationQueryVO,
    AdminNotificationResponse,
    SendNotificationRequest,

    // Chat related types
    ChatRequest,
    ChatResponse,

    // Log related types
    QueryOperationLogVO,
    OperationLogItem,
    OperationLogResponse,

    // System related types
    SystemInfo,
};