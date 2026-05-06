import { TagType } from '@/types';
import clsx from 'clsx';
export { clsx };

export const TAG_STYLES: Record<TagType, { bg: string; text: string; border: string }> = {
  work: {
    bg: 'rgba(167, 139, 250, 0.15)',
    text: '#a78bfa',
    border: 'rgba(167, 139, 250, 0.3)',
  },
  life: {
    bg: 'rgba(251, 191, 36, 0.12)',
    text: '#fbbf24',
    border: 'rgba(251, 191, 36, 0.25)',
  },
  health: {
    bg: 'rgba(52, 211, 153, 0.12)',
    text: '#34d399',
    border: 'rgba(52, 211, 153, 0.25)',
  },
  goals: {
    bg: 'rgba(240, 171, 252, 0.12)',
    text: '#f0abfc',
    border: 'rgba(240, 171, 252, 0.25)',
  },
  personal: {
    bg: 'rgba(96, 165, 250, 0.12)',
    text: '#60a5fa',
    border: 'rgba(96, 165, 250, 0.25)',
  },
};

export const STATUS_STYLES = {
  todo: { bg: 'rgba(107,114,128,0.15)', text: '#9ca3af', label: 'To Do' },
  'in-progress': { bg: 'rgba(251,191,36,0.12)', text: '#fbbf24', label: 'In Progress' },
  done: { bg: 'rgba(52,211,153,0.12)', text: '#34d399', label: 'Done' },
};

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

export const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

export const DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
