import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import type { CardProps } from './types';

export const cardVariants = cva('rounded-lg border transition-colors', {
  variants: {
    variant: {
      default: 'bg-white border-gray-200',
      outline: 'bg-transparent border-gray-300',
      ghost: 'bg-transparent border-transparent',
      company: 'bg-white border-gray-200 hover:border-gray-300 cursor-pointer',
      beneficiary: 'bg-white border-gray-200',
      orientation: 'bg-white border-gray-200',
      timeSlot: 'bg-gray-100 border-gray-200 cursor-pointer hover:bg-gray-200',
      confirmation: 'bg-creme border-gray-200',
      file: 'bg-white border-gray-200',
    },
    size: {
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
      xl: 'p-8',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={cn(cardVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

export type { CardProps };
