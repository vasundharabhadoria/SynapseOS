import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  CalendarDays,
  BookOpen,
  User,
  Target,
  Sparkles,
  Settings,
  Bell,
} from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { ActivePage } from '@/types';
import { clsx } from '@/utils/helpers';

interface NavEntry {
  id: ActivePage;
  label: string;
  icon: React.ReactNode;
  emoji: string;
}

const NAV_ITEMS: NavEntry[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} />, emoji: '' },
  { id: 'daily',     label: 'Daily',     icon: <CalendarDays size={16} />,    emoji: '' },
  { id: 'planners',  label: 'Planners',  icon: <BookOpen size={16} />,        emoji: '' },
  { id: 'personal',  label: 'Personal',  icon: <User size={16} />,            emoji: '' },
  { id: 'goals',     label: 'Goals',     icon: <Target size={16} />,          emoji: '' },
];

export default function Sidebar() {
  const { activePage, setActivePage } = useAppStore();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const timeStr = time.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  });

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-56 h-full flex flex-col py-6 px-3 shrink-0"
      style={{
        background: 'rgba(10, 10, 20, 0.95)',
        borderRight: '1px solid rgba(167,139,250,0.08)',
      }}
    >
      {/* Logo */}
      <div className="px-3 mb-8">
        <motion.div className="flex items-center gap-2.5" whileHover={{ x: 2 }}>
          <motion.div
            className="w-8 h-8 rounded-xl flex items-center justify-center pulse-glow"
            style={{ background: 'linear-gradient(135deg, #a78bfa, #f0abfc)' }}
            whileHover={{ rotate: 180, scale: 1.1 }}
            transition={{ duration: 0.4 }}
          >
            <Sparkles size={14} className="text-white" />
          </motion.div>
          <div>
            <p className="text-xs font-semibold text-white leading-none" style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '0.05em' }}>
              SynapseOS
            </p>
            <p className="text-[10px] text-primary/60 mt-0.5 font-mono">{timeStr}</p>
          </div>
        </motion.div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-1">
        <p className="text-[10px] uppercase tracking-widest text-muted/50 px-3 mb-2 font-medium">
          Navigation
        </p>

        {NAV_ITEMS.map((item, i) => {
          const isActive = activePage === item.id;
          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 + 0.1, type: 'spring', stiffness: 220, damping: 20 }}
              onClick={() => setActivePage(item.id)}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.97 }}
              className={clsx(
                'nav-item group relative',
                isActive && 'active'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(167,139,250,0.15), rgba(240,171,252,0.08))',
                    border: '1px solid rgba(167,139,250,0.2)',
                  }}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className={clsx('relative z-10 transition-colors', isActive ? 'text-primary' : 'text-muted group-hover:text-accent')}>
                {item.icon}
              </span>
              <span className="relative z-10 text-sm">{item.label}</span>
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    key="dot"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="relative z-10 ml-auto w-1.5 h-1.5 rounded-full bg-primary"
                    style={{ boxShadow: '0 0 6px #a78bfa' }}
                  />
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="flex flex-col gap-1 mt-4 pt-4" style={{ borderTop: '1px solid rgba(167,139,250,0.08)' }}>
        <button className="nav-item">
          <Bell size={15} />
          <span>Notifications</span>
          <motion.span
            className="ml-auto w-4 h-4 rounded-full bg-primary/80 text-[9px] flex items-center justify-center text-white font-bold"
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >3</motion.span>
        </button>
        <button className="nav-item">
          <Settings size={15} />
          <span>Settings</span>
        </button>

        {/* Avatar */}
        <motion.div
          className="flex items-center gap-2.5 px-3 py-2.5 mt-2 rounded-xl glass-light"
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative">
            <motion.div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #a78bfa, #f0abfc)' }}
              animate={{ boxShadow: ['0 0 0px rgba(167,139,250,0)', '0 0 12px rgba(167,139,250,0.5)', '0 0 0px rgba(167,139,250,0)'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >A</motion.div>
            <motion.div
              className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-[#0a0a14]"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <div>
            <p className="text-xs font-medium text-lavender leading-none" style={{ fontFamily: 'Syne, sans-serif' }}>Alex</p>
            <p className="text-[10px] text-muted mt-0.5">Pro Plan</p>
          </div>
        </motion.div>
      </div>
    </motion.aside>
  );
}
