import React, { FC } from 'react';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';

export const DeleteIcon: FC<{ isTyping: boolean; onClickHandler: () => void }> = ({ isTyping, onClickHandler }) => {
  return (
    <IconButton
      style={{ minWidth: 50, width: 50, height: 50, padding: 8 }}
      onClick={onClickHandler}
      disabled={isTyping}
      title='Delete task'>
      <DeleteForeverIcon style={{ width: '1.5em', height: '1.5em' }} />
    </IconButton>
  );
};
