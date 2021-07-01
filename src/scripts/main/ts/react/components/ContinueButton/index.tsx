import React from 'react';
import playBtn from 'Images/icons/play.svg';
import { usePresenter } from './hooks/usePresenter';

type ContinueButton = {
  name: string;
};

export const ContinueButton: React.FC<ContinueButton> = ({ name }) => {
  const [startTask] = usePresenter(name);

  return (
    <div onClick={startTask} className='task-panel__icon task-panel__icon--play'>
      <img src={playBtn} alt='Продолжить задачу' />
    </div>
  );
};
