import React, { useEffect, useState } from 'react';
import playBtn from 'Images/icons/play.svg';
import stopBtn from 'Images/icons/stop-button.svg';
import { convertToStringFormat, createTimeObj } from '../../utils/tasks';

type activeTask = {
  time: {
    start: number;
    end: number;
  };
};

const Header: React.FC = () => {
  const defaultTask: activeTask = {
    time: {
      start: 0,
      end: 0,
    },
  };

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

    setStartTime(() => {
      if (isTimeStarted) {
        return 0;
      } else {
        const start = new Date().getTime();
        const newTask = {
          time: {
            start: start,
            end: task.time.end,
          },
        };

        setTask(newTask);
        return start;
      }
    });

    setEndTime(prev => {
      if (isTimeStarted) {
        setTask(prev => {
          prev.time.end = endTime;
          return prev;
        });

        return 0;
      } else {
        return new Date().getTime();
      }
    });

    setTotalTime(prev => {
      if (isTimeStarted) {
        return '0:00:00';
      } else {
        return prev;
      }
    });
  };

  return (
    <header className='header'>
      <div className='header__input-wrapper'>
        <input className='header__input' type='text' placeholder='Напишите задачу' />
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
