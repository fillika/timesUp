import { Dispatch } from 'react';
import { notify } from 'Utils/helpers/createNotify';
import { RootState } from 'Redux/reducers/rootReducer';

export const SET_NOTIFICATION = 'SET_NOTIFICATION';

export const createNotify = (type: string, message: string, time: number = 3500) => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    dispatch({
      type: SET_NOTIFICATION,
      payload: notify(type, message, time),
    });
  };
};
