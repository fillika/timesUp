import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { createSelector } from 'reselect';
import { RootState } from 'Redux/reducers/rootReducer';
import { useGlobalError } from 'App/hooks/useGlobalError';
import { taskHandler } from 'Utils/TaskHandler';
import { time } from 'Utils/Time';
import { getActiveTask } from '../utils/getActiveTask';
import { createTask } from '../utils/createTask';

const memoState = createSelector(
  (state: RootState) => state,
  ({ activeTask, app }: RootState) => ({ activeTask, app })
);

export function useHeader() {
  const dispatch = useDispatch();
  const store = useStore();
  const {
    activeTask,
    app: { token },
  } = useSelector(memoState);

  const { isTimeActive, duration, start, name, totalTime } = activeTask;
  const { activeTaskErrorHandler, createTaskErrorHandler } = useGlobalError();

  useEffect(() => {
    if (token) {
      getActiveTask(activeTaskErrorHandler, token, dispatch);
    }
  }, []);

  useEffect(() => {
    if (token) {
      if (isTimeActive) {
        taskHandler.updateActiveTask(token, activeTask);
      }
    }
  }, [isTimeActive]);

  useEffect(() => {
    if (duration > 0 && token) {
      createTask(createTaskErrorHandler, activeTask, dispatch, token);
      dispatch({ type: 'RESET_ACTIVE_TASK_PROPS', payload: { totalTime: '00:00:00', name: '', duration: 0 } });
      document.title = `TimesUp`;
    }
  }, [duration]);

  useEffect(() => {
    let timeoutID = setTimeout(() => {
      if (isTimeActive) {
        const diff = new Date().getTime() - new Date(start).getTime();
        const totalTime = time.countTotalTime(diff);
        dispatch({ type: 'SET_ACTIVE_TASK_TOTAL_TIME', payload: totalTime });

        document.title = `${totalTime} - ${name}`;
      } else {
        clearTimeout(timeoutID);
      }
    }, 1000);

    return () => {
      clearTimeout(timeoutID);
    };
  }, [isTimeActive, totalTime]);

  const toggleTimer: () => void = useCallback(
    () => token && taskHandler.toggleTimer(store.getState().activeTask, dispatch, token),
    []
  );

  // console.log('Render[Header]');

  return {
    isTimeActive,
    name,
    totalTime,
    toggleTimer,
  };
}
