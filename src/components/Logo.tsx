
import React from 'react';

const Logo = ({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg', className?: string }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <div className="absolute inset-0 logo-animation">
        <div className="absolute left-0 top-0 w-full h-full bg-white rounded-tr-3xl rounded-tl-sm rounded-bl-3xl rounded-br-sm transform rotate-12"></div>
        <div className="absolute left-1 top-1 w-[85%] h-[90%] bg-app-purple rounded-tr-3xl rounded-tl-sm rounded-bl-3xl rounded-br-sm transform rotate-6"></div>
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 font-bold text-white text-center">
        MEF
      </div>
    </div>
  );
};

export default Logo;
