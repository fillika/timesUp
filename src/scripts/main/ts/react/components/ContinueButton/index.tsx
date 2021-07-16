import React, { memo, useMemo } from 'react';
import playBtn from 'Images/icons/play.svg';
import { usePresenter } from './hooks/usePresenter';
import { useSelector } from 'react-redux';
import { RootState } from 'Redux/reducers/rootReducer';

type ContinueButton = {
  name: string;
};

// memo стоит на true, чтобы кнопка продолжения не рендерилась при изменении имени таска
export const ContinueButton = memo<ContinueButton>(
  ({ name }) => {    const { isTimeActive } = useSelector((state: RootState) => state.activeTask);
    const [startTask] = usePresenter(name);

    console.log('Render[ContinueButton]');

    return (
      <div
        onClick={startTask}
        className={`task-panel__icon task-panel__icon--play ${isTimeActive && 'disabled'}`}>
        <img src={playBtn} alt='Продолжить задачу' />
      </div>
    );
  },
  (prev, next) => {
    return true
  }
);
