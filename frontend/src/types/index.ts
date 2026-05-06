export type TagType = 'work' | 'life' | 'health' | 'goals' | 'personal';

export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  tag: TagType;
  date: string;
  status: TaskStatus;
  completed: boolean;
  category?: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

export type ActivePage = 'dashboard' | 'daily' | 'planners' | 'personal' | 'goals';

export interface CategoryCard {
  id: string;
  title: string;
  emoji: string;
  color: string;
  gradient: string;
  items: string[];
  count: number;
}

export interface SongTrack {
  title: string;
  artist: string;
  duration: number;
  cover: string;
}
