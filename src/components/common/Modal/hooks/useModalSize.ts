'use client';

import { useEffect, useRef, useState } from 'react';

import { ModalDimensions } from '@/shared/types/modal.types';

type UseModalSizeParams = {
  isOpen: boolean;
  modalDimensions: ModalDimensions;
};

export const useModalSize = ({ isOpen, modalDimensions }: UseModalSizeParams) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [modalSize, setModalSize] = useState({ width: 0, height: 0 });

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

  return { modalRef, modalSize };
};
