import React from 'react';
import { VariantProps } from 'class-variance-authority';
import { cardVariants } from './index';

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
}
