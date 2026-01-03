'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { ModalDimensions, ModalPosition, ResizeStartData } from '@/shared/types/modal.types';

import { constrainPosition } from '@/shared/lib/modal';

type UseModalResizeParams = {
  modalRef: React.RefObject<HTMLDivElement>;
  modalDimensions: ModalDimensions;
  setModalDimensions: (dimensions: ModalDimensions) => void;
  position: ModalPosition;
  setPosition: (position: ModalPosition) => void;
  modalSize: { width: number; height: number };
};

export const useModalResize = ({
  modalRef,
  modalDimensions,
  setModalDimensions,
  position,
  setPosition,
  modalSize,
}: UseModalResizeParams) => {
  const [isResizing, setIsResizing] = useState(false);
  const resizeStartRef = useRef<ResizeStartData | null>(null);
  const justFinishedResizingRef = useRef(false);

  const constrain = useCallback(
    (x: number, y: number) => {
      return constrainPosition({
        position: { x, y },
        dimensions: modalDimensions,
        size: modalSize,
      });
    },
    [modalDimensions, modalSize]
  );

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!resizeStartRef.current) return;

      const deltaX = e.clientX - resizeStartRef.current.x;
      const deltaY = e.clientY - resizeStartRef.current.y;

      const minWidth = 300;
      const minHeight = 200;
      const maxWidth = typeof window !== 'undefined' ? window.innerWidth * 0.9 : 1200;
      const maxHeight = typeof window !== 'undefined' ? window.innerHeight * 0.9 : 800;

      const newWidth = Math.max(minWidth, Math.min(maxWidth, resizeStartRef.current.width + deltaX));
      const newHeight = Math.max(minHeight, Math.min(maxHeight, resizeStartRef.current.height + deltaY));

      setModalDimensions({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = (e?: MouseEvent) => {
      if (e) {
        e.stopPropagation();
        e.preventDefault();
      }
      setIsResizing(false);
      resizeStartRef.current = null;
      // Корректируем позицию после ресайза, если окно вышло за границы
      const constrained = constrain(position.x, position.y);
      if (constrained.x !== position.x || constrained.y !== position.y) {
        setPosition(constrained);
      }
      // Устанавливаем флаг, чтобы предотвратить закрытие окна при клике на overlay
      justFinishedResizingRef.current = true;
      setTimeout(() => {
        justFinishedResizingRef.current = false;
      }, 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp, true);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp, true);
    };
  }, [isResizing, position, constrain, setPosition]);

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (modalRef.current) {
      const rect = modalRef.current.getBoundingClientRect();
      resizeStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        width: rect.width,
        height: rect.height,
      };
      setIsResizing(true);
    }
  };

  return {
    isResizing,
    handleResizeStart,
    justFinishedResizingRef,
  };
};

