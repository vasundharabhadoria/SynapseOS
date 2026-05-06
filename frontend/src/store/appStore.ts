import { create } from 'zustand';
import { Task, TagType, TaskStatus, ActivePage } from '@/types';

interface AppState {
  activePage: ActivePage;
  tasks: Task[];
  searchQuery: string;
  filterTag: TagType | 'all';
  isAddTaskModalOpen: boolean;
  selectedDate: Date | null;

  setActivePage: (page: ActivePage) => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  setSearchQuery: (q: string) => void;
  setFilterTag: (tag: TagType | 'all') => void;
  openAddTaskModal: () => void;
  closeAddTaskModal: () => void;
  setSelectedDate: (date: Date | null) => void;
}

const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Design SynapseOS dashboard UI', tag: 'work', date: '2026-05-06', status: 'in-progress', completed: false, category: 'Daily' },
  { id: '2', title: 'Morning yoga session', tag: 'health', date: '2026-05-06', status: 'done', completed: true, category: 'Daily' },
  { id: '3', title: 'Read "Atomic Habits" — ch. 7', tag: 'personal', date: '2026-05-07', status: 'todo', completed: false, category: 'Personal' },
  { id: '4', title: 'Weekly meal prep plan', tag: 'life', date: '2026-05-07', status: 'todo', completed: false, category: 'Planners' },
  { id: '5', title: 'Finish RAG pipeline implementation', tag: 'work', date: '2026-05-08', status: 'todo', completed: false, category: 'Goals' },
  { id: '6', title: 'Vision board for Q3 goals', tag: 'goals', date: '2026-05-09', status: 'todo', completed: false, category: 'Goals' },
  { id: '7', title: 'Call with mentor — career chat', tag: 'life', date: '2026-05-10', status: 'todo', completed: false, category: 'Personal' },
];

export const useAppStore = create<AppState>((set) => ({
  activePage: 'dashboard',
  tasks: INITIAL_TASKS,
  searchQuery: '',
  filterTag: 'all',
  isAddTaskModalOpen: false,
  selectedDate: null,

  setActivePage: (page) => set({ activePage: page }),

  addTask: (task) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        { ...task, id: Date.now().toString() },
      ],
      isAddTaskModalOpen: false,
    })),

  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id
          ? { ...t, completed: !t.completed, status: !t.completed ? 'done' : 'todo' }
          : t
      ),
    })),

  deleteTask: (id) =>
    set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),

  updateTaskStatus: (id, status) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, status } : t)),
    })),

  setSearchQuery: (q) => set({ searchQuery: q }),
  setFilterTag: (tag) => set({ filterTag: tag }),
  openAddTaskModal: () => set({ isAddTaskModalOpen: true }),
  closeAddTaskModal: () => set({ isAddTaskModalOpen: false }),
  setSelectedDate: (date) => set({ selectedDate: date }),
}));
