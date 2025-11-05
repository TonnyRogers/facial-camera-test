import React from 'react';
import { VariantProps } from 'class-variance-authority';
import { checkListVariants } from './index';

export interface CheckListItem {
  id: string;
  label: string;
  description?: string;
  isCompleted?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
}

export interface CheckListProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof checkListVariants> {
  items: CheckListItem[];
  selectedItems?: string[];
  onItemToggle?: (itemId: string, isChecked: boolean) => void;
  allowMultiple?: boolean;
  showDescriptions?: boolean;
  containerClassName?: string;
}
