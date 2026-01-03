import { ModalDimensions, ModalPosition, ModalSize } from '@/shared/types/modal.types';

type ConstrainPositionParams = {
  position: ModalPosition;
  dimensions: ModalDimensions;
  size: ModalSize;
};

export const constrainPosition = ({
  position,
  dimensions,
  size,
}: ConstrainPositionParams): ModalPosition => {
  const width = dimensions.width || size.width;
  const height = dimensions.height || size.height;

  if (width === 0 || height === 0) {
    return position;
  }

  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
  const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 0;

  // Модальное окно центрируется через flexbox, transform применяется относительно центра
  // Максимальное смещение = (размер окна - размер модального окна) / 2
  const maxOffsetX = (windowWidth - width) / 2;
  const maxOffsetY = (windowHeight - height) / 2;

  // Ограничиваем смещение, чтобы модальное окно не выходило за границы
  const constrainedX = Math.max(-maxOffsetX, Math.min(maxOffsetX, position.x));
  const constrainedY = Math.max(-maxOffsetY, Math.min(maxOffsetY, position.y));

  return {
    x: constrainedX,
    y: constrainedY,
  };
};
