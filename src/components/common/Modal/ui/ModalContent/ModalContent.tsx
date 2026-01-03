'use client';

import { Box } from '@mui/material';
import { ReactNode } from 'react';

import classes from './modal-content.module.css';

type ModalContentProps = {
  children: ReactNode;
};

export const ModalContent = ({ children }: ModalContentProps) => {
  return <Box className={classes.modal_content}>{children}</Box>;
};
