import React, { SelectHTMLAttributes } from 'react';
import { cn } from "@/lib/utils"

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

export function Select({ 
  children,
  className,
  label,
  error,
  ...props 
}: SelectProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        className={cn(
          'w-full px-4 py-3 border border-gray-300 rounded-md appearance-none',
          'focus:outline-none focus:ring-2 focus:ring-amber-600',
          'bg-white',
          error && 'border-red-500',
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}