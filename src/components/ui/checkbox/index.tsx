import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const checkboxVariants = cva(
  'relative flex items-start gap-2 cursor-pointer select-none transition-all',
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
      variant: {
        default: 'text-gray-800',
        primary: 'text-primary-700',
        success: 'text-success-700',
        warning: 'text-warning-700',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
      disabled: false,
    },
  }
);

export type CheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size'
> &
  VariantProps<typeof checkboxVariants> & {
    label?: string;
  };

export const Checkbox = ({
  label,
  size,
  variant,
  disabled,
  className,
  checked,
  onChange,
  ...props
}: CheckboxProps) => {
  return (
    <label
      className={cn(checkboxVariants({ size, variant, disabled }), className)}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className="sr-only"
        {...props}
      />
      <div
        className={`${checked ? 'bg-primary border-primary' : 'border-gray-500 bg-white'}  flex-shrink-0 w-5 h-5 border-2 rounded transition-colors duration-150 flex items-center justify-center`}
      >
        {checked && (
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth={3}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
      {label && <span>{label}</span>}
    </label>
  );
};

Checkbox.displayName = 'Checkbox';
