import { useEffect, useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { time } from 'Utils/Time';
import { sort } from 'Utils/Sort';
import api from 'Api/index';
import _ from 'lodash';

type activeTask = {
  at: number;
  userID: string;
  name: string;
  start: number;
  stop: number;
  duration: number;
};

function useHeader() {
  const defaultTask: activeTask = {
    at: 0,
    userID: '60c8be578a7a1e9f8c8edecb',
    name: '',
    start: 0,
    stop: 0,
    duration: 0,
  };

  const dispatch = useDispatch();

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
          return time.countTotalTime(endTime - startTime);
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
    if (taskName.trim() === '') {
      // TODO создать модалку с оповещалкой
      console.log('Напишите имя задачи');
      return;
    }

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
        task.start = start;
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
        prev.stop = endTime;
        prev.duration = endTime - prev.start;
        prev.at = endTime + 1000;

        const create = async () => {
          try {
            const result = await api.createTask('http://localhost:22222/api/v1/tasks', task);

            if (result.status === 'success') {
              switch (result.action) {
                case 'CREATE':
                  dispatch({ type: 'CREATE_TASK', payload: sort.sortData(result.data.tasks) });
                  break;
                default:
                  break;
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

  return {
    onInput,
    onClick,
    isTimeStarted,
    taskName,
    totalTime,
  };
}

export { useHeader };
