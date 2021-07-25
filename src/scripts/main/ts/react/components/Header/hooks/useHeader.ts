import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { createSelector } from 'reselect';
import { RootState } from 'Redux/reducers/rootReducer';
import { useGlobalError } from 'App/hooks/useGlobalError';
import { getActiveTask } from '../utils/getActiveTask';
import {
  createTaskFetch,
  toggleHeaderTimer,
  updateActiveTaskFetch,
  updateActiveTime,
} from 'Redux/reducers/taskReducer/actionCreators';

const memoState = createSelector(
  (state: RootState) => state,
  ({ activeTask, app }: RootState) => ({ activeTask, app })
);

export function useHeader() {
  const dispatch = useDispatch();
  const {
    activeTask,
    app: { token },
  } = useSelector(memoState);

  const { isTimeActive, duration, name, totalTime } = activeTask;
  const { activeTaskErrorHandler } = useGlobalError();

  const toggleTimer: () => void = () => token && dispatch(toggleHeaderTimer(token));

  const keyDownHandler = (event: KeyboardEvent) => {
    if (isTimeActive && event.ctrlKey && event.shiftKey && event.code === 'KeyS') toggleTimer();
  };

  useEffect(() => {
    if (token) {
      getActiveTask(activeTaskErrorHandler, token, dispatch);
    }
  }, []);

  useEffect(() => {
    if (token) {
      if (isTimeActive) dispatch(updateActiveTaskFetch(token));
    }

    window.addEventListener('keydown', keyDownHandler);
    return () => window.removeEventListener('keydown', keyDownHandler);
  }, [isTimeActive]);

  useEffect(() => {
    if (duration > 0 && token) dispatch(createTaskFetch(token));
  }, [duration]);

  useEffect(() => {
    let timeoutID = setTimeout(() => dispatch(updateActiveTime()), 1000);

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
