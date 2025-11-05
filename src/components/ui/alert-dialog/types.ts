import React from 'react';
import { VariantProps } from 'class-variance-authority';
import { alertDialogVariants } from './index';

export interface AlertDialogProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertDialogVariants> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  overlayClassName?: string;
  contentClassName?: string;
  showCloseButton?: boolean;
}
