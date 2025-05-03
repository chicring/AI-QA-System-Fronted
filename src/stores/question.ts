import { defineStore } from "pinia";
import { ref } from "vue";
import type { questionState } from "./types";
import type { CategoryItem } from "@/api/types/category";
import type { QuestionItem, QuestionListRequest, QuestionListResponse } from "@/api/types/question";
import type { ApiResponse, PaginatedData } from "@/api/types/common";
import { getQuestionById, getQuestionList } from "@/api";
import { router } from "@/router";

export const useQuestionStore = defineStore('question', () => {
    // 状态
    const questionData = ref<questionState>({
        currentQuestionId: null,
        currentQuestion: null,

        // API请求参数
        requestParams: {
            pageNum: 1,
            pageSize: 20,
            categoryId: undefined,
            categoryName: undefined,
            title: undefined,
            difficulty: undefined,
            tagNames: undefined
        },

        // API响应数据
        responseData: {
            records: [],
            totalPage: 0,
            totalRow: 0,
            pageNumber: 1,
            pageSize: 20
        },

        // 加载状态
        loading: {
            list: false,
            detail: false
        },
        error: null
    });

    
    const setCategoryAndQuestion = async (categoryName: string, questionId: number) => {
        clearQuestionState();
        try {
            // 设置状态
            questionData.value.requestParams.categoryName = categoryName;
            questionData.value.currentQuestionId = questionId;
            questionData.value.requestParams.categoryName = categoryName;

            // 跳转
            await router.push({
                path: '/question/detail',
            }).then(() => {
                // 获取列表和详情
                fetchQuestionListAndDetail();
            });

        } catch (error) {
            console.error('Failed to load question data:', error);
            questionData.value.error = error as string;
        }
    }

    const toggleQuestion = (questionId: number) => {
        if (!questionId) {
            console.warn('toggleQuestion called with invalid questionId:', questionId);
            return;
        }

        questionData.value.currentQuestionId = questionId;

        // 从responseData中找到对应的question
        const question = questionData.value.responseData.records.find(q => q.id === questionId);
        if (question) {
            questionData.value.currentQuestion = question;
        } else {
            // 如果在当前列表中找不到，则通过API获取
            getQuestionById(questionId).then(res => {
                if (res.code === 200 && res.data) {
                    questionData.value.currentQuestion = res.data;
                }
            }).catch(error => {
                console.error('获取问题详情失败:', error);
                questionData.value.error = error as string;
            });
        }
        // 获取问题并添加记录
        getQuestionById(questionId);
    }

    // 搜索题目
    const searchQuestion = (title: string) => {
        // 搜索时重置页码
        questionData.value.requestParams.pageNum = 1;
        
        // 设置状态
        questionData.value.requestParams.title = title;

        // 获取列表和详情
        fetchQuestionList();
    }

    // 无限滚动加载更多问题
    const loadMoreQuestions = async () => {
        // 如果不是最后一页，则加载下一页
        if (questionData.value.responseData.pageNumber < questionData.value.responseData.totalPage) {
            try {
                // 设置加载状态
                questionData.value.loading.list = true;
                
                // 增加页码
                questionData.value.requestParams.pageNum!++;
                
                // 获取下一页数据
                const resList = await getQuestionList(questionData.value.requestParams);
                
                if (resList.code === 200 && resList.data) {
                    // 将新数据追加到现有数据列表
                    questionData.value.responseData.records = [
                        ...questionData.value.responseData.records,
                        ...resList.data.records
                    ];
                    
                    // 更新分页信息
                    questionData.value.responseData.pageNumber = resList.data.pageNumber;
                    questionData.value.responseData.totalPage = resList.data.totalPage;
                    questionData.value.responseData.totalRow = resList.data.totalRow;
                }
            } catch (error) {
                console.error('加载更多问题失败:', error);
                questionData.value.error = error as string;
            } finally {
                // 重置加载状态
                questionData.value.loading.list = false;
            }
        }
    };

    // 切换分页
    const nextPage = () => {
        if (questionData.value.requestParams.pageNum) {
            questionData.value.requestParams.pageNum++;
            fetchQuestionList();
        }
    }

    const prevPage = () => {
        if (questionData.value.requestParams.pageNum && questionData.value.requestParams.pageNum > 1) {
            questionData.value.requestParams.pageNum--;
            fetchQuestionList();
        }
    }

    const fetchQuestionListAndDetail = async () => {
        try {
            // 设置加载状态
            questionData.value.loading.detail = true;
            questionData.value.loading.list = true;

            const resDetail = await getQuestionById(questionData.value.currentQuestionId!);
            if (resDetail.code === 200 && resDetail.data) {
                questionData.value.currentQuestion = resDetail.data;
            }

            const resList = await getQuestionList(questionData.value.requestParams);
            if (resList.code === 200 && resList.data) {
                questionData.value.responseData = resList.data;
            }
        } catch (error) {
            console.error('获取问题列表和详情失败:', error);
            questionData.value.error = error as string;
        } finally {
            // 重置加载状态
            questionData.value.loading.detail = false;
            questionData.value.loading.list = false;
        }
    }

    const fetchQuestionList = async () => {
        try {
            // 设置加载状态
            questionData.value.loading.list = true;

            const resList = await getQuestionList(questionData.value.requestParams);
            if (resList.code === 200 && resList.data) {
                questionData.value.responseData = resList.data;
            }
        } catch (error) {
            console.error('获取问题列表失败:', error);
            questionData.value.error = error as string;
        } finally {
            // 重置加载状态
            questionData.value.loading.list = false;
        }
    }
    

    // 清空状态
    const clearQuestionState = () => {
        // 重置当前查看状态
        questionData.value.currentQuestionId = null;
        questionData.value.currentQuestion = null;
        
        // 重置响应数据
        questionData.value.responseData = {
            records: [],
            totalPage: 0,
            totalRow: 0,
            pageNumber: 1,
            pageSize: 20
        };
        
        // 重置加载状态
        questionData.value.loading.list = false;
        questionData.value.loading.detail = false;
        questionData.value.error = null;
        
        questionData.value.requestParams = {
            pageNum: 1,
            pageSize: 20,
            categoryId: undefined,
            categoryName: undefined,
            title: undefined,
            difficulty: undefined,
            tagNames: undefined
        };
    };

    return {
        questionData,
        clearQuestionState,
        setCategoryAndQuestion,
        toggleQuestion,
        searchQuestion,
        fetchQuestionListAndDetail,
        fetchQuestionList,
        loadMoreQuestions,
        nextPage,
        prevPage
    };
}, {
    persist: true, // 持久化存储
}); 