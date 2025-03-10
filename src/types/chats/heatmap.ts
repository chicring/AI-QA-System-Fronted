

export const heatmapColors = [
    // GitHub 默认
    ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
    // 蓝色主题
    ['#ebedf0', '#b3d4ff', '#6fa4fc', '#2a6cdb', '#0c2d6b'],
    // 紫色主题
    ['#ebedf0', '#d8b9ff', '#b266ff', '#8000ff', '#5200a3'],
    // 热力图配色
    ['#ebedf0', '#ffdf7f', '#ffc156', '#f58021', '#c03011'],
]

interface HeatmapItem {
    date: string;
    count: number;
    tooltip?: string;
}

export type { HeatmapItem };
