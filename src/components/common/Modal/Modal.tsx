'use client';

import { DndContext, DragOverlay } from '@dnd-kit/core';
import { Box, Typography } from '@mui/material';
import { NextPage } from 'next';
import { useState } from 'react';

import { ModalProps } from '@/shared/types/modal.types';

import { DraggableHeader, ModalContent, ModalHeader, ModalOverlay, ResizeHandle } from './ui';
import { useModalDrag, useModalResize, useModalSize } from './hooks';
import classes from './modal.module.css';

export const Modal: NextPage<ModalProps> = (props) => {
  const {
    isOpen,
    onClose,
    title,
    children,
    draggable = true,
    resizable = true,
    initialPosition,
    initialDimensions,
  } = props;

  const [position, setPosition] = useState(initialPosition || { x: 0, y: 0 });
  const [modalDimensions, setModalDimensions] = useState(initialDimensions || { width: 400, height: 300 });

  const { modalRef, modalSize } = useModalSize({ isOpen, modalDimensions });

  const { isDragging, activeId, constrainedPosition, sensors, handleDragStart, handleDragMove, handleDragEnd } =
    useModalDrag({
      position,
      setPosition,
      modalDimensions,
      modalSize,
    });

  const { isResizing, handleResizeStart, justFinishedResizingRef } = useModalResize({
    modalRef,
    modalDimensions,
    setModalDimensions,
    position,
    setPosition,
    modalSize,
  });

  if (!isOpen) return null;

  const modalStyle = {
    transform: `translate(${constrainedPosition.x}px, ${constrainedPosition.y}px)`,
    transition: isDragging || isResizing ? 'none' : 'transform 0.2s ease',
    width: `${modalDimensions.width}px`,
    height: `${modalDimensions.height}px`,
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    // Игнорируем клик, если только что закончили ресайз
    if (justFinishedResizingRef.current) {
      e.stopPropagation();
      return;
    }
    onClose();
  };

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragMove={handleDragMove} onDragEnd={handleDragEnd}>
      <ModalOverlay onClick={handleOverlayClick}>
        <Box
          ref={modalRef}
          className={classes.modal}
          style={modalStyle}
          onClick={(e) => e.stopPropagation()}
          sx={{
            opacity: isDragging ? 0.9 : 1,
            transition: isDragging ? 'none' : 'opacity 0.2s ease',
          }}
        >
          {draggable ? (
            <DraggableHeader id="modal" title={title} onClose={onClose} isDragging={isDragging} />
          ) : (
            <ModalHeader title={title} onClose={onClose} />
          )}
          <ModalContent>{children}</ModalContent>
          {resizable && <ResizeHandle onResizeStart={handleResizeStart} />}
        </Box>
      </ModalOverlay>
      <DragOverlay>
        {activeId ? (
          <Box className={classes.modal_overlay} sx={{ opacity: 0.5 }}>
            <Box className={classes.modal_header}>
              <div className={classes.drag_handle_icon}>⋮⋮</div>
              {title && (
                <Typography variant="h6" className={classes.modal_title}>
                  {title}
                </Typography>
              )}
              <button className={classes.close_button} aria-label="Close modal">
                ×
              </button>
            </Box>
          </Box>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
