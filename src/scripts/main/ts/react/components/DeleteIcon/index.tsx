import React, { FC } from 'react';
import trashIcon from 'Images/icons/trash.svg';

export const DeleteIcon: FC<{ isTyping: boolean; onClickHandler: () => void }> = ({ isTyping, onClickHandler }) => {
  return (
    <div onClick={onClickHandler} className={`task-panel__icon task-panel__icon--delete ${isTyping && 'disabled'}`}>
      <img src={trashIcon} alt='Удалить таск' />
    </div>
  );
};
