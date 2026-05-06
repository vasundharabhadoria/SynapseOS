import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Music2 } from 'lucide-react';
import { SongTrack } from '@/types';
import { formatTime } from '@/utils/helpers';

const TRACKS: SongTrack[] = [
  { title: 'Tokyo Daydream', artist: 'Nujabes', duration: 214, cover: '🌸' },
  { title: 'Feather', artist: 'Nujabes ft. Cise Starr', duration: 197, cover: '🍃' },
  { title: 'Horizon', artist: 'Tycho', duration: 243, cover: '🌅' },
];

export default function SpotifyWidget() {
  const [trackIdx, setTrackIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const track = TRACKS[trackIdx];

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress(p => {
          if (p >= track.duration) {
            setTrackIdx(i => (i + 1) % TRACKS.length);
            return 0;
          }
          return p + 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying, track.duration]);

  const handlePrev = () => {
    setTrackIdx(i => (i - 1 + TRACKS.length) % TRACKS.length);
    setProgress(0);
  };
  const handleNext = () => {
    setTrackIdx(i => (i + 1) % TRACKS.length);
    setProgress(0);
  };

  const pct = (progress / track.duration) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="rounded-2xl p-4"
      style={{
        background: 'linear-gradient(135deg, rgba(22,16,42,0.95), rgba(16,16,30,0.9))',
        border: '1px solid rgba(167,139,250,0.12)',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Music2 size={13} className="text-primary" />
        <span className="text-xs font-medium text-muted">Now Playing</span>
      </div>

      {/* Album art with visualizer */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-12 h-12 rounded-xl shrink-0 flex items-end justify-center gap-0.5 px-2 pb-2"
          style={{
            background: 'linear-gradient(135deg, rgba(167,139,250,0.25), rgba(240,171,252,0.15))',
            border: '1px solid rgba(167,139,250,0.2)',
          }}
        >
          {[0.5, 0.9, 0.6, 1.0, 0.7].map((h, idx) => (
            <div
              key={idx}
              className="w-1 rounded-full wave-bar"
              style={{
                height: 16,
                background: 'linear-gradient(to top, #a78bfa, #f0abfc)',
                '--dur': isPlaying ? `${0.5 + idx * 0.15}s` : '999s',
                '--delay': `${idx * 0.1}s`,
                transform: isPlaying ? undefined : `scaleY(${h * 0.4})`,
              } as React.CSSProperties}
            />
          ))}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-lavender truncate">{track.title}</p>
          <p className="text-xs text-muted truncate">{track.artist}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div
          className="h-1 rounded-full overflow-hidden mb-1.5"
          style={{ background: 'rgba(167,139,250,0.15)' }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              width: `${pct}%`,
              background: 'linear-gradient(90deg, #a78bfa, #f0abfc)',
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-muted/60">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(track.duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <button onClick={handlePrev} className="text-muted hover:text-accent transition-colors">
          <SkipBack size={14} />
        </button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsPlaying(p => !p)}
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #a78bfa, #f0abfc)',
            boxShadow: '0 0 16px rgba(167,139,250,0.4)',
          }}
        >
          {isPlaying ? <Pause size={14} className="text-white" /> : <Play size={14} className="text-white ml-0.5" />}
        </motion.button>
        <button onClick={handleNext} className="text-muted hover:text-accent transition-colors">
          <SkipForward size={14} />
        </button>
      </div>

      {/* Connect button */}
      <button
        className="mt-4 w-full py-2 rounded-xl text-xs font-medium text-muted hover:text-accent transition-all"
        style={{ border: '1px dashed rgba(167,139,250,0.2)' }}
      >
        Connect Spotify →
      </button>
    </motion.div>
  );
}
