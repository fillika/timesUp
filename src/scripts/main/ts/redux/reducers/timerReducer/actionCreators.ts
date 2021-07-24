import { RootState } from 'Redux/reducers/rootReducer';
import { Dispatch } from 'react';
import { time } from 'Utils/Time';

export const TIMER_OPEN_MODAL = 'TIMER_OPEN_MODAL',
  TIMER_CLOSE_MODAL = 'TIMER_CLOSE_MODAL',
  TIMER_START = 'TIMER_START',
  TIMER_STOP = 'TIMER_STOP',
  TIMER_SET_COUNTER = 'TIMER_SET_COUNTER',
  TIMER_SET_TIME = 'TIMER_SET_TIME',
  TIMER_STOP_AND_CLEAR = 'TIMER_STOP_AND_CLEAR';

export const setMsToCounter = (counter: number) => {
  return {
    type: TIMER_SET_COUNTER,
    payload: {
      counter,
    },
  };
};

export const setTimeString = (time: string) => {
  return {
    type: TIMER_SET_TIME,
    payload: {
      time,
    },
  };
};

export const setTimeToInput = (counter: number) => (dispatch: Dispatch<any>, getState: () => RootState) => {
  const timeString = time.countTotalTime(counter, 'ms');

  dispatch(setMsToCounter(counter));
  dispatch(setTimeString(timeString));
};

export const toggleTimer = () => (dispatch: Dispatch<any>, getState: () => RootState) => {
  const state = getState().timer;

  if (!state.isActive && state.counter > 0) {
    dispatch({ type: 'TIMER_START' });
  } else {
    dispatch({ type: 'TIMER_STOP' });
  }
};
