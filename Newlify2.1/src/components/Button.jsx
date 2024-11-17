import React from 'react';

export default function Button({ children, variant, className, ...props }) {
  return (
    <button 
      className={`
        px-4 py-2 rounded transition-colors
        ${variant === 'outline' 
          ? 'border border-neutral-light hover:border-primary-light text-neutral-dark hover:text-primary-light' 
          : 'bg-primary-light hover:bg-primary text-white'
        } 
        ${className}
      `} 
      {...props}
    >
      {children}
    </button>
  );
}