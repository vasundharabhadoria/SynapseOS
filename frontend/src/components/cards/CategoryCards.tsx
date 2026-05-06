import { motion } from 'framer-motion';
import { CategoryCard } from '@/types';
import { useAppStore } from '@/store/appStore';
import { ActivePage } from '@/types';

const CATEGORY_CARDS: CategoryCard[] = [
  {
    id: 'daily',
    title: 'Daily',
    emoji: '🌸',
    color: '#a78bfa',
    gradient: 'linear-gradient(135deg, rgba(167,139,250,0.2), rgba(167,139,250,0.05))',
    items: ['Planner', 'Journal', 'Notes'],
    count: 3,
  },
  {
    id: 'planners',
    title: 'Planners',
    emoji: '📋',
    color: '#f0abfc',
    gradient: 'linear-gradient(135deg, rgba(240,171,252,0.2), rgba(240,171,252,0.05))',
    items: ['Meal planner', 'Workout', 'Weekly'],
    count: 7,
  },
  {
    id: 'personal',
    title: 'Personal',
    emoji: '🌙',
    color: '#60a5fa',
    gradient: 'linear-gradient(135deg, rgba(96,165,250,0.2), rgba(96,165,250,0.05))',
    items: ['Bookshelf', 'Movies', 'Finance'],
    count: 5,
  },
  {
    id: 'goals',
    title: 'Goals',
    emoji: '✨',
    color: '#34d399',
    gradient: 'linear-gradient(135deg, rgba(52,211,153,0.2), rgba(52,211,153,0.05))',
    items: ['Vision', 'Health', 'Wishlist'],
    count: 4,
  },
];

export default function CategoryCards() {
  const { setActivePage } = useAppStore();

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {CATEGORY_CARDS.map((card, i) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 + 0.15 }}
          whileHover={{ scale: 1.03, y: -2 }}
          onClick={() => setActivePage(card.id as ActivePage)}
          className="card-base cursor-pointer group relative overflow-hidden"
          style={{ background: card.gradient, border: `1px solid ${card.color}20` }}
        >
          {/* Glow on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ boxShadow: `inset 0 0 30px ${card.color}15` }}
          />

          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <motion.div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: `${card.color}20`, border: `1px solid ${card.color}30` }}
              whileHover={{ rotate: 15, scale: 1.1 }}
            >
              <div className="w-2 h-2 rounded-full" style={{ background: card.color, boxShadow: `0 0 8px ${card.color}` }} />
            </motion.div>
            <motion.span
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ background: `${card.color}20`, color: card.color }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              {card.count} items
            </motion.span>
          </div>

          {/* Title */}
          <h3
            className="font-semibold text-base mb-3 tracking-wide"
            style={{ fontFamily: 'Syne, sans-serif', color: card.color }}
          >
            {card.title}
          </h3>

          {/* Sub-items */}
          <div className="flex flex-col gap-1.5">
            {card.items.map((item, idx) => (
              <motion.div
                key={item}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 + idx * 0.05 + 0.2 }}
              >
                <motion.div
                  className="w-1 h-1 rounded-full"
                  style={{ background: card.color }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                />
                <span className="text-xs text-muted group-hover:text-lavender transition-colors">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Bottom bar */}
          <div
            className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl"
            style={{ background: `linear-gradient(90deg, transparent, ${card.color}, transparent)` }}
          />
        </motion.div>
      ))}
    </div>
  );
}
