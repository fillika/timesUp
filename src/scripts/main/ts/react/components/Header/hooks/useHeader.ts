import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'Redux/reducers/rootReducer';
import { getJWTToken } from 'Utils/helpers/getJWTToken';
import { createTaskFetch } from 'Redux/reducers/taskReducer/actionCreators';
import {
  getActiveTask,
  updateActiveTaskFetch,
  toggleHeaderTimer,
  updateActiveTime,
} from 'Redux/reducers/activeTaskReducer/middlewares';

export function useHeader() {
  const dispatch = useDispatch();
  const token = getJWTToken();
  const { isTimeActive, duration, name, totalTime } = useSelector((state: RootState) => state.activeTask);

  const toggleTimer: () => void = () => token && dispatch(toggleHeaderTimer(token));

  const keyDownHandler = (event: KeyboardEvent) => {
    if (isTimeActive && event.ctrlKey && event.shiftKey && event.code === 'KeyS') toggleTimer();
  };

  useEffect(() => {
    if (token) dispatch(getActiveTask(token));
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
    let timeoutID = setTimeout(() => dispatch(updateActiveTime()), 999);
    return () => clearTimeout(timeoutID);
  }, [isTimeActive, totalTime]);

  // console.log('Render[Header]');

  return {
    isTimeActive,
    name,
    totalTime,
    toggleTimer,
  };
}
