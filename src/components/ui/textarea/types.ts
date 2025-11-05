import React from 'react';
import { VariantProps } from 'class-variance-authority';
import { textareaVariants } from './index';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  label?: string;
  error?: string;
  helperText?: string;
  containerClassName?: string;
}
