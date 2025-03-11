
import React from 'react';

const Logo = ({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg', className?: string }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-20 h-20'
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-blue-600 rounded-full" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
        <span className={size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-lg'}>EGE</span>
      </div>
    </div>
  );
};

export default Logo;
