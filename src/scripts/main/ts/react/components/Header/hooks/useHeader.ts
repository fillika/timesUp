import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { createSelector } from 'reselect';
import { RootState } from 'Redux/reducers/rootReducer';
import { useGlobalError } from 'App/hooks/useGlobalError';
import { taskHandler } from 'Utils/TaskHandler';
import { time } from 'Utils/Time';
import { getActiveTask } from '../utils/getActiveTask';
import { createTask } from '../utils/createTask';
import { setDocumentTitle, setDocumentDefaultTitle } from 'Utils/helpers/setDocumentTitle';

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

  const toggleTimer: () => void = useCallback(
    () => token && taskHandler.toggleTimer(store.getState().activeTask, dispatch, token),
    []
  );

  const keyDownHandler = (event: KeyboardEvent) => {
    // add STOP ShortCut
    if (isTimeActive && event.ctrlKey && event.shiftKey && event.code === 'KeyS') {
      toggleTimer();
    }
  };

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

    window.addEventListener('keydown', keyDownHandler);

    return () => window.removeEventListener('keydown', keyDownHandler);
  }, [isTimeActive]);

  useEffect(() => {
    if (duration > 0 && token) {
      createTask(createTaskErrorHandler, activeTask, dispatch, token);
      dispatch({ type: 'RESET_ACTIVE_TASK_PROPS', payload: { totalTime: '00:00:00', name: '', duration: 0 } });
    }
  }, [duration]);

  useEffect(() => {
    let timeoutID = setTimeout(() => {
      if (isTimeActive) {
        const diff = new Date().getTime() - new Date(start).getTime();
        const totalTime = time.countTotalTime(diff);
        setDocumentTitle(`${totalTime}-${name}`);
        dispatch({ type: 'SET_ACTIVE_TASK_TOTAL_TIME', payload: totalTime });
      } else {
        setDocumentDefaultTitle();
        clearTimeout(timeoutID);
      }
    }, 950);

    return () => {
      clearTimeout(timeoutID);
    };
  }, [isTimeActive, totalTime]);

  // console.log('Render[Header]');

  return {
    isTimeActive,
    name,
    totalTime,
    toggleTimer,
  };
}
