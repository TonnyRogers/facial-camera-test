import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import type { AlertDialogProps } from './types';
import { X } from 'lucide-react';

export const alertDialogVariants = cva(
  'fixed inset-0 z-50 flex items-center justify-center',
  {
    variants: {
      variant: {
        default: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export const alertDialogOverlayVariants = cva(
  'fixed inset-0 z-50 bg-black/80 transition-opacity',
  {
    variants: {
      variant: {
        default: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export const alertDialogContentVariants = cva(
  'relative z-50 grid w-full max-w-lg gap-4 border bg-white py-14 px-16 shadow-lg transition-all sm:rounded-lg',
  {
    variants: {
      variant: {
        default: 'border-gray-200',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export const AlertDialog = React.forwardRef<HTMLDivElement, AlertDialogProps>(
  (
    {
      isOpen,
      onClose,
      title,
      description,
      children,
      className,
      overlayClassName,
      contentClassName,
      showCloseButton = true,
      ...props
    },
    ref
  ) => {
    React.useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }

      return () => {
        document.body.style.overflow = 'unset';
      };
    }, [isOpen]);

    React.useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      if (isOpen) {
        document.addEventListener('keydown', handleEscape);
      }

      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
      <div
        className={cn(alertDialogVariants(), className)}
        ref={ref}
        {...props}
      >
        <div
          className={cn(alertDialogOverlayVariants(), overlayClassName)}
          onClick={onClose}
        />

        <div
          className={cn(alertDialogContentVariants(), contentClassName)}
          onClick={e => e.stopPropagation()}
        >
          {(title || showCloseButton) && (
            <div className="flex justify-between items-center">
              {title && (
                <h2 className="text-lg font-semibold text-darkGray">{title}</h2>
              )}
              {showCloseButton && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="absolute top-8 right-8 p-0 w-8 h-8"
                >
                  <X className="w-6 h-6" />
                </Button>
              )}
            </div>
          )}

          {description && (
            <p className="text-sm text-gray-600">{description}</p>
          )}

          {children && <div className="mt-4">{children}</div>}
        </div>
      </div>
    );
  }
);

AlertDialog.displayName = 'AlertDialog';

export type { AlertDialogProps };
