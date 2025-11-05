import { forwardRef, useImperativeHandle, useRef } from 'react';
import { cva } from 'class-variance-authority';
import { Controller } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { useMask } from '@/hooks/use-mask';
import { getMaskPlaceholder } from '@/lib/mask-utils';
import type { InputProps } from './types';

export interface MaskedInputRef {
  getUnmaskedValue: () => string;
}

export const inputVariants = cva(
  'flex w-full rounded-md border bg-white px-4 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-lightGray focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-borderGray focus:border-primary',
        error: 'border-feedback-red-500 focus:border-feedback-red-500',
      },
      size: {
        default: 'h-12',
        sm: 'h-8',
        lg: 'h-16',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

// Internal input component that handles masking
const InputInternal = forwardRef<HTMLInputElement & MaskedInputRef, InputProps>(
  (
    {
      className,
      variant,
      size,
      label,
      error,
      mask,
      onUnmaskedChange,
      onMaskComplete,
      onChange,
      placeholder,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const { maskedValue, handleChange, handleKeyDown, getUnmaskedValue } =
      useMask({
        mask,
        value: (props.value as string) || '',
        onChange: (masked, unmasked) => {
          // Call the original onChange with the masked value
          if (onChange) {
            // Create a synthetic event for compatibility
            const syntheticEvent = {
              target: { value: masked },
              currentTarget: { value: masked },
            } as React.ChangeEvent<HTMLInputElement>;
            onChange(syntheticEvent);
          }

          // Call the unmasked change callback
          onUnmaskedChange?.(unmasked);
        },
        onComplete: onMaskComplete,
      });

    useImperativeHandle(ref, () => ({
      ...inputRef.current!,
      getUnmaskedValue,
    }));

    const inputPlaceholder =
      placeholder || (mask ? getMaskPlaceholder(mask) : undefined);

    if (!mask) {
      return (
        <div className="w-full">
          {label && (
            <label className="block mb-2 text-sm font-medium text-darkGray">
              {label}
            </label>
          )}
          <input
            className={cn(
              inputVariants({
                variant: error ? 'error' : variant,
                size,
                className,
              })
            )}
            ref={inputRef}
            placeholder={inputPlaceholder}
            onChange={onChange}
            {...props}
          />
          {error && (
            <p className="mt-1 text-sm text-feedback-red-500">{error}</p>
          )}
        </div>
      );
    }

    return (
      <div className="w-full">
        {label && (
          <label className="block mb-2 text-sm font-medium text-darkGray">
            {label}
          </label>
        )}
        <input
          className={cn(
            inputVariants({
              variant: error ? 'error' : variant,
              size,
              className,
            })
          )}
          ref={inputRef}
          type={props.type}
          name={props.name}
          value={maskedValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={inputPlaceholder}
          aria-describedby={mask ? `mask-description-${mask}` : undefined}
          disabled={props.disabled}
          required={props.required}
          autoComplete={props.autoComplete}
        />
        {error && <p className="mt-1 text-sm text-feedback-red-500">{error}</p>}
      </div>
    );
  }
);

// Main Input component that automatically detects if it should use Controller
export const Input = forwardRef<HTMLInputElement & MaskedInputRef, InputProps>(
  (props, ref) => {
    const { control, name, ...inputProps } = props;

    // If control and name are provided, use Controller
    if (control && name) {
      return (
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState }) => (
            <InputInternal
              {...inputProps}
              {...field}
              error={fieldState.error?.message || inputProps.error}
              ref={ref}
            />
          )}
        />
      );
    }

    // Otherwise, use the internal component directly
    return <InputInternal {...inputProps} ref={ref} />;
  }
);

Input.displayName = 'Input';
export type { InputProps };
