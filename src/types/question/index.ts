
interface HistoryStatus {
    label: string;
    value: number;
}

const historyStatusItems: HistoryStatus[] = [
    { label: '看过', value: 0 },
    { label: '已掌握', value: 1 },
    { label: '待复习', value: 2 },
]

type DifficultyType = {
    id: number;
    name: string;
    value: number;
    color: string;
}
  
const difficultyItems: DifficultyType[] = [
    { id: 1, name: '简单', value: 1, color: '#388E3C' },
    { id: 2, name: '中等', value: 2, color: '#FFA000' },
    { id: 3, name: '困难', value: 3, color: '#E64A19' },
]

interface ToggleStatusItem {
    label: string;
    value: number;
    icon: string;
    color: string;
}
// 1:看过 2:已掌握 3:待复习
const toggleStatusItems: ToggleStatusItem[] = [
    { label: '看过', value: 0, icon: 'star', color: '#FFA000' },
    { label: '已掌握', value: 1, icon: 'flag', color: '#E64A19' },
    { label: '待复习', value: 2, icon: 'flag', color: '#E64A19' },
]

export type { HistoryStatus, DifficultyType, ToggleStatusItem };
export { historyStatusItems, difficultyItems, toggleStatusItems };
