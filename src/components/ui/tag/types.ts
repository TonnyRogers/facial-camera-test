import React from 'react';
import { VariantProps } from 'class-variance-authority';
import { tagVariants } from './index';

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  children: React.ReactNode;
}
