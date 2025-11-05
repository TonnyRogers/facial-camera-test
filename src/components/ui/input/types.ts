import { InputHTMLAttributes, ChangeEvent } from 'react';
import { VariantProps } from 'class-variance-authority';
import { Control } from 'react-hook-form';
import { inputVariants } from './index';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  mask?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onUnmaskedChange?: (value: string) => void;
  onMaskComplete?: (value: string, unmaskedValue: string) => void;
  // React Hook Form integration
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any>;
  name?: string;
}
