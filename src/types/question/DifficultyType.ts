export type DifficultyType = {
  id: number;
  name: string;
  value: number;
  color: string;
}

export const difficultyList: DifficultyType[] = [
  { id: 1, name: '简单', value: 1, color: '#388E3C' },
  { id: 2, name: '中等', value: 2, color: '#FFA000' },
  { id: 3, name: '困难', value: 3, color: '#E64A19' },
]


