
import React from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeartButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'filled' | 'outline';
}

const HeartButton = ({
  onClick,
  children,
  className,
  size = 'md',
  variant = 'filled'
}: HeartButtonProps) => {
  const sizeClasses = {
    sm: 'text-sm px-4 py-2',
    md: 'text-base px-6 py-3',
    lg: 'text-lg px-8 py-4'
  };

  const variantClasses = {
    filled: 'bg-gradient-to-r from-heart to-romance-purple text-white shadow-md',
    outline: 'border-2 border-heart text-heart hover:bg-heart/5'
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-300 hover:shadow-lg',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      <Heart 
        className={cn(
          'w-4 h-4',
          variant === 'filled' ? '' : 'text-heart'
        )} 
      />
      {children}
    </button>
  );
};

export default HeartButton;
