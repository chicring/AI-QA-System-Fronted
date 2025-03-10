
interface NotificationStatus {
    status: number | null;
    description: string;
}

const notificationStatusList: NotificationStatus[] = [
    { status: null, description: '全部' },
    { status: 0, description: '未读' },
    { status: 1, description: '已读' },
];

export { notificationStatusList };

export type { NotificationStatus };