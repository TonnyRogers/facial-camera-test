import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import type { TimeSlotProps } from './types';

export const timeSlotVariants = cva(
  'flex items-center justify-center rounded-full border-2 transition-all duration-200 cursor-pointer font-medium max-w-[90px]',
  {
    variants: {
      variant: {
        default:
          'border-gray-200 bg-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50',
        selected:
          'border-primary bg-primary-50 text-primary focus:outline-none ',
        disabled: 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed',
        unavailable:
          'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed',
      },
      size: {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-3',
        lg: 'px-6 py-4 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export const TimeSlot = React.forwardRef<HTMLButtonElement, TimeSlotProps>(
  (
    {
      className,
      variant,
      size,
      time,
      isSelected = false,
      isDisabled = false,
      isUnavailable = false,
      containerClassName,
      ...props
    },
    ref
  ) => {
    const getVariant = () => {
      if (isUnavailable) return 'unavailable';
      if (isDisabled) return 'disabled';
      if (isSelected) return 'selected';
      return variant || 'default';
    };

    return (
      <button
        className={cn(
          timeSlotVariants({ variant: getVariant(), size, className }),
          containerClassName
        )}
        disabled={isDisabled || isUnavailable}
        ref={ref}
        {...props}
      >
        <div className="">
          <span className="font-semibold">{time.slice(0, 5)}</span>
        </div>
      </button>
    );
  }
);

TimeSlot.displayName = 'TimeSlot';

export type { TimeSlotProps };
