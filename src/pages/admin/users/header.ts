import { ref } from 'vue';

type DataTableHeader = {
    key: string;
    title: string;
    colspan?: number;
    rowspan?: number;
    fixed?: boolean;
    align?: 'start' | 'end' | 'center';
    width?: number;
    minWidth?: string;
    maxWidth?: string;
    sortable?: boolean;
};

export const userHeaders = ref<DataTableHeader[]>([
    {
        key: 'userId',
        title: '用户ID',
        align: 'start',
        sortable: true,
    },
    {
        key: 'username',
        title: '用户名',
        align: 'start',
        sortable: true,
    },
    {
        key: 'nickname',
        title: '用户昵称',
        align: 'start',
        sortable: true,
    },
    {
        key: 'role',
        title: '角色',
        align: 'start',
        sortable: true,
    },
    {
        key: 'status',
        title: '状态',
        align: 'center',
        sortable: true,
    },
    {
        key: 'loginIp',
        title: '登录IP',
        align: 'start',
        sortable: false,
    },
    {
        key: 'statistics',
        title: '统计信息',
        align: 'start',
        sortable: false,
    },
    {
        key: 'actions',
        title: '操作',
        align: 'center',
        sortable: false,
    }
]);
