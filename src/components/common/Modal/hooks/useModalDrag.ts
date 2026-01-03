'use client';

import {
  DragEndEvent,
  DragMoveEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useCallback, useState } from 'react';

import { ModalPosition } from '@/shared/types/modal.types';

import { constrainPosition } from '@/shared/lib/modal';

type UseModalDragParams = {
  position: ModalPosition;
  setPosition: (position: ModalPosition) => void;
  modalDimensions: { width: number; height: number };
  modalSize: { width: number; height: number };
};

export const useModalDrag = ({
  position,
  setPosition,
  modalDimensions,
  modalSize,
}: UseModalDragParams) => {
  const [isDragging, setIsDragging] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [dragDelta, setDragDelta] = useState<ModalPosition>({ x: 0, y: 0 });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

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

  const handleDragStart = (event: DragStartEvent) => {
    setIsDragging(true);
    setActiveId(event.active.id as string);
    setDragDelta({ x: 0, y: 0 });
  };

  const handleDragMove = (event: DragMoveEvent) => {
    if (event.delta) {
      const newX = position.x + event.delta.x;
      const newY = position.y + event.delta.y;
      const constrained = constrain(newX, newY);

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
      const constrained = constrain(newX, newY);
      setPosition(constrained);
    }
    setDragDelta({ x: 0, y: 0 });
  };

  const currentPosition = {
    x: position.x + dragDelta.x,
    y: position.y + dragDelta.y,
  };

  const constrainedPosition = constrain(currentPosition.x, currentPosition.y);

  return {
    isDragging,
    activeId,
    constrainedPosition,
    sensors,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
  };
};
