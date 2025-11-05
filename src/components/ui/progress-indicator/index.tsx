import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import type { ProgressIndicatorProps, ProgressStep } from './types';

export const progressVariants = cva('flex items-center justify-between', {
  variants: {
    variant: {
      default: 'text-gray-600',
      primary: 'text-primary-600',
      success: 'text-success-600',
      warning: 'text-warning-600',
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
});

const stepVariants = cva(
  'flex items-center justify-center rounded-full border-2 font-medium transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'border-gray-300 bg-white text-gray-500',
        active: 'border-primary-500 bg-primary-500 text-white',
        completed: 'border-success-500 bg-success-500 text-white',
        disabled: 'border-gray-200 bg-gray-100 text-gray-400',
      },
      size: {
        sm: 'w-6 h-6 text-xs',
        md: 'w-8 h-8 text-sm',
        lg: 'w-10 h-10 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const lineVariants = cva('flex-1 h-0.5 transition-all duration-200', {
  variants: {
    variant: {
      default: 'bg-gray-200',
      active: 'bg-primary-500',
      completed: 'bg-success-500',
      disabled: 'bg-gray-200',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const ProgressIndicator = React.forwardRef<
  HTMLDivElement,
  ProgressIndicatorProps
>(
  (
    {
      className,
      variant,
      size,
      steps,
      currentStep = 0,
      showLabels = true,
      containerClassName,
      ...props
    },
    ref
  ) => {
    const getStepVariant = (
      index: number,
      stepStatus: ProgressStep['status']
    ) => {
      if (stepStatus === 'completed') return 'completed';
      if (stepStatus === 'active' || index === currentStep) return 'active';
      if (stepStatus === 'disabled') return 'disabled';
      return 'default';
    };

    const getLineVariant = (index: number) => {
      if (index < currentStep) return 'completed';
      if (index === currentStep) return 'active';
      return 'default';
    };

    return (
      <div
        className={cn(
          progressVariants({ variant, size, className }),
          containerClassName
        )}
        ref={ref}
        {...props}
      >
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  stepVariants({
                    variant: getStepVariant(index, step.status),
                    size,
                  })
                )}
              >
                {step.status === 'completed' ? (
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              {showLabels && (
                <span className="mt-2 text-xs text-center max-w-20 break-words">
                  {step.label}
                </span>
              )}
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  lineVariants({ variant: getLineVariant(index) }),
                  'mx-2'
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }
);

ProgressIndicator.displayName = 'ProgressIndicator';

export { stepVariants, lineVariants };
export type { ProgressIndicatorProps, ProgressStep };
