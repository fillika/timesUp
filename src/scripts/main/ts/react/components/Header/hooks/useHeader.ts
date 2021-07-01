import { useEffect, ChangeEvent, KeyboardEvent, Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'Redux/rootReducer';
import { time } from 'Utils/Time';
import { taskHandler } from 'Utils/TaskHandler';
import { createTask } from './../utils/createTask';
import { getActiveTask } from '../utils/getActiveTask';
import _ from 'lodash';
import { useGlobalError } from 'App/hooks/useGlobalError';

export function useHeader() {
  const dispatch = useDispatch();
  const { activeTask, app } = useSelector((state: RootState) => state);
  const { activeTaskErrorHandler, createTaskErrorHandler } = useGlobalError();

  useEffect(() => {
    if (app.token) {
      getActiveTask(activeTaskErrorHandler, app.token, dispatch);
    }
  }, []);

  useEffect(() => {
    if (app.token) {
      if (activeTask.isTimeActive) {
        taskHandler.updateActiveTask(app.token, activeTask);
      }
    }
  }, [activeTask.isTimeActive]);

  useEffect(() => {
    if (activeTask.duration > 0 && app.token) {
      createTask(createTaskErrorHandler, activeTask, dispatch, app.token);
      dispatch({ type: 'RESET_ACTIVE_TASK_PROPS', payload: { totalTime: '00:00:00', name: '', duration: 0 } });
    }
  }, [activeTask.duration]);

  useEffect(() => {
    let timeoutID = setTimeout(() => {
      if (activeTask.isTimeActive) {
        const diff = new Date().getTime() - new Date(activeTask.start).getTime();
        dispatch({ type: 'SET_ACTIVE_TASK_TOTAL_TIME', payload: time.countTotalTime(diff) });
      } else {
        clearTimeout(timeoutID);
      }
    }, 1000);

    return () => {
      clearTimeout(timeoutID);
    };
  }, [activeTask.isTimeActive, activeTask.totalTime]);

  const toggleTimer = () => app.token && taskHandler.toggleTimer(activeTask, dispatch, app.token);

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
