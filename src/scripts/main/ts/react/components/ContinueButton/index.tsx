import React from 'react';
import playBtn from 'Images/icons/play.svg';
import { usePresenter } from './hooks/usePresenter';
import { useSelector } from 'react-redux';
import { RootState } from 'Redux/rootReducer';

type ContinueButton = {
  name: string;
};

export const ContinueButton: React.FC<ContinueButton> = ({ name }) => {
  const { activeTask } = useSelector((state: RootState) => state);
  const [startTask] = usePresenter(name);

  return (
    <div
      onClick={startTask}
      className={`task-panel__icon task-panel__icon--play ${activeTask.isTimeActive && 'disabled'}`}>
      <img src={playBtn} alt='Продолжить задачу' />
    </div>
  );
};
