import { useEffect, useState, ChangeEvent, KeyboardEvent, Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeTaskState } from 'Redux/activeTask';
import { RootState } from 'Redux/index';
import { time } from 'Utils/Time';
import { sort } from 'Utils/Sort';
import { SortedTask } from 'Types/tasks';
import api from 'Api/index';
import _ from 'lodash';

function useHeader() {
  const dispatch = useDispatch();
  const activeTask = useSelector((state: RootState) => state.activeTask);

  const taskFromServer: activeTaskState = {
    at: 0,
    userID: '60c8be578a7a1e9f8c8edecb',
    name: 'Long task',
    start: 1624435091000,
    stop: 0,
    duration: 0,
  };

  const [isTimeStarted, setTimeStarted] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [totalTime, setTotalTime] = useState('0:00:00');

  // Todo переделать всю логику под Redux.
  // Переменная state обновляется после рендера. Нужно 
  useEffect(() => {
    dispatch({ type: 'SET_ACTIVE_TASK', payload: taskFromServer });
    // setTimeStarted(!isTimeStarted);
    // startTimer(activeTask.start);
  }, []);

  useEffect(() => {
    if (activeTask.duration > 0) {
      createTask(activeTask, dispatch);
      dispatch({ type: 'UPDATE_ACTIVE_TASK_NAME', payload: '' });
    }
  }, [activeTask.duration]);

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
  const onInput = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'UPDATE_ACTIVE_TASK_NAME',
      payload: event.target.value,
    });
  };

  function startTimer(start: number) {
    setStartTime(start);
    setEndTime(new Date().getTime()); // Устанавливаю равное старту, так как при инициализации время в большой минус уходит

    dispatch({
      type: 'UPDATE_ACTIVE_TASK_START',
      payload: start,
    });
  }

  function stopTimer() {
    const endTime = new Date().getTime();

    dispatch({
      type: 'UPDATE_ACTIVE_TASK_TIME',
      payload: {
        stop: endTime,
        duration: endTime - activeTask.start,
        at: endTime + 1000,
      },
    });

    setTotalTime('0:00:00');
  }

  function taskHandler() {
    if (activeTask.name.trim() === '') {
      // TODO создать модалку с оповещалкой
      console.log('Напишите имя задачи');
      return;
    }

    setTimeStarted(!isTimeStarted);

    if (!isTimeStarted) {
      const start = new Date().getTime();
      startTimer(start);
    } else {
      stopTimer();
    }
  }

  return {
    onInput,
    onClick,
    isTimeStarted,
    activeTask,
    totalTime,
    onKeyPress,
  };
}

export { useHeader };

// utils handlers
async function createTask(task: activeTaskState, dispatch: Dispatch<{ type: string; payload: SortedTask[] }>) {
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
