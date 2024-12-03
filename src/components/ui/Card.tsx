import React from 'react';
import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'hover';
}

export function Card({ 
  children, 
  className, 
  variant = 'default',
  ...props 
}: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-lg shadow-sm p-6',
        variant === 'hover' && 'transition-shadow hover:shadow-md',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}