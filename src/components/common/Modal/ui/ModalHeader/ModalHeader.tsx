'use client';

import { Box, Typography } from '@mui/material';
import { forwardRef, ReactNode } from 'react';

import classes from './modal-header.module.css';

type ModalHeaderProps = {
  title?: string;
  onClose: () => void;
  children?: ReactNode;
  className?: string;
  [key: string]: unknown;
};

export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ title, onClose, children, className = '', ...props }, ref) => {
    return (
      <Box ref={ref} className={`${classes.modal_header} ${className}`} {...props}>
        {children}
        {title && (
          <Typography variant="h6" className={classes.modal_title}>
            {title}
          </Typography>
        )}
        <button
          className={classes.close_button}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close modal"
        >
          ×
        </button>
      </Box>
    );
  }
);

ModalHeader.displayName = 'ModalHeader';

