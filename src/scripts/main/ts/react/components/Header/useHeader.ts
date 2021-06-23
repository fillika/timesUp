import { useEffect, useState, ChangeEvent, KeyboardEvent, Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import { time } from 'Utils/Time';
import { sort } from 'Utils/Sort';
import { SortedTask } from 'Types/tasks';
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
  const dispatch = useDispatch();
  const defaultTask: activeTask = {
    at: 0,
    userID: '60c8be578a7a1e9f8c8edecb',
    name: '',
    start: 0,
    stop: 0,
    duration: 0,
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

  const onClick = () => taskHandler();
  const onKeyPress = (event: KeyboardEvent) => event.key === 'Enter' && taskHandler();
  const onInput = (event: ChangeEvent<HTMLInputElement>) => setTaskName(event.target.value);

  function taskHandler() {
    if (taskName.trim() === '') {
      // TODO создать модалку с оповещалкой
      console.log('Напишите имя задачи');
      return;
    }

    setTimeStarted(!isTimeStarted);
    const start = new Date().getTime();
    const endTime = new Date().getTime();

    // Установка даты начала
    setStartTime(() => (isTimeStarted ? 0 : start));
    setTask(task => {
      if (isTimeStarted) {
        return task;
      } else {
        task.start = start;
        task.name = taskName;
        return task;
      }
    });
    setEndTime(() => (isTimeStarted ? 0 : new Date().getTime()));
    // Установка даты конца
    setTask(prev => {
      if (isTimeStarted) {
        prev.stop = endTime;
        prev.duration = endTime - prev.start;
        prev.at = endTime + 1000;

        createTask(task, dispatch);
        return prev;
      }
      return prev;
    });
    setTotalTime(prev => (isTimeStarted ? '0:00:00' : prev));
    setTaskName(prev => (isTimeStarted ? '' : prev));
  }

  return {
    onInput,
    onClick,
    isTimeStarted,
    taskName,
    totalTime,
    onKeyPress,
  };
}

export { useHeader };

// utils handlers
async function createTask(task: activeTask, dispatch: Dispatch<{ type: string; payload: SortedTask[] }>) {
  try {
    const result = await api.createTask(task);

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
}
