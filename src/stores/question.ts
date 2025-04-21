import { defineStore } from "pinia";
import { ref } from "vue";
import type { questionState } from "./types";
import type { CategoryItem } from "@/api/types/category";
import type { QuestionItem } from "@/api/types/question";

export const useQuestionStore = defineStore('question', () => {
    // 状态
    const questionData = ref<questionState>({
        currentCategory: null,
        currentQuestionId: null,
        questions: []
    });

    // 设置当前分类
    const setCurrentCategory = (category: CategoryItem) => {
        questionData.value.currentCategory = category;
    };

    // 设置当前题目ID
    const setCurrentQuestionId = (id: number) => {
        questionData.value.currentQuestionId = id;
    };

    // 下一题
    const nextQuestion = () => {
        if (!questionData.value.currentQuestionId || questionData.value.questions.length === 0) {
            return false;
        }
        
        const currentIndex = questionData.value.questions.findIndex(
            q => q.questionId === questionData.value.currentQuestionId
        );
        
        if (currentIndex === -1 || currentIndex >= questionData.value.questions.length - 1) {
            return false;
        }
        
        questionData.value.currentQuestionId = questionData.value.questions[currentIndex + 1].questionId;
        return true;
    };

    // 上一题
    const prevQuestion = () => {
        if (!questionData.value.currentQuestionId || questionData.value.questions.length === 0) {
            return false;
        }
        
        const currentIndex = questionData.value.questions.findIndex(
            q => q.questionId === questionData.value.currentQuestionId
        );
        
        if (currentIndex <= 0) {
            return false;
        }
        
        questionData.value.currentQuestionId = questionData.value.questions[currentIndex - 1].questionId;
        return true;
    };

    // 设置问题列表
    const setQuestions = (questions: QuestionItem[]) => {
        questionData.value.questions = questions;
        // 设置当前题目为第一题（如果有）
        if (questions.length > 0) {
            questionData.value.currentQuestionId = questions[0].questionId;
        } else {
            questionData.value.currentQuestionId = null;
        }
    };

    // 添加问题
    const addQuestion = (question: QuestionItem) => {
        // 检查是否已存在相同ID的问题
        const exists = questionData.value.questions.some(q => q.questionId === question.questionId);
        if (!exists) {
            questionData.value.questions.push(question);
        }
    };

    // 获取当前问题
    const getCurrentQuestion = (): QuestionItem | null => {
        if (!questionData.value.currentQuestionId || questionData.value.questions.length === 0) {
            return null;
        }
        
        const question = questionData.value.questions.find(
            q => q.questionId === questionData.value.currentQuestionId
        );
        
        return question || null;
    };

    // 清空状态
    const clearQuestionState = () => {
        questionData.value.currentCategory = null;
        questionData.value.currentQuestionId = null;
        questionData.value.questions = [];
    };

    return {
        questionData,
        setCurrentCategory,
        setCurrentQuestionId,
        nextQuestion,
        prevQuestion,
        setQuestions,
        addQuestion,
        getCurrentQuestion,
        clearQuestionState
    };
}, {
    persist: true, // 持久化存储
}); 