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

])

export default headers;