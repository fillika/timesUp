import { Notification } from 'Types/notifications';
import { Dispatch } from 'react';

const notifyTimeout = 2200;

const notify = (type: string, message: string): Notification => {
  return {
    id: new Date().getTime().toString(16),
    type,
    message,
  };
};

export const createNotify = (type: string, message: string, dispatch: Dispatch<any>) => {
  dispatch({
    type: 'APP_SET_NOTIFICATION',
    payload: notify(type, message),
  });

  let timeoutID = setTimeout(() => {
    dispatch({ type: 'APP_CLEAR_NOTIFICATION' });
    clearTimeout(timeoutID);
  }, notifyTimeout);
};
