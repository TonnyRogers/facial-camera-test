import React from 'react';
import { VariantProps } from 'class-variance-authority';
import { fileCardVariants } from './index';

export interface FileCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof fileCardVariants> {
  fileName: string;
  fileSize?: string;
  fileType?: string;
  uploadDate?: string;
  isSelected?: boolean;
  isUploaded?: boolean;
  hasError?: boolean;
  isDisabled?: boolean;
  onSelect?: () => void;
  onRemove?: () => void;
  showActions?: boolean;
  containerClassName?: string;
}
