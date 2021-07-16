import React, { memo, useEffect } from 'react';
import playBtn from 'Images/icons/play.svg';
import { usePresenter } from './hooks/usePresenter';

type ContinueButton = {
  name: string;
  isActive: boolean;
};

// memo стоит на true, чтобы кнопка продолжения не рендерилась при изменении имени таска
export const ContinueButton = memo<ContinueButton>(({ name, isActive }) => {
  const [startTask] = usePresenter(name);

  useEffect(() => console.log('Render[ContinueButton]'));

  return (
    <div onClick={startTask} className={`task-panel__icon task-panel__icon--play ${isActive && 'disabled'}`}>
      <img src={playBtn} alt='Продолжить задачу' />
    </div>
  );
});
