import { Notification } from 'Types/notifications';
import { Dispatch } from 'react';

const notify = (type: string, message: string, time: number): Notification => {
  return {
    id: new Date().getTime().toString(16),
    time,
    type,
    message,
  };
};

export const createNotify = (type: string, message: string, dispatch: Dispatch<any>, time: number = 2200) => {
  dispatch({
    type: 'SET_NOTIFICATION',
    payload: notify(type, message, time),
  });

  let timeoutID = setTimeout(() => {
    dispatch({ type: 'CLEAR_NOTIFICATION' });
    clearTimeout(timeoutID);
  }, time);
};
