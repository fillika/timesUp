import { useEffect, ChangeEvent, KeyboardEvent, Dispatch } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { activeTaskState } from 'Redux/activeTask';
import { RootState } from 'Redux/index';
import { time } from 'Utils/Time';
import { sort } from 'Utils/Sort';
import { SortedTask } from 'Types/tasks';
import api from 'Api/index';
import _ from 'lodash';

const userID = '60c8be578a7a1e9f8c8edecb';

function useHeader() {
  const dispatch = useDispatch();
  const activeTask = useSelector((state: RootState) => state.activeTask);
  const store = useStore();

  useEffect(() => {
    getActiveTask(userID);

    //  Todo рефакторинг. Вынести ниже в utils
    async function getActiveTask(id: string) {
      const result = await api.getActiveTask(id);
      const activeTask: activeTaskState = result.data.activeTask;

      if (activeTask.isTimeActive) {
        dispatch({ type: 'SET_ACTIVE_TASK', payload: activeTask });
        dispatch({ type: 'UPDATE_ACTIVE_TASK_STATUS', payload: true });
        startTimer(store.getState().activeTask.start);
      } else {
        return;
      }
    }
  }, []);

  useEffect(() => {
    if (activeTask.duration > 0) {
      createTask(activeTask, dispatch);
      dispatch({ type: 'SET_ACTIVE_TASK_TOTAL_TIME', payload: '0:00:00' });
      dispatch({ type: 'UPDATE_ACTIVE_TASK_NAME', payload: '' });
    }
  }, [activeTask.duration]);

  useEffect(() => {
    let timeoutID = setTimeout(() => {
      if (store.getState().activeTask.isTimeActive) {
        const diff = new Date().getTime() - new Date(activeTask.start).getTime();
        dispatch({ type: 'SET_ACTIVE_TASK_TOTAL_TIME', payload: time.countTotalTime(diff) });
      } else {
        clearTimeout(timeoutID);
      }
    }, 1000);

    return () => {
      clearTimeout(timeoutID);
    };
  }, [store.getState().activeTask.isTimeActive, activeTask.totalTime]);

  const onClick = () => taskHandler();
  const onKeyPress = (event: KeyboardEvent) => event.key === 'Enter' && taskHandler();
  const onInput = (event: ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: 'UPDATE_ACTIVE_TASK_NAME', payload: event.target.value });

  function startTimer(start: number) {
    dispatch({ type: 'UPDATE_ACTIVE_TASK_START', payload: start });
    updateActiveTask(store.getState().activeTask)
  }

  function stopTimer() {
    const endTime = new Date().getTime();

    dispatch({
      type: 'UPDATE_ACTIVE_TASK_TIME',
      payload: {
        stop: endTime,
        duration: endTime - new Date(activeTask.start).getTime(),
        at: endTime + 1000,
      },
    });

    const data = {
      at: 0,
      userID: '60c8be578a7a1e9f8c8edecb',
      name: '',
      start: 0,
      stop: 0,
      duration: 0,
      isTimeActive: false,
      totalTime: '0:00:00',
    };
    updateActiveTask(data); // fetch на обновление таска. Скидывает до дефолтных значений

  }

  function taskHandler() {
    if (activeTask.name.trim() === '') {
      // TODO создать модалку с оповещалкой
      console.log('Напишите имя задачи');
      return;
    }

    dispatch({ type: 'UPDATE_ACTIVE_TASK_STATUS', payload: !activeTask.isTimeActive });
    // * Тут нет рендера

    if (store.getState().activeTask.isTimeActive) {
      const start = new Date().getTime();
      startTimer(start);
    } else {
      stopTimer();
    }
  }

  return {
    onInput,
    onClick,
    activeTask,
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
    
async function updateActiveTask(data: activeTaskState) {
  try {
    await api.updateActiveTask(userID, data);
    console.log('Task was upd');
  } catch (error) {
    console.error(error);
  }
}