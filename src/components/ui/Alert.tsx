import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
}

export function Alert({ 
  children, 
  className, 
  variant = 'info',
  title,
  ...props 
}: AlertProps) {
  const variants = {
    info: {
      container: 'bg-blue-50 border-blue-200',
      icon: Info,
      iconColor: 'text-blue-500',
      titleColor: 'text-blue-800'
    },
    success: {
      container: 'bg-green-50 border-green-200',
      icon: CheckCircle,
      iconColor: 'text-green-500',
      titleColor: 'text-green-800'
    },
    warning: {
      container: 'bg-amber-50 border-amber-200',
      icon: AlertCircle,
      iconColor: 'text-amber-500',
      titleColor: 'text-amber-800'
    },
    error: {
      container: 'bg-red-50 border-red-200',
      icon: XCircle,
      iconColor: 'text-red-500',
      titleColor: 'text-red-800'
    }
  };

  const Icon = variants[variant].icon;

  return (
    <div
      className={cn(
        'border rounded-lg p-4',
        variants[variant].container,
        className
      )}
      {...props}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className={cn('h-5 w-5', variants[variant].iconColor)} />
        </div>
        <div className="ml-3">
          {title && (
            <h3 className={cn('text-sm font-medium', variants[variant].titleColor)}>
              {title}
            </h3>
          )}
          <div className={cn('text-sm', title && 'mt-2')}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}