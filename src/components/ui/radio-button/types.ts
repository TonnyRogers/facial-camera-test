import React from 'react';
import { VariantProps } from 'class-variance-authority';
import { radioVariants } from './index';

export interface RadioButtonProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof radioVariants> {
  label?: string;
  description?: string;
  containerClassName?: string;
}
