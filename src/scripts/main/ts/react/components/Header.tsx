import React, { useEffect, useState, ChangeEvent } from 'react';
import playBtn from 'Images/icons/play.svg';
import stopBtn from 'Images/icons/stop-button.svg';
import { convertToStringFormat, createTimeObj } from '../../utils/tasks';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './../../store/index';

type activeTask = {
  userID: string;
  name: string;
  time: [
    {
      start: number;
      end: number;
    }
  ];
};

const Header: React.FC = () => {
  const defaultTask: activeTask = {
    userID: '60c8be578a7a1e9f8c8edecb',
    name: '',
    time: [
      {
        start: 0,
        end: 0,
      },
    ],
  };

  const dispatch = useDispatch();
  const taskArr = useSelector((state: RootState) => state.tasks.taskArr);

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
        task.time[0].start = start;
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
        prev.time[0].end = endTime;

        // TODO Отправка запроса в базу
        const create = async () => {
          try {
            const result = await createTask('http://localhost:22222/api/v1/tasks', task);

            // TODO Проверку на UPDATE проверять с помощью ответа от сервера, который будет присылать DELETE, UPDATE, CREATE etc
            if (result.status === 'success') {
              // TODO проверка на UPDATE
              const isTaskExist = taskArr.find(el => result.data.task._id === el._id);

              if (isTaskExist !== undefined) {
                // Таск существует
                // TODO: возможно имеет смысл сначала сделать фильтр на фронте и если таск есть, узнать его ID и отправить PATCH метод
                const index = taskArr.indexOf(isTaskExist);
                const newArr = taskArr.filter(el => el !== taskArr[index]);
                newArr.push(result.data.task);

                dispatch({ type: 'REPLACE_TASK', payload: newArr });
              } else {
                dispatch({ type: 'UPDATE_TASK', payload: result.data.task });
              }
            } else {
              // TODO обработать ошибку
            }
          } catch (error) {
            console.error(error);
          }
        };
        create();
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

    setTaskName(prev => {
      if (isTimeStarted) {
        return '';
      } else {
        return prev;
      }
    });

    // TODO Добавление таска в список тасков (dispatch)
    // TODO Очистка таска для будущей задачи
  };

  function onInput(event: ChangeEvent<HTMLInputElement>) {
    setTaskName(event.target.value);
  }

  return (
    <header className='header'>
      <div className='header__input-wrapper'>
        <input
          onInput={onInput}
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

async function createTask(url: string, data = {}) {
  // http://localhost:22222/api/v1/tasks
  const headers: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  };

  try {
    const response = await fetch(url, headers);
    return response.json();
  } catch (error) {
    console.error(error);
  }
}
