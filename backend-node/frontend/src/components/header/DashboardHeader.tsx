import { motion } from 'framer-motion';
import { Search, Bell, Sparkles } from 'lucide-react';
import { format } from 'date-fns';
import { useAppStore } from '@/store/appStore';

export default function DashboardHeader() {
  const { searchQuery, setSearchQuery } = useAppStore();
  const today = new Date();

  const getGreeting = () => {
    const h = today.getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-2xl mb-6 px-6 py-5"
      style={{
        background: 'linear-gradient(135deg, rgba(167,139,250,0.18) 0%, rgba(240,171,252,0.1) 50%, rgba(96,165,250,0.08) 100%)',
        border: '1px solid rgba(167,139,250,0.2)',
        boxShadow: '0 4px 32px rgba(167,139,250,0.1)',
      }}
    >
      {/* Ambient orbs */}
      <div
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-30 blur-3xl pointer-events-none orb-1"
        style={{ background: 'radial-gradient(circle, #a78bfa, transparent)' }}
      />
      <div
        className="absolute -bottom-8 right-32 w-32 h-32 rounded-full opacity-20 blur-3xl pointer-events-none orb-2"
        style={{ background: 'radial-gradient(circle, #f0abfc, transparent)' }}
      />

      <div className="relative z-10 flex items-center justify-between">
        {/* Left: greeting */}
        <div>
          <motion.p
            className="text-sm text-primary/70 font-medium mb-1 flex items-center gap-1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.05 }}
          >
            {format(today, 'EEEE, MMMM d')}
          </motion.p>
          <motion.h1
            className="text-3xl font-bold"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            style={{
              fontFamily: 'Syne, sans-serif',
              background: 'linear-gradient(135deg, #ddd6fe, #f0abfc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {getGreeting()}, Alex
          </motion.h1>
          <motion.p
            className="text-muted text-sm mt-1"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Your digital brain is ready. What are we building today?
          </motion.p>
          <div className="shimmer h-px mt-3 rounded-full opacity-70" style={{ width: 200 }} />
        </div>

        {/* Right: search + bell */}
        <div className="flex items-center gap-3">
          <div
            className="relative flex items-center"
            style={{ width: 220 }}
          >
            <Search size={14} className="absolute left-3 text-muted" />
            <input
              type="text"
              placeholder="Search anything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-4 py-2 rounded-xl text-sm text-lavender placeholder-muted/50 outline-none transition-all"
              style={{
                background: 'rgba(10,10,20,0.6)',
                border: '1px solid rgba(167,139,250,0.15)',
                boxShadow: searchQuery ? '0 0 0 2px rgba(167,139,250,0.25)' : 'none',
              }}
            />
          </div>

          <button
            className="w-9 h-9 rounded-xl flex items-center justify-center relative transition-all hover:bg-primary/10"
            style={{ border: '1px solid rgba(167,139,250,0.15)' }}
          >
            <Bell size={16} className="text-accent" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-secondary" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
