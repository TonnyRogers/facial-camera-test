import React from 'react';
import type { ResponsiveContainerProps } from './types';

const maxWidthClasses = {
  mobile: 'max-w-md',
  tablet: 'max-w-2xl',
  desktop: 'max-w-[1128px]',
  full: 'max-w-full',
};

const paddingClasses = {
  none: '',
  sm: 'px-4 py-4',
  md: 'px-6 py-6',
  lg: 'px-7 py-6',
};

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className = '',
  maxWidth = 'desktop',
  padding = 'md',
  center = true,
}) => {
  const maxWidthClass = maxWidthClasses[maxWidth];
  const paddingClass = paddingClasses[padding];
  const centerClass = center ? 'mx-auto' : '';

  return (
    <div
      className={`w-full ${maxWidthClass} ${paddingClass} ${centerClass} ${className}`}
    >
      {children}
    </div>
  );
};
