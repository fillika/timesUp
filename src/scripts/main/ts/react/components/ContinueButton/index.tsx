import React, { memo, useEffect } from 'react';
import playBtn from 'Images/icons/play.svg';
import { usePresenter } from './hooks/usePresenter';

type ContinueButton = {
  name: string;
};

// memo стоит на true, чтобы кнопка продолжения не рендерилась при изменении имени таска
export const ContinueButton = memo<ContinueButton>(({ name }) => {
  const [startTask, isTimeActive] = usePresenter(name);

  useEffect(() => console.log('Render[ContinueButton]'));

  return (
    <div onClick={startTask} className={`task-panel__icon task-panel__icon--play ${isTimeActive && 'disabled'}`}>
      <img src={playBtn} alt='Продолжить задачу' />
    </div>
  );
});
