import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Timer, RotateCcw } from 'lucide-react';
import { formatTime } from '@/utils/helpers';

type Mode = '25' | '5' | '15';
const MODES: Record<Mode, { label: string; seconds: number; color: string }> = {
  '25': { label: 'Focus', seconds: 25 * 60, color: '#a78bfa' },
  '5': { label: 'Short break', seconds: 5 * 60, color: '#34d399' },
  '15': { label: 'Long break', seconds: 15 * 60, color: '#60a5fa' },
};

export default function PomodoroTimer() {
  const [mode, setMode] = useState<Mode>('25');
  const [timeLeft, setTimeLeft] = useState(MODES['25'].seconds);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = MODES[mode].seconds;
  const color = MODES[mode].color;
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - timeLeft / total);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            setIsRunning(false);
            if (mode === '25') setSessions(s => s + 1);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRunning, mode]);

  const switchMode = (m: Mode) => {
    setMode(m);
    setTimeLeft(MODES[m].seconds);
    setIsRunning(false);
  };

  const reset = () => {
    setTimeLeft(MODES[mode].seconds);
    setIsRunning(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="rounded-2xl p-4"
      style={{
        background: 'rgba(16,16,30,0.8)',
        border: '1px solid rgba(167,139,250,0.1)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Timer size={13} className="text-primary" />
          <span className="text-xs font-medium text-muted">Focus Timer</span>
        </div>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: 4 }, (_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{
                background: i < sessions % 4 ? '#a78bfa' : 'rgba(167,139,250,0.2)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Mode tabs */}
      <div className="flex gap-1.5 mb-4">
        {(Object.keys(MODES) as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className="flex-1 py-1 rounded-lg text-[10px] font-medium transition-all"
            style={
              mode === m
                ? { background: `${MODES[m].color}25`, color: MODES[m].color, border: `1px solid ${MODES[m].color}40` }
                : { background: 'rgba(255,255,255,0.03)', color: '#6b7280', border: '1px solid rgba(167,139,250,0.08)' }
            }
          >
            {MODES[m].label}
          </button>
        ))}
      </div>

      {/* Circle timer */}
      <div className="flex items-center justify-center mb-4">
        <div className="relative w-[130px] h-[130px]">
          <svg width="130" height="130" className="-rotate-90">
            <circle cx="65" cy="65" r={radius} fill="none" stroke="rgba(167,139,250,0.1)" strokeWidth="6" />
            <motion.circle
              cx="65"
              cy="65"
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              style={{
                filter: isRunning
                  ? `drop-shadow(0 0 12px ${color}) drop-shadow(0 0 4px ${color})`
                  : `drop-shadow(0 0 6px ${color}60)`,
                transition: 'filter 0.5s ease',
              }}
              animate={isRunning ? { opacity: [1, 0.85, 1] } : { opacity: 1 }}
              transition={isRunning
                ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
                : { duration: 0.5 }
              }
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-lavender font-mono" style={{ fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.05em'  }}>
              {formatTime(timeLeft)}
            </span>
            <span className="text-[10px] text-muted mt-0.5">{MODES[mode].label}</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsRunning(p => !p)}
          className="flex-1 py-2 rounded-xl text-xs font-semibold text-white transition-all"
          style={{
            background: isRunning
              ? 'rgba(167,139,250,0.2)'
              : `linear-gradient(135deg, ${color}, ${color}99)`,
            border: isRunning ? `1px solid ${color}40` : 'none',
            color: isRunning ? color : '#fff',
            boxShadow: isRunning ? 'none' : `0 0 16px ${color}40`,
          }}
        >
          {isRunning ? 'Pause' : 'Start'}
        </motion.button>
        <button
          onClick={reset}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-muted hover:text-accent hover:bg-primary/10 transition-all"
          style={{ border: '1px solid rgba(167,139,250,0.1)' }}
        >
          <RotateCcw size={13} />
        </button>
      </div>

      {sessions > 0 && (
        <p className="text-center text-[10px] text-muted/60 mt-2">
          {sessions} session{sessions !== 1 ? 's' : ''} completed today
        </p>
      )}
    </motion.div>
  );
}
