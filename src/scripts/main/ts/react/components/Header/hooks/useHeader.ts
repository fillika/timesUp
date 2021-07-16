import { useEffect, ChangeEvent, KeyboardEvent, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'Redux/reducers/rootReducer';
import { time } from 'Utils/Time';
import { taskHandler } from 'Utils/TaskHandler';
import { createTask } from './../utils/createTask';
import { getActiveTask } from '../utils/getActiveTask';
import { useGlobalError } from 'App/hooks/useGlobalError';
import _ from 'lodash';

export function useHeader() {
  const dispatch = useDispatch();
  const {
    activeTask,
    app: { token },
  } = useSelector((state: RootState) => state);
  const { activeTaskErrorHandler, createTaskErrorHandler } = useGlobalError();

  console.log('Render[Header]');

  useEffect(() => {
    if (token) {
      getActiveTask(activeTaskErrorHandler, token, dispatch);
    }
  }, []);

  useEffect(() => {
    if (token) {
      if (activeTask.isTimeActive) {
        taskHandler.updateActiveTask(token, activeTask);
      }
    }
  }, [activeTask.isTimeActive]);

  useEffect(() => {
    if (activeTask.duration > 0 && token) {
      createTask(createTaskErrorHandler, activeTask, dispatch, token);
      dispatch({ type: 'RESET_ACTIVE_TASK_PROPS', payload: { totalTime: '00:00:00', name: '', duration: 0 } });
      document.title = `TimesUp`;
    }
  }, [activeTask.duration]);

  useEffect(() => {
    let timeoutID = setTimeout(() => {
      if (activeTask.isTimeActive) {
        const diff = new Date().getTime() - new Date(activeTask.start).getTime();
        const totalTime = time.countTotalTime(diff);
        dispatch({ type: 'SET_ACTIVE_TASK_TOTAL_TIME', payload: totalTime });

        document.title = `${totalTime} - ${activeTask.name}`;
      } else {
        clearTimeout(timeoutID);
      }
    }, 1000);

    return () => {
      clearTimeout(timeoutID);
    };
  }, [activeTask.isTimeActive, activeTask.totalTime]);

  const toggleTimer = () => token && taskHandler.toggleTimer(activeTask, dispatch, token);

  const onKeyPress = (event: KeyboardEvent) => event.key === 'Enter' && toggleTimer();

  const onInput = (event: ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: 'UPDATE_ACTIVE_TASK_NAME', payload: event.target.value });

  return {
    onInput,
    toggleTimer,
    activeTask,
    onKeyPress,
  };
}
