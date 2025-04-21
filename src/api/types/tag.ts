// Tag related types
interface TagUpdateRequest {
    id?: number;
    tagName: string;  // Required
    categoryId: string; // 分类ID
}

interface TagItem {
    id: number;
    tagName: string;
    sortNum: number;
    categoryId: number;
    categoryName: string;
}

// Tag group types
interface TagGroup {
    categoryName: string;
    tagNames: string[];
}

export type { TagUpdateRequest, TagItem, TagGroup };