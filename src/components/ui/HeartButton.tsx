
import React from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeartButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'filled' | 'outline';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const HeartButton = ({
  onClick,
  children,
  className,
  size = 'md',
  variant = 'filled',
  type = 'button',
  disabled = false
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
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-300 hover:shadow-lg',
        sizeClasses[size],
        variantClasses[variant],
        disabled && 'opacity-50 cursor-not-allowed',
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
