import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import type { CheckListProps, CheckListItem } from './types';

export const checkListVariants = cva('space-y-2', {
  variants: {
    variant: {
      default: 'text-gray-700',
      primary: 'text-primary-700',
      success: 'text-success-700',
      warning: 'text-warning-700',
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

const itemVariants = cva(
  'flex items-start gap-3 p-3 rounded-lg transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-white border border-gray-200',
        selected: 'bg-primary-50 border-primary-200',
        completed: 'bg-success-50 border-success-200',
        disabled: 'bg-gray-50 border-gray-100 opacity-50',
      },
      size: {
        sm: 'p-2',
        md: 'p-3',
        lg: 'p-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const checkboxVariants = cva(
  'flex-shrink-0 w-5 h-5 border-2 rounded transition-colors focus:ring-2 focus:ring-offset-2 mt-0.5',
  {
    variants: {
      variant: {
        default: 'border-gray-300 text-primary-600 focus:ring-primary-500',
        selected: 'border-primary-500 text-primary-600 focus:ring-primary-500',
        completed: 'border-success-500 text-success-600 focus:ring-success-500',
        disabled: 'border-gray-200 text-gray-400 focus:ring-gray-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export const CheckList = React.forwardRef<HTMLDivElement, CheckListProps>(
  (
    {
      className,
      variant,
      size,
      items,
      selectedItems = [],
      onItemToggle,
      allowMultiple = true,
      showDescriptions = true,
      containerClassName,
      ...props
    },
    ref
  ) => {
    const handleItemToggle = (itemId: string) => {
      if (!onItemToggle) return;

      const isCurrentlySelected = selectedItems.includes(itemId);
      const newIsChecked = !isCurrentlySelected;

      if (allowMultiple) {
        onItemToggle(itemId, newIsChecked);
      } else {
        // Single selection - unselect all others
        items.forEach(item => {
          if (item.id !== itemId) {
            onItemToggle(item.id, false);
          }
        });
        onItemToggle(itemId, newIsChecked);
      }
    };

    const getItemVariant = (item: CheckListItem) => {
      if (item.isDisabled) return 'disabled';
      if (item.isCompleted) return 'completed';
      if (selectedItems.includes(item.id)) return 'selected';
      return 'default';
    };

    const getCheckboxVariant = (item: CheckListItem) => {
      if (item.isDisabled) return 'disabled';
      if (item.isCompleted) return 'completed';
      if (selectedItems.includes(item.id)) return 'selected';
      return 'default';
    };

    return (
      <div
        className={cn(
          checkListVariants({ variant, size, className }),
          containerClassName
        )}
        ref={ref}
        {...props}
      >
        {items.map(item => (
          <div
            key={item.id}
            className={cn(
              itemVariants({ variant: getItemVariant(item), size }),
              !item.isDisabled &&
                onItemToggle &&
                'cursor-pointer hover:bg-gray-50'
            )}
            onClick={
              !item.isDisabled && onItemToggle
                ? () => handleItemToggle(item.id)
                : undefined
            }
          >
            <input
              type={allowMultiple ? 'checkbox' : 'radio'}
              checked={selectedItems.includes(item.id)}
              disabled={item.isDisabled}
              onChange={() => {}} // Handled by onClick to prevent double handling
              className={cn(
                checkboxVariants({ variant: getCheckboxVariant(item) })
              )}
            />

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium">{item.label}</span>
                {item.isRequired && (
                  <span className="text-error-600 text-sm">*</span>
                )}
              </div>

              {showDescriptions && item.description && (
                <p className="text-sm text-gray-500 mt-1">{item.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }
);

CheckList.displayName = 'CheckList';

export { itemVariants, checkboxVariants };
export type { CheckListProps, CheckListItem };
