import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { TagType, TaskStatus } from '@/types';

const TAGS: TagType[] = ['work', 'life', 'health', 'goals', 'personal'];

const TAG_COLORS: Record<TagType, string> = {
  work: '#a78bfa',
  life: '#fbbf24',
  health: '#34d399',
  goals: '#f0abfc',
  personal: '#60a5fa',
};

export default function AddTaskModal() {
  const { isAddTaskModalOpen, closeAddTaskModal, addTask } = useAppStore();
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState<TagType>('work');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState<TaskStatus>('todo');

  const handleSubmit = () => {
    if (!title.trim()) return;
    addTask({ title: title.trim(), tag, date, status, completed: false });
    setTitle('');
    setTag('work');
    setDate(new Date().toISOString().split('T')[0]);
    setStatus('todo');
  };

  return (
    <AnimatePresence>
      {isAddTaskModalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAddTaskModal}
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', bounce: 0.25 }}
            className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] rounded-2xl p-6"
            style={{
              background: 'rgba(18,18,34,0.98)',
              border: '1px solid rgba(167,139,250,0.2)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(167,139,250,0.05)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <h3 style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '0.03em' }} className="text-lg font-semibold text-lavender">
                Add New Task
              </h3>
              <button
                onClick={closeAddTaskModal}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-muted hover:text-accent hover:bg-primary/10 transition-all"
              >
                <X size={14} />
              </button>
            </div>

            {/* Task title */}
            <div className="mb-4">
              <label className="text-[11px] text-muted/70 uppercase tracking-wider mb-1.5 block font-medium">
                Task name
              </label>
              <input
                autoFocus
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                placeholder="What needs to be done?"
                className="w-full px-4 py-2.5 rounded-xl text-sm text-lavender placeholder-muted/40 outline-none focus:ring-1 focus:ring-primary/40 transition-all"
                style={{ background: 'rgba(10,10,20,0.7)', border: '1px solid rgba(167,139,250,0.15)' }}
              />
            </div>

            {/* Tag selector */}
            <div className="mb-4">
              <label className="text-[11px] text-muted/70 uppercase tracking-wider mb-1.5 block font-medium">
                Tag
              </label>
              <div className="flex gap-2 flex-wrap">
                {TAGS.map(t => (
                  <button
                    key={t}
                    onClick={() => setTag(t)}
                    className="px-3 py-1.5 rounded-xl text-xs font-medium capitalize transition-all"
                    style={
                      tag === t
                        ? { background: `${TAG_COLORS[t]}25`, color: TAG_COLORS[t], border: `1px solid ${TAG_COLORS[t]}50` }
                        : { background: 'rgba(255,255,255,0.03)', color: '#6b7280', border: '1px solid rgba(167,139,250,0.08)' }
                    }
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Date */}
            <div className="mb-4">
              <label className="text-[11px] text-muted/70 uppercase tracking-wider mb-1.5 block font-medium">
                Due date
              </label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-sm text-lavender outline-none focus:ring-1 focus:ring-primary/40 transition-all"
                style={{
                  background: 'rgba(10,10,20,0.7)',
                  border: '1px solid rgba(167,139,250,0.15)',
                  colorScheme: 'dark',
                }}
              />
            </div>

            {/* Status */}
            <div className="mb-6">
              <label className="text-[11px] text-muted/70 uppercase tracking-wider mb-1.5 block font-medium">
                Status
              </label>
              <div className="flex gap-2">
                {(['todo', 'in-progress', 'done'] as TaskStatus[]).map(s => (
                  <button
                    key={s}
                    onClick={() => setStatus(s)}
                    className="flex-1 py-1.5 rounded-xl text-xs font-medium capitalize transition-all"
                    style={
                      status === s
                        ? { background: 'rgba(167,139,250,0.2)', color: '#a78bfa', border: '1px solid rgba(167,139,250,0.3)' }
                        : { background: 'rgba(255,255,255,0.03)', color: '#6b7280', border: '1px solid rgba(167,139,250,0.08)' }
                    }
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleSubmit}
              disabled={!title.trim()}
              className="w-full py-2.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg, #a78bfa, #f0abfc)',
                boxShadow: '0 0 20px rgba(167,139,250,0.35)',
              }}
            >
              <Plus size={14} />
              Add Task
            </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
