import { TagType } from '@/types';
import { TAG_STYLES } from '@/utils/helpers';

interface TagPillProps {
  tag: TagType;
  size?: 'sm' | 'md';
}

export default function TagPill({ tag, size = 'md' }: TagPillProps) {
  const style = TAG_STYLES[tag];
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium capitalize ${
        size === 'sm' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-0.5 text-xs'
      }`}
      style={{
        background: style.bg,
        color: style.text,
        border: `1px solid ${style.border}`,
      }}
    >
      {tag}
    </span>
  );
}
