import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { getDaysInMonth, getFirstDayOfMonth, MONTH_NAMES, DAY_NAMES, clsx } from '@/utils/helpers';

export default function CalendarView() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const { tasks, selectedDate, setSelectedDate } = useAppStore();

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  };

  const getTasksForDay = (day: number) => {
    const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return tasks.filter(t => t.date === dateStr);
  };

  const isToday = (day: number) =>
    day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      day === selectedDate.getDate() &&
      viewMonth === selectedDate.getMonth() &&
      viewYear === selectedDate.getFullYear()
    );
  };

  const cells = Array.from({ length: firstDay + daysInMonth }, (_, i) =>
    i < firstDay ? null : i - firstDay + 1
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="rounded-2xl p-4"
      style={{
        background: 'rgba(16,16,30,0.8)',
        border: '1px solid rgba(167,139,250,0.1)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title text-sm">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </h2>
        <div className="flex gap-1">
          <button
            onClick={prevMonth}
            className="w-6 h-6 rounded-lg flex items-center justify-center text-muted hover:text-accent hover:bg-primary/10 transition-all"
          >
            <ChevronLeft size={13} />
          </button>
          <button
            onClick={nextMonth}
            className="w-6 h-6 rounded-lg flex items-center justify-center text-muted hover:text-accent hover:bg-primary/10 transition-all"
          >
            <ChevronRight size={13} />
          </button>
        </div>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAY_NAMES.map((d) => (
          <div key={d} className="text-center text-[10px] text-muted/60 font-medium py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} />;
          const dayTasks = getTasksForDay(day);
          const today_ = isToday(day);
          const selected = isSelected(day);

          return (
            <motion.button
              key={day}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedDate(new Date(viewYear, viewMonth, day))}
              className={clsx(
                'relative flex flex-col items-center justify-center rounded-lg h-8 text-xs font-medium transition-all',
                today_ && !selected && 'text-white',
                selected && 'text-white',
                !today_ && !selected && 'text-muted hover:text-accent'
              )}
              style={
                selected
                  ? {
                      background: 'linear-gradient(135deg, #a78bfa, #f0abfc)',
                      boxShadow: '0 0 12px rgba(167,139,250,0.5)',
                    }
                  : today_
                  ? {
                      background: 'rgba(167,139,250,0.2)',
                      border: '1px solid rgba(167,139,250,0.4)',
                    }
                  : undefined
              }
            >
              {day}
              {dayTasks.length > 0 && !selected && (
                <div className="absolute bottom-0.5 flex gap-0.5">
                  {dayTasks.slice(0, 3).map((_, j) => (
                    <div
                      key={j}
                      className="w-1 h-1 rounded-full"
                      style={{ background: today_ ? '#fff' : '#a78bfa', opacity: 0.7 }}
                    />
                  ))}
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
