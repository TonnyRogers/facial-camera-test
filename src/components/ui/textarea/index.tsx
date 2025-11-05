import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import type { TextareaProps } from './types';

export const textareaVariants = cva(
  'block w-full rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none',
  {
    variants: {
      variant: {
        default:
          'border-gray-300 placeholder-gray-400 focus:border-primary-500 focus:ring-primary-500',
        error:
          'border-error-500 placeholder-gray-400 focus:border-error-500 focus:ring-error-500',
        success:
          'border-success-500 placeholder-gray-400 focus:border-success-500 focus:ring-success-500',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-3 py-2',
        lg: 'px-4 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant,
      size,
      label,
      error,
      helperText,
      containerClassName,
      id,
      ...props
    },
    ref
  ) => {
    const textareaId =
      id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = !!error;
    const textareaVariant = hasError ? 'error' : variant;

    return (
      <div className={cn('w-full', containerClassName)}>
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          className={cn(
            textareaVariants({ variant: textareaVariant, size, className })
          )}
          ref={ref}
          {...props}
        />
        {(error || helperText) && (
          <p
            className={cn(
              'mt-1 text-sm',
              hasError ? 'text-error-600' : 'text-gray-500'
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export type { TextareaProps };
