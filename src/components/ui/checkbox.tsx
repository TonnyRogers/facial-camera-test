import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CheckboxProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  className?: string;
  containerClassName?: string;
  id?: string;
}

const CheckboxPrimitiveComponent = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-6 w-6 shrink-0 rounded border-2 border-gray-300 bg-white focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-white',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex justify-center items-center text-current')}
    >
      <Check className="w-4 h-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
CheckboxPrimitiveComponent.displayName = CheckboxPrimitive.Root.displayName;

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      checked,
      onCheckedChange,
      label,
      description,
      className,
      containerClassName,
      id,
      ...props
    },
    ref
  ) => {
    const checkboxId =
      id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div
        className={cn(
          'flex gap-3 items-start transition-colors cursor-pointer',
          containerClassName
        )}
        onClick={() => onCheckedChange?.(!checked)}
      >
        <CheckboxPrimitiveComponent
          ref={ref}
          id={checkboxId}
          checked={checked}
          onCheckedChange={onCheckedChange}
          className={className}
          {...props}
        />
        <div className="flex flex-col">
          {label && (
            <label
              htmlFor={checkboxId}
              className="font-normal leading-relaxed cursor-pointer text-text-primary"
            >
              {label}
            </label>
          )}
          {description && (
            <span className="mt-1 text-sm text-gray-500">{description}</span>
          )}
        </div>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
