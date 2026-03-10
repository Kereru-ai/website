
import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'color' | 'white' | 'black';
}

export const Logo: React.FC<LogoProps> = ({ className = "w-12 h-12", variant = 'color' }) => {
  return (
    <img 
      src="/white_line_logo.png" 
      alt="Kereru.ai Logo" 
      className={`object-contain ${className}`}
    />
  );
};
