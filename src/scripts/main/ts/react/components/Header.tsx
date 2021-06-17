import React, { useEffect, useState } from 'react';
import playBtn from 'Images/icons/play.svg';
import stopBtn from 'Images/icons/stop-button.svg';
import { convertToStringFormat, createTimeObj } from '../../utils/tasks';

type activeTask = {
  status: string;
  time: {
    start: number;
    end: number;
  };
};

const Header: React.FC = () => {
  // TODO разбить логику. Создать отдельно таймер, который будет заниматься подсчетом времени
  // TODO Потом обновлять объект task
  const defaultTask: activeTask = {
    status: 'non-active',
    time: {
      start: 0,
      end: 0,
    },
  };

  const [status, setStatus] = useState(false);
  const [task, setTask] = useState<activeTask>(defaultTask);

  useEffect(() => {
    return () => {};
  }, [task]);

  const onClick = () => {
    setStatus(!status);
  };

  const currentTime = convertToStringFormat(createTimeObj(task.time.end - task.time.start));

  return (
    <header className='header'>
      <div className='header__input-wrapper'>
        <input className='header__input' type='text' placeholder='Напишите задачу' />
      </div>

      <div className='header__panel header-panel'>
        <div>
          <div>{task !== null ? currentTime : '00:00:00'}</div>
        </div>
        <div className='header__button-wrapper'>
          <button onClick={onClick} className='header__button header__button--play'>
            <img src={!status ? playBtn : stopBtn} alt='Иконка' />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
