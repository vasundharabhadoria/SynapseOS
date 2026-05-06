import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Check, Trash2 } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { TagType } from '@/types';
import { TAG_STYLES, STATUS_STYLES, formatDate, clsx } from '@/utils/helpers';
import TagPill from '@/components/ui/TagPill';

const TAG_FILTERS: Array<{ value: TagType | 'all'; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'work', label: 'Work' },
  { value: 'life', label: 'Life' },
  { value: 'health', label: 'Health' },
  { value: 'goals', label: 'Goals' },
  { value: 'personal', label: 'Personal' },
];

export default function TaskList() {
  const {
    tasks,
    searchQuery,
    filterTag,
    setFilterTag,
    toggleTask,
    deleteTask,
    openAddTaskModal,
    setSearchQuery,
  } = useAppStore();

  const filtered = tasks.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = filterTag === 'all' || t.tag === filterTag;
    return matchesSearch && matchesTag;
  });

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(16,16,30,0.8)',
        border: '1px solid rgba(167,139,250,0.1)',
      }}
    >
      {/* Header */}
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title text-base">Tasks & Notes</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openAddTaskModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-white transition-all"
            style={{
              background: 'linear-gradient(135deg, #a78bfa, #f0abfc)',
              boxShadow: '0 0 16px rgba(167,139,250,0.3)',
            }}
          >
            <Plus size={12} />
            Add task
          </motion.button>
        </div>

        {/* Search */}
        <div className="relative flex items-center mb-3">
          <Search size={13} className="absolute left-3 text-muted" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-4 py-2 rounded-xl text-xs text-lavender placeholder-muted/40 outline-none focus:ring-1 focus:ring-primary/30 transition-all"
            style={{ background: 'rgba(10,10,20,0.6)', border: '1px solid rgba(167,139,250,0.1)' }}
          />
        </div>

        {/* Tag filters */}
        <div className="flex gap-2 flex-wrap">
          {TAG_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilterTag(f.value)}
              className={clsx(
                'px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all',
                filterTag === f.value
                  ? 'text-white'
                  : 'text-muted hover:text-accent'
              )}
              style={
                filterTag === f.value
                  ? {
                      background: 'linear-gradient(135deg, rgba(167,139,250,0.3), rgba(240,171,252,0.2))',
                      border: '1px solid rgba(167,139,250,0.3)',
                    }
                  : {
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(167,139,250,0.08)',
                    }
              }
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table header */}
      <div
        className="grid px-5 py-2 text-[10px] uppercase tracking-wider text-muted/60 font-medium"
        style={{
          gridTemplateColumns: '28px 1fr 70px 70px 80px 28px',
          borderTop: '1px solid rgba(167,139,250,0.06)',
        }}
      >
        <span />
        <span>Task</span>
        <span>Tag</span>
        <span>Date</span>
        <span>Status</span>
        <span />
      </div>

      {/* Task rows */}
      <div className="scrollable" style={{ maxHeight: 260 }}>
        <AnimatePresence>
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-5 py-8 text-center text-muted text-sm"
            >
              No tasks found
            </motion.div>
          ) : (
            filtered.map((task, i) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ delay: i * 0.03 }}
                className="group grid items-center px-5 py-2.5 hover:bg-white/[0.02] transition-colors"
                style={{
                  gridTemplateColumns: '28px 1fr 70px 70px 80px 28px',
                  borderTop: '1px solid rgba(167,139,250,0.05)',
                }}
              >
                {/* Checkbox */}
                <button
                  onClick={() => toggleTask(task.id)}
                  className="w-4.5 h-4.5 rounded-md flex items-center justify-center transition-all"
                  style={{
                    width: 18,
                    height: 18,
                    background: task.completed
                      ? 'linear-gradient(135deg, #a78bfa, #f0abfc)'
                      : 'transparent',
                    border: task.completed
                      ? 'none'
                      : '1.5px solid rgba(167,139,250,0.3)',
                    boxShadow: task.completed ? '0 0 8px rgba(167,139,250,0.4)' : 'none',
                  }}
                >
                  {task.completed && <Check size={10} className="text-white" strokeWidth={3} />}
                </button>

                {/* Title */}
                <span
                  className={clsx(
                    'text-sm truncate pr-2 transition-all',
                    task.completed ? 'line-through text-muted/50' : 'text-lavender'
                  )}
                >
                  {task.title}
                </span>

                {/* Tag */}
                <TagPill tag={task.tag} size="sm" />

                {/* Date */}
                <span className="text-[11px] text-muted/70">{formatDate(task.date)}</span>

                {/* Status */}
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full font-medium w-fit"
                  style={{
                    background: STATUS_STYLES[task.status].bg,
                    color: STATUS_STYLES[task.status].text,
                  }}
                >
                  {STATUS_STYLES[task.status].label}
                </span>

                {/* Delete */}
                <button
                  onClick={() => deleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-muted hover:text-red-400"
                >
                  <Trash2 size={13} />
                </button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
