import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import type { FileCardProps } from './types';

export const fileCardVariants = cva(
  'flex items-center p-4 border rounded-lg transition-all duration-200',
  {
    variants: {
      variant: {
        default:
          'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm',
        selected: 'border-primary-500 bg-primary-50 ring-2 ring-primary-200',
        uploaded: 'border-success-200 bg-success-50',
        error: 'border-error-200 bg-error-50',
        disabled: 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed',
      },
      size: {
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const iconVariants = cva('flex-shrink-0 rounded-lg p-2', {
  variants: {
    variant: {
      default: 'bg-gray-100 text-gray-600',
      selected: 'bg-primary-100 text-primary-600',
      uploaded: 'bg-success-100 text-success-600',
      error: 'bg-error-100 text-error-600',
      disabled: 'bg-gray-100 text-gray-400',
    },
    size: {
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-12 h-12',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

export const FileCard = React.forwardRef<HTMLDivElement, FileCardProps>(
  (
    {
      className,
      variant,
      size,
      fileName,
      fileSize,
      fileType,
      uploadDate,
      isSelected = false,
      isUploaded = false,
      hasError = false,
      isDisabled = false,
      onSelect,
      onRemove,
      showActions = true,
      containerClassName,
      ...props
    },
    ref
  ) => {
    const getVariant = () => {
      if (isDisabled) return 'disabled';
      if (hasError) return 'error';
      if (isUploaded) return 'uploaded';
      if (isSelected) return 'selected';
      return variant || 'default';
    };

    const getIconVariant = () => {
      if (isDisabled) return 'disabled';
      if (hasError) return 'error';
      if (isUploaded) return 'uploaded';
      if (isSelected) return 'selected';
      return 'default';
    };

    const getFileIcon = () => {
      if (hasError) {
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        );
      }
      if (isUploaded) {
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        );
      }
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
            clipRule="evenodd"
          />
        </svg>
      );
    };

    return (
      <div
        className={cn(
          fileCardVariants({ variant: getVariant(), size, className }),
          containerClassName
        )}
        ref={ref}
        onClick={!isDisabled && onSelect ? onSelect : undefined}
        {...props}
      >
        <div className={cn(iconVariants({ variant: getIconVariant(), size }))}>
          {getFileIcon()}
        </div>

        <div className="flex-1 ml-3 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900 truncate">
              {fileName}
            </h3>
            {showActions && onRemove && !isDisabled && (
              <button
                onClick={e => {
                  e.stopPropagation();
                  onRemove();
                }}
                className="ml-2 p-1 text-gray-400 hover:text-error-600 transition-colors"
                aria-label="Remover arquivo"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>

          <div className="flex items-center text-xs text-gray-500 mt-1">
            {fileType && <span className="mr-2">{fileType}</span>}
            {fileSize && <span className="mr-2">{fileSize}</span>}
            {uploadDate && <span>{uploadDate}</span>}
          </div>
        </div>
      </div>
    );
  }
);

FileCard.displayName = 'FileCard';

export { iconVariants };
export type { FileCardProps };
