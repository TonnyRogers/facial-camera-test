import React from 'react';
import { VariantProps } from 'class-variance-authority';
import { timeSlotVariants } from './index';

export interface TimeSlotProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof timeSlotVariants> {
  time: string;
  date?: string;
  isSelected?: boolean;
  isDisabled?: boolean;
  isUnavailable?: boolean;
  containerClassName?: string;
}
