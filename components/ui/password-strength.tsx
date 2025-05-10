'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface PasswordStrengthProps {
  password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const [strength, setStrength] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let score = 0;
    let feedback = '';

    if (password.length >= 8) score += 1;
    if (password.match(/[a-z]/)) score += 1;
    if (password.match(/[A-Z]/)) score += 1;
    if (password.match(/[0-9]/)) score += 1;
    if (password.match(/[^a-zA-Z0-9]/)) score += 1;

    switch (score) {
      case 0:
        feedback = 'Very Weak';
        break;
      case 1:
        feedback = 'Weak';
        break;
      case 2:
        feedback = 'Fair';
        break;
      case 3:
        feedback = 'Good';
        break;
      case 4:
        feedback = 'Strong';
        break;
      case 5:
        feedback = 'Very Strong';
        break;
    }

    setStrength(score);
    setMessage(feedback);
  }, [password]);

  const getColor = () => {
    switch (strength) {
      case 0:
      case 1:
        return 'bg-red-500';
      case 2:
        return 'bg-yellow-500';
      case 3:
        return 'bg-blue-500';
      case 4:
      case 5:
        return 'bg-green-500';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <div className="space-y-2">
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full transition-all duration-300',
            getColor()
          )}
          style={{ width: `${(strength / 5) * 100}%` }}
        />
      </div>
      <p className={cn(
        'text-sm',
        strength <= 1 && 'text-red-500',
        strength === 2 && 'text-yellow-500',
        strength === 3 && 'text-blue-500',
        strength >= 4 && 'text-green-500'
      )}>
        {message}
      </p>
    </div>
  );
} 