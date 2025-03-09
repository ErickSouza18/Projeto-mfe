
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    className, 
    variant = 'primary', 
    size = 'md', 
    fullWidth = false,
    isLoading = false,
    ...props 
  }, ref) => {
    const variantClasses = {
      primary: 'bg-blue-500 hover:bg-blue-600 text-white shadow-sm',
      secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900',
      outline: 'border border-gray-300 hover:bg-gray-50 text-gray-700',
      ghost: 'hover:bg-gray-100 text-gray-700',
      link: 'text-blue-500 hover:underline',
      danger: 'bg-red-500 hover:bg-red-600 text-white'
    };

    const sizeClasses = {
      sm: 'text-sm px-3 py-1.5 rounded',
      md: 'px-4 py-2 rounded-md',
      lg: 'text-lg px-6 py-3 rounded-lg'
    };

    return (
      <button
        ref={ref}
        className={cn(
          'font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95 transform disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center',
          variantClasses[variant],
          sizeClasses[size],
          fullWidth ? 'w-full' : '',
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
