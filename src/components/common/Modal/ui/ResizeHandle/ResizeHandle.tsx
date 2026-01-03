'use client';

import classes from './resize-handle.module.css';

type ResizeHandleProps = {
  onResizeStart: (e: React.MouseEvent) => void;
};

export const ResizeHandle = ({ onResizeStart }: ResizeHandleProps) => {
  return (
    <div
      className={classes.resize_handle}
      onMouseDown={onResizeStart}
      style={{ cursor: 'nwse-resize' }}
      aria-label="Resize modal"
    />
  );
};

