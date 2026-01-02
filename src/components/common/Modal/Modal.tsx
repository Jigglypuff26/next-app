'use client';

import { DndContext, DragEndEvent, DragMoveEvent, DragOverlay, DragStartEvent, PointerSensor, useDraggable, useSensor, useSensors } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Box, Typography } from '@mui/material';
import { NextPage } from 'next';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';

import classes from './modal.module.css';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  draggable?: boolean;
  initialPosition?: { x: number; y: number };
};

const DraggableHeader = ({
  id,
  title,
  onClose,
  isDragging,
}: {
  id: string;
  title?: string;
  onClose: () => void;
  isDragging: boolean;
}) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `modal-${id}`,
  });

  return (
    <Box
      ref={setNodeRef}
      className={`${classes.modal_header} ${isDragging ? classes.dragging : ''}`}
      {...listeners}
      {...attributes}
    >
      <div className={classes.drag_handle_icon}>⋮⋮</div>
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
};

export const Modal: NextPage<ModalProps> = (props) => {
  const { isOpen, onClose, title, children, draggable = true, initialPosition } = props;
  const [position, setPosition] = useState(initialPosition || { x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [dragDelta, setDragDelta] = useState({ x: 0, y: 0 });
  const modalRef = useRef<HTMLDivElement>(null);
  const [modalSize, setModalSize] = useState({ width: 0, height: 0 });
  const [modalDimensions, setModalDimensions] = useState({ width: 400, height: 300 });
  const [isResizing, setIsResizing] = useState(false);
  const resizeStartRef = useRef<{ x: number; y: number; width: number; height: number } | null>(null);
  const justFinishedResizingRef = useRef(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Функция для ограничения позиции в пределах окна
  const constrainPosition = useCallback(
    (x: number, y: number) => {
      const width = modalDimensions.width || modalSize.width;
      const height = modalDimensions.height || modalSize.height;

      if (width === 0 || height === 0) {
        return { x, y };
      }

      const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
      const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 0;

      // Модальное окно центрируется через flexbox, transform применяется относительно центра
      // Максимальное смещение = (размер окна - размер модального окна) / 2
      const maxOffsetX = (windowWidth - width) / 2;
      const maxOffsetY = (windowHeight - height) / 2;

      // Ограничиваем смещение, чтобы модальное окно не выходило за границы
      const constrainedX = Math.max(-maxOffsetX, Math.min(maxOffsetX, x));
      const constrainedY = Math.max(-maxOffsetY, Math.min(maxOffsetY, y));

      return {
        x: constrainedX,
        y: constrainedY,
      };
    },
    [modalDimensions.width, modalDimensions.height, modalSize.width, modalSize.height]
  );

  // Получаем размеры модального окна
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const updateSize = () => {
        if (modalRef.current) {
          const rect = modalRef.current.getBoundingClientRect();
          setModalSize({ width: rect.width, height: rect.height });
        }
      };
      updateSize();
      window.addEventListener('resize', updateSize);
      return () => window.removeEventListener('resize', updateSize);
    }
  }, [isOpen, modalDimensions]);

  // Обработчики для ресайза
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
      const constrained = constrainPosition(position.x, position.y);
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
    window.addEventListener('mouseup', handleMouseUp, true); // Используем capture phase

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp, true);
    };
  }, [isResizing, position, constrainPosition]);

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

  if (!isOpen) return null;

  const handleDragStart = (event: DragStartEvent) => {
    setIsDragging(true);
    setActiveId(event.active.id as string);
    setDragDelta({ x: 0, y: 0 });
  };

  const handleDragMove = (event: DragMoveEvent) => {
    if (event.delta) {
      const newX = position.x + event.delta.x;
      const newY = position.y + event.delta.y;
      const constrained = constrainPosition(newX, newY);
      
      setDragDelta({
        x: constrained.x - position.x,
        y: constrained.y - position.y,
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setIsDragging(false);
    setActiveId(null);
    const { delta } = event;
    if (delta) {
      const newX = position.x + delta.x;
      const newY = position.y + delta.y;
      const constrained = constrainPosition(newX, newY);
      setPosition(constrained);
    }
    setDragDelta({ x: 0, y: 0 });
  };

  const currentX = position.x + dragDelta.x;
  const currentY = position.y + dragDelta.y;
  const constrained = constrainPosition(currentX, currentY);

  const modalStyle = {
    transform: `translate(${constrained.x}px, ${constrained.y}px)`,
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
      <div className={classes.overlay} onClick={handleOverlayClick}>
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
            <Box className={classes.modal_header}>
              {title && (
                <Typography variant="h6" className={classes.modal_title}>
                  {title}
                </Typography>
              )}
              <button className={classes.close_button} onClick={onClose} aria-label="Close modal">
                ×
              </button>
            </Box>
          )}
          <Box className={classes.modal_content}>{children}</Box>
          <div
            className={classes.resize_handle}
            onMouseDown={handleResizeStart}
            style={{ cursor: 'nwse-resize' }}
            aria-label="Resize modal"
          />
        </Box>
      </div>
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

