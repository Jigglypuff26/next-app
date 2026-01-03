import { ReactNode } from 'react';

export type ModalPosition = {
  x: number;
  y: number;
};

export type ModalDimensions = {
  width: number;
  height: number;
};

export type ModalSize = {
  width: number;
  height: number;
};

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  draggable?: boolean;
  resizable?: boolean;
  initialPosition?: ModalPosition;
  initialDimensions?: ModalDimensions;
};

export type ResizeStartData = {
  x: number;
  y: number;
  width: number;
  height: number;
};
