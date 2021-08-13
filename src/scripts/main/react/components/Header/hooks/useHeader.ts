import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'Redux/reducers/rootReducer';
import { getJWTToken } from 'Scripts/main/utils/helpers/JWTHadlers';
import { createTaskFetch } from 'Redux/reducers/taskReducer/middlewares';
import {
  getActiveTask,
  updateActiveTaskFetch,
  toggleHeaderTimer,
  updateActiveTime,
} from 'Redux/reducers/activeTaskReducer/middlewares';

export function useHeader() {
  const dispatch = useDispatch();
  const token = getJWTToken();
  const { isTimeActive, duration, name, totalTime, diff } = useSelector((state: RootState) => state.activeTask);

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
    // Таймер делаю на 995, так как он срабатывает не через сек, а примерно на 5-6 млсек дольше.
    let timeoutID = setTimeout(() => dispatch(updateActiveTime()), 995);
    return () => clearTimeout(timeoutID);
  }, [isTimeActive, diff]);

  // console.log('Render[Header]');

  return {
    isTimeActive,
    name,
    totalTime,
    toggleTimer,
  };
}
