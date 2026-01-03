'use client';

import { useDraggable } from '@dnd-kit/core';
import { ModalHeader } from '../ModalHeader';

import classes from './draggable-header.module.css';

type DraggableHeaderProps = {
  id: string;
  title?: string;
  onClose: () => void;
  isDragging: boolean;
};

export const DraggableHeader = ({ id, title, onClose, isDragging }: DraggableHeaderProps) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `modal-${id}`,
  });

  return (
    <ModalHeader
      ref={setNodeRef}
      title={title}
      onClose={onClose}
      className={isDragging ? classes.dragging : ''}
      {...listeners}
      {...attributes}
    >
      <div className={classes.drag_handle_icon}>⋮⋮</div>
    </ModalHeader>
  );
};

