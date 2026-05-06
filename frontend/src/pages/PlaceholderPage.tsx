import { motion } from 'framer-motion';
import { ActivePage } from '@/types';
import { useAppStore } from '@/store/appStore';
import { LayoutDashboard } from 'lucide-react';

const PAGE_INFO: Record<Exclude<ActivePage, 'dashboard'>, {
  emoji: string;
  title: string;
  subtitle: string;
  color: string;
  items: Array<{ label: string; desc: string; emoji: string }>;
}> = {
  daily: {
    emoji: '',
    title: 'Daily',
    subtitle: 'Your everyday flow — plans, notes & reflections',
    color: '#a78bfa',
    items: [
      { label: 'Planner', desc: 'Schedule your day with intention', emoji: '📅' },
      { label: 'Journal', desc: 'Capture thoughts and feelings', emoji: '📓' },
      { label: 'Notes', desc: 'Quick ideas and snippets', emoji: '📌' },
    ],
  },
  planners: {
    emoji: '',
    title: 'Planners',
    subtitle: 'Structured plans for every area of life',
    color: '#f0abfc',
    items: [
      { label: 'Meal planner', desc: 'Plan nutritious, delicious meals', emoji: '🥗' },
      { label: 'Workout', desc: 'Track your fitness journey', emoji: '💪' },
      { label: 'Weekly planner', desc: 'Birds-eye view of your week', emoji: '🗓️' },
    ],
  },
  personal: {
    emoji: '',
    title: 'Personal',
    subtitle: 'The things that make you, you',
    color: '#60a5fa',
    items: [
      { label: 'Bookshelf', desc: 'Books read, reading & to-read', emoji: '📚' },
      { label: 'Movies', desc: 'Your watchlist and reviews', emoji: '🎬' },
      { label: 'Finance', desc: 'Track spending & savings', emoji: '💰' },
    ],
  },
  goals: {
    emoji: '',
    title: 'Goals',
    subtitle: 'Dream big, plan clearly, execute daily',
    color: '#34d399',
    items: [
      { label: 'Vision board', desc: 'Your dreams visualized', emoji: '🎯' },
      { label: 'Health goals', desc: 'Wellness milestones to hit', emoji: '🌱' },
      { label: 'Wishlist', desc: 'Things you want to achieve', emoji: '⭐' },
    ],
  },
};

interface PlaceholderPageProps {
  page: Exclude<ActivePage, 'dashboard'>;
}

export default function PlaceholderPage({ page }: PlaceholderPageProps) {
  const { setActivePage } = useAppStore();
  const info = PAGE_INFO[page];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl mb-6 px-6 py-5 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${info.color}20 0%, transparent 60%)`,
          border: `1px solid ${info.color}25`,
        }}
      >
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-wide" style={{ fontFamily: 'Syne, sans-serif', color: info.color }}>
              {info.title}
            </h1>
            <p className="text-sm text-muted mt-0.5">{info.subtitle}</p>
          </div>
        </div>
      </motion.div>

      {/* Content grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {info.items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ scale: 1.03, y: -2 }}
            className="rounded-2xl p-5 cursor-pointer"
            style={{
              background: 'rgba(16,16,30,0.8)',
              border: `1px solid ${info.color}15`,
            }}
          >
            <span className="text-3xl mb-3 block">{item.emoji}</span>
            <h3 className="font-semibold text-lavender mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
              {item.label}
            </h3>
            <p className="text-xs text-muted">{item.desc}</p>
            <div
              className="mt-4 text-xs font-medium"
              style={{ color: info.color }}
            >
              Open →
            </div>
          </motion.div>
        ))}
      </div>

      {/* Coming soon notice */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="rounded-2xl p-6 flex flex-col items-center justify-center text-center"
        style={{
          background: 'rgba(16,16,30,0.5)',
          border: '1px dashed rgba(167,139,250,0.15)',
        }}
      >
        <p className="text-4xl mb-3">🚧</p>
        <p className="text-sm font-medium text-lavender mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
          Full {info.title} view coming soon
        </p>
        <p className="text-xs text-muted mb-4">This section is part of the SynapseOS roadmap</p>
        <button
          onClick={() => setActivePage('dashboard')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-primary hover:text-white transition-all"
          style={{ background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.2)' }}
        >
          <LayoutDashboard size={12} />
          Back to Dashboard
        </button>
      </motion.div>
    </div>
  );
}
