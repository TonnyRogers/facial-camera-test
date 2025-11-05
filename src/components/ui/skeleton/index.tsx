import React from 'react';
import clsx from 'clsx';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circle' | 'rect';
  width?: string | number;
  height?: string | number;
}

const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rect',
  width = '100%',
  height = '1rem',
  className,
  ...props
}) => {
  const shapeStyles = {
    text: 'rounded',
    circle: 'rounded-full',
    rect: 'rounded-md',
  }[variant];

  return (
    <div
      className={clsx('animate-pulse bg-gray-400', shapeStyles, className)}
      style={{ width, height }}
      {...props}
    />
  );
};

export default Skeleton;
