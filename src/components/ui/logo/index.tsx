import React from 'react';
import logoLeve from '@/assets/svgs/logo-leve.svg';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`${className}`}>
      <img src={logoLeve} alt="logoLeve" />
    </div>
  );
};
