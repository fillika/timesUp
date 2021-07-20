import React, { FC } from 'react';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';

export const DeleteIcon: FC<{ isTyping: boolean; onClickHandler: () => void }> = ({ isTyping, onClickHandler }) => {
  return (
    <div style={{ minWidth: 50, width: 50 }}>
      <IconButton onClick={onClickHandler} disabled={isTyping} title='Delete task'>
        <DeleteForeverIcon />
      </IconButton>
    </div>
  );
};
