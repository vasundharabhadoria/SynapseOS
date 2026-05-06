import { motion } from 'framer-motion';
import { ListTodo, Check } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { formatDate } from '@/utils/helpers';
import TagPill from '@/components/ui/TagPill';

export default function UpcomingTasks() {
  const { tasks, toggleTask } = useAppStore();

  const upcoming = tasks
    .filter(t => !t.completed)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="rounded-2xl p-4"
      style={{
        background: 'rgba(16,16,30,0.8)',
        border: '1px solid rgba(167,139,250,0.1)',
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <ListTodo size={13} className="text-primary" />
        <span className="text-xs font-medium text-muted">Upcoming</span>
        <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full text-primary"
          style={{ background: 'rgba(167,139,250,0.15)' }}>
          {upcoming.length}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {upcoming.length === 0 ? (
          <p className="text-xs text-muted/50 text-center py-3">All caught up!</p>
        ) : (
          upcoming.map((task, i) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-2.5 group"
            >
              <button
                onClick={() => toggleTask(task.id)}
                className="mt-0.5 w-3.5 h-3.5 rounded-md shrink-0 border flex items-center justify-center transition-all"
                style={{ borderColor: 'rgba(167,139,250,0.3)' }}
              >
                <Check size={8} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-lavender truncate leading-tight">{task.title}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <TagPill tag={task.tag} size="sm" />
                  <span className="text-[10px] text-muted/60">{formatDate(task.date)}</span>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}
