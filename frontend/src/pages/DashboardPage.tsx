import DashboardHeader from '@/components/header/DashboardHeader';
import CategoryCards from '@/components/cards/CategoryCards';
import TaskList from '@/components/tasks/TaskList';
import CalendarView from '@/components/calendar/CalendarView';
import SpotifyWidget from '@/components/widgets/SpotifyWidget';
import PomodoroTimer from '@/components/widgets/PomodoroTimer';
import UpcomingTasks from '@/components/widgets/UpcomingTasks';

export default function DashboardPage() {
  return (
    <div className="flex gap-5 h-full">
      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <DashboardHeader />

        {/* Scrollable main area */}
        <div className="flex-1 scrollable pr-1">
          <CategoryCards />
          <TaskList />

          {/* Bottom grid: calendar + something */}
          <div className="mt-5 grid grid-cols-2 gap-5 pb-5">
            <CalendarView />
            {/* Stats card */}
            <div
              className="rounded-2xl p-5"
              style={{ background: 'rgba(16,16,30,0.8)', border: '1px solid rgba(167,139,250,0.1)' }}
            >
              <h3
                className="text-sm font-semibold mb-4"
                style={{ fontFamily: 'Playfair Display, serif', color: '#ddd6fe' }}
              >
                Weekly Progress
              </h3>
              <div className="flex flex-col gap-3">
                {[
                  { label: 'Tasks completed', value: 12, max: 20, color: '#a78bfa' },
                  { label: 'Focus time (hrs)', value: 4.5, max: 8, color: '#f0abfc' },
                  { label: 'Goals reached', value: 2, max: 5, color: '#34d399' },
                ].map(stat => (
                  <div key={stat.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted">{stat.label}</span>
                      <span style={{ color: stat.color }}>{stat.value}</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                      <div
                        className="h-full rounded-full bar-fill"
                        style={{
                          '--w': `${(stat.value / stat.max) * 100}%`,
                          '--delay': '0.4s',
                          background: `linear-gradient(90deg, ${stat.color}, ${stat.color}80)`,
                          boxShadow: `0 0 8px ${stat.color}50`,
                        } as React.CSSProperties}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4" style={{ borderTop: '1px solid rgba(167,139,250,0.08)' }}>
                <p className="text-xs text-muted mb-3">Quick capture</p>
                <textarea
                  placeholder="Dump your thoughts here... "
                  className="w-full h-20 px-3 py-2.5 rounded-xl text-xs text-lavender placeholder-muted/40 outline-none focus:ring-1 focus:ring-primary/30 resize-none transition-all"
                  style={{ background: 'rgba(10,10,20,0.6)', border: '1px solid rgba(167,139,250,0.1)' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="w-60 shrink-0 flex flex-col gap-4 scrollable py-1 pr-1">
        <SpotifyWidget />
        <PomodoroTimer />
        <UpcomingTasks />
      </div>
    </div>
  );
}
