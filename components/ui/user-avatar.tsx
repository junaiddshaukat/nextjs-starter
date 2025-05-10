'use client';

import { cn } from '@/lib/utils';

interface UserAvatarProps {
  name: string;
  className?: string;
}

const colors = [
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-red-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-indigo-500',
];

export function UserAvatar({ name, className }: UserAvatarProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const colorIndex = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  const bgColor = colors[colorIndex];

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full text-white font-bold shadow-lg border-4 border-gray-900 ring-2 ring-white',
        bgColor,
        className,
        'transition-all duration-200',
        'aspect-square',
      )}
      style={{ minWidth: 40, minHeight: 40 }}
    >
      <span className="text-lg select-none" style={{ letterSpacing: 1 }}>{initials}</span>
    </div>
  );
} 