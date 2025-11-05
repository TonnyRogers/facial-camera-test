import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import type { TagProps } from './types';

export const tagVariants = cva(
  'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
  {
    variants: {
      variant: {
        default: 'bg-gray-100 text-gray-800',
        company: 'bg-primary-100 text-primary-800',
        status: 'bg-warning-100 text-warning-800',
        pending: 'bg-warning-100 text-warning-800',
        declaration: 'bg-gray-100 text-gray-800',
        success: 'bg-success-100 text-success-800',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-sm',
        lg: 'px-3 py-1.5 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <span
        className={cn(tagVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Tag.displayName = 'Tag';

export type { TagProps };
