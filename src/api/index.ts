// 导出所有API函数
// 问题相关API
export {
    getQuestionList,
    getQuestionDetailById,
    createQuestion,
    deleteQuestion,
    importQuestion
} from './question';

// 分类相关API
export {
    getQuestionCategoryList,
    getCategoryDetail,
    updateCategory,
    addCategory,
    deleteCategory
} from './category';

// 标签相关API
export {
    getTagListGroup,
    getTagList,
    addTag,
    updateTag,
    deleteTag
} from './tag';

// 历史记录相关API
export {
    getQueryHistory,
    getHeatmapData,
    updateQuestionStatus,
    markHistory,
    deleteHistory
} from './history';

// 操作日志相关API
export {
    getOperationLogList
} from './log';

// 通知相关API
export {
    getNotificationList,
    markAllRead,
    getAdminNotificationList,
    updateNotificationStatus,
    deleteNotification,
    sendNotification
} from './notice';

// 系统相关API
export {
    getSystemInfo
} from './system';


