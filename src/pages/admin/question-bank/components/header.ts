import { ref } from 'vue';

type DataTableHeader = {
    
    key: string;
    // value?: SelectItemKey;
    title: string;
    colspan?: number;
    rowspan?: number;
    fixed?: boolean;
    align?: 'start' | 'end' | 'center';
    width?: number;
    minWidth?: string;
    maxWidth?: string;
    sortable?: boolean;
    // sort?: DataTableCompareFunction;
};

export const  questionHeaders = ref<DataTableHeader[]>([
    {
        key: 'questionId',
        title: '题目ID',
        align: 'start',
        sortable: false,
    },
    {
        key: 'questionTitle',
        title: '标题',
        align: 'start',
        sortable: false,
    },
    {
        key: 'difficulty',
        title: '难度',
        sortable: false,
    },
    {
        key: 'tagNames',
        title: '标签',
        align: 'start',
        sortable: false,
    },
    {
        key: 'viewCount',
        title: '浏览量',
    },
    {
        key: 'action',
        title: '操作'
    }

])


export const categoryHeaders = ref<DataTableHeader[]>([
  { title: 'ID', key: 'id'},
  { title: '分类名称', key: 'categoryName', sortable: true },
  { title: '图片', key: 'imageUrl' ,sortable: false},
  { title: '描述', key: 'description' },
//   { title: '级别', key: 'categoryLevel', sortable: true },
//   { title: '父级分类', key: 'parentCategoryId', sortable: true },
  { title: '排序', key: 'sortNum', sortable: true },
  { title: '操作', key: 'actions', sortable: false }
])


export const tagHeaders = ref<DataTableHeader[]>([
    { title: 'ID', key: 'id'},
    { title: '标签', key: 'tagName'},
    { title: '排序', key: 'sortNum', sortable: true },
    { title: '分类ID', key: 'categoryId', sortable: true },
    { title: '分类名称', key: 'categoryName', sortable: true },
    { title: '操作', key: 'actions', sortable: false }
])