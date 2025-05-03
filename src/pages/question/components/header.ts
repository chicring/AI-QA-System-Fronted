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

const  headers = ref<DataTableHeader[]>([
    {
        key: 'questionTitle',
        title: '标题',
        align: 'start',
        sortable: false,
        minWidth: '200px',
    },
    {
        key: 'categoryName',
        title: '题库',
        align: 'start',
        sortable: false,
        width: 120,
    },
    {
        key: 'difficulty',
        title: '难度',
        sortable: false,
        width: 80,
    },
    {
        key: 'tagNames',
        title: '标签',
        align: 'start',
        sortable: false,
        minWidth: '150px',
        maxWidth: '300px',
    },
    {
        key: 'viewCount',
        title: '浏览量',
        width: 100,
    },

])

export default headers;