import React from 'react';
import { VariantProps } from 'class-variance-authority';
import { progressVariants } from './index';

export interface ProgressStep {
  id: string;
  label: string;
  status: 'completed' | 'active' | 'disabled';
}

export interface ProgressIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  steps: ProgressStep[];
  currentStep?: number;
  showLabels?: boolean;
  containerClassName?: string;
}
