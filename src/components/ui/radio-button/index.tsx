import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import type { RadioButtonProps } from './types';

export const radioVariants = cva(
  'flex items-center gap-3 cursor-pointer transition-colors',
  {
    variants: {
      variant: {
        default: 'text-gray-700 hover:text-gray-900',
        company: 'text-gray-700 hover:text-gray-900',
        medical: 'text-gray-700 hover:text-gray-900',
      },
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const radioInputVariants = cva(
  'w-4 h-4 border-2 rounded-full transition-colors focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-gray-300 text-primary-600 focus:ring-primary-500',
        company: 'border-gray-300 text-primary-600 focus:ring-primary-500',
        medical: 'border-gray-300 text-primary-600 focus:ring-primary-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>(
  (
    {
      className,
      variant,
      size,
      label,
      description,
      containerClassName,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <label
        className={cn(
          radioVariants({ variant, size, className: containerClassName })
        )}
        htmlFor={inputId}
      >
        <input
          id={inputId}
          type="radio"
          className={cn(
            'accent-[#fc4c02]',
            radioInputVariants({ variant }),
            className
          )}
          ref={ref}
          {...props}
        />
        <div className="flex flex-col">
          {label && <span className="font-medium">{label}</span>}
          {description && (
            <span className="text-sm text-gray-500">{description}</span>
          )}
        </div>
      </label>
    );
  }
);

RadioButton.displayName = 'RadioButton';

export { radioInputVariants };
export type { RadioButtonProps };
