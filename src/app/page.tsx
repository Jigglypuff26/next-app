'use client';

import { Header, Modal } from '@/components/common';
import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Header />
      <div>
        <Box sx={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
          <Typography variant="h2" sx={{ marginBottom: '20px' }}>
            Демонстрация модального окна
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Button variant="contained" onClick={() => setIsModalOpen(true)} sx={{ width: 'fit-content' }}>
              Открыть модальное окно с DnD
            </Button>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Нажмите на кнопку выше, чтобы открыть модальное окно с возможностью перетаскивания.
              Перетащите окно за заголовок, чтобы переместить его по экрану.
            </Typography>
          </Box>
        </Box>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Модальное окно с Drag and Drop"
        draggable={true}
        initialPosition={{ x: 0, y: 0 }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Typography variant="body1">
            Это демонстрация модального окна с поддержкой drag and drop, созданного с использованием библиотеки
            @dnd-kit.
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            <strong>Возможности:</strong>
          </Typography>
          <Box component="ul" sx={{ margin: 0, paddingLeft: '20px' }}>
            <li>Перетаскивание окна за заголовок</li>
            <li>Закрытие по клику вне окна или на кнопку ×</li>
            <li>Адаптивный дизайн для мобильных устройств</li>
            <li>Визуальная обратная связь при перетаскивании</li>
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary', marginTop: '8px' }}>
            Попробуйте перетащить это окно за заголовок!
          </Typography>
          <Button variant="outlined" onClick={() => setIsModalOpen(false)} sx={{ marginTop: '16px' }}>
            Закрыть
          </Button>
        </Box>
      </Modal>
    </>
  );
}
