import { RootState } from 'Redux/reducers/rootReducer';
import { Dispatch } from 'react';
import { time } from 'Utils/Time';
import { playAlarm } from 'App/components/Timer/utils/alarm';
import { setDocumentDefaultTitle, setDocumentTitle } from 'Utils/helpers/setDocumentTitle';

export const TIMER_OPEN_MODAL = 'TIMER_OPEN_MODAL',
  TIMER_CLOSE_MODAL = 'TIMER_CLOSE_MODAL',
  TIMER_START = 'TIMER_START',
  TIMER_STOP = 'TIMER_STOP',
  TIMER_SET_COUNTER = 'TIMER_SET_COUNTER',
  TIMER_SET_TIME = 'TIMER_SET_TIME',
  TIMER_STOP_AND_CLEAR = 'TIMER_STOP_AND_CLEAR';

export const openTimerModal = () => {
  return { type: TIMER_OPEN_MODAL };
};

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
  if (counter <= 0) {
    playAlarm();
    setDocumentDefaultTitle();
    return dispatch({ type: TIMER_STOP_AND_CLEAR });
  }

  const timeString = time.countTotalTime(counter);
  dispatch(setMsToCounter(counter));
  dispatch(setTimeString(timeString));
  setDocumentTitle(timeString);
};

export const addExtraTime = (extraTime: number) => (dispatch: Dispatch<any>, getState: () => RootState) => {
  const counter = getState().timer.counter + extraTime;

  const timeString = time.countTotalTime(counter);
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
