'use client';

import { ReactNode } from 'react';

import classes from './modal-overlay.module.css';

type ModalOverlayProps = {
  children: ReactNode;
  onClick: (e: React.MouseEvent) => void;
};

export const ModalOverlay = ({ children, onClick }: ModalOverlayProps) => {
  return (
    <div className={classes.overlay} onClick={onClick}>
      {children}
    </div>
  );
};
