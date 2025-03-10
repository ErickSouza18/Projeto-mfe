
import React from 'react';

const Logo = ({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg', className?: string }) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <div className="absolute inset-0 logo-animation">
        <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg"></div>
        <div className="absolute left-0.5 top-0.5 w-[95%] h-[95%] bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg transform"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center font-bold text-white text-center">
        <span className="text-xl">EGE</span>
      </div>
    </div>
  );
};

export default Logo;
