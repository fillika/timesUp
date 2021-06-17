import React, { useEffect, useState, ChangeEvent } from 'react';
import playBtn from 'Images/icons/play.svg';
import stopBtn from 'Images/icons/stop-button.svg';
import { convertToStringFormat, createTimeObj } from '../../utils/tasks';

type activeTask = {
  userID: string;
  name: string;
  time: {
    start: number;
    end: number;
  };
};

const Header: React.FC = () => {
  const defaultTask: activeTask = {
    userID: '60c8be578a7a1e9f8c8edecb',
    name: '',
    time: {
      start: 0,
      end: 0,
    },
  };

  const [taskName, setTaskName] = useState('');
  const [isTimeStarted, setTimeStarted] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [totalTime, setTotalTime] = useState('0:00:00');
  const [task, setTask] = useState<activeTask>(defaultTask);

  useEffect(() => {
    let timeoutID = setTimeout(() => {
      setEndTime(prev => {
        if (isTimeStarted) {
          return new Date().getTime();
        } else {
          return prev;
        }
      });

      setTotalTime(prev => {
        if (isTimeStarted) {
          return convertToStringFormat(createTimeObj(endTime - startTime));
        } else {
          return prev;
        }
      });
    }, 1000);

    return () => {
      clearTimeout(timeoutID);
    };
  }, [startTime, endTime]);

  const onClick = () => {
    setTimeStarted(!isTimeStarted);
    const start = new Date().getTime();
    const endTime = new Date().getTime();

    // Установка даты начала
    setStartTime(() => {
      if (isTimeStarted) {
        return 0;
      } else {
        return start;
      }
    });

    setTask(task => {
      if (isTimeStarted) {
        return task;
      } else {
        task.time.start = start;
        task.name = taskName;
        return task;
      }
    });

    setEndTime(prev => {
      if (isTimeStarted) {
        return 0;
      } else {
        return new Date().getTime();
      }
    });

    // Установка даты конца
    setTask(prev => {
      if (isTimeStarted) {
        prev.time.end = endTime;
        return prev;
      }
      return prev;
    });

    setTotalTime(prev => {
      if (isTimeStarted) {
        return '0:00:00';
      } else {
        return prev;
      }
    });

    // TODO Отправка запроса в базу и очистка таска для новой задачи
  };

  function onInput() {}

  return (
    <header className='header'>
      <div className='header__input-wrapper'>
        <input
          onInput={(event: ChangeEvent<HTMLInputElement>) => setTaskName(event.target.value)}
          value={taskName}
          className='header__input'
          placeholder='Create your task'
          type='text'
          disabled={isTimeStarted}
        />
      </div>

      <div className='header__panel header-panel'>
        <div>
          <div>{totalTime}</div>
        </div>
        <div className='header__button-wrapper'>
          <button onClick={onClick} className='header__button header__button--play'>
            <img src={!isTimeStarted ? playBtn : stopBtn} alt='Иконка' />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
