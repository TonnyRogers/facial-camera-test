import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import type { ButtonProps } from './types';
import { Oval } from 'react-loader-spinner';
import { colors } from '@/theme';

export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-[30px] font-bold transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive cursor-pointer gap-2',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white hover:bg-primary/90',
        primary: 'bg-orange text-white hover:bg-orange/90 font-semibold',
        secondary: 'bg-darkPurple text-white hover:bg-darkPurple/90',
        outline: 'border-2 border-primary bg-transparent text-primary',
        ghost: 'hover:bg-backgroundGray hover:text-darkGray',
        link: 'underline-offset-4 hover:underline text-primary',
        cream: 'bg-cream text-darkGray hover:bg-cream/90',
      },
      size: {
        default: 'h-12 py-3 px-6',
        sm: 'h-8 px-4 text-xs',
        lg: 'h-16 px-8 text-base',
        xl: 'h-20 px-12 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, children, loading, disabled, ...props },
    ref
  ) => {
    return (
      <button
        disabled={loading || disabled}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {loading ? (
          <>
            <Oval
              width={20}
              height={20}
              strokeWidth={8}
              color="#FFFFFF"
              secondaryColor={colors.brand.secondary}
            />
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export type { ButtonProps };
