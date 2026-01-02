'use client';

import { Button } from '@mui/material';
import { useState } from 'react';

import { Modal } from './Modal';

/**
 * Пример использования компонента Modal с drag and drop
 */
export const ModalExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setIsOpen(true)}>
        Открыть модальное окно
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Пример модального окна"
        draggable={true}
        initialPosition={{ x: 0, y: 0 }}
      >
        <div>
          <p>Это пример модального окна с поддержкой drag and drop.</p>
          <p>Перетащите окно за заголовок, чтобы переместить его.</p>
          <p>Вы можете закрыть окно, нажав на кнопку × или кликнув вне окна.</p>
        </div>
      </Modal>
    </>
  );
};

