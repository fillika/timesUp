import { Dispatch } from 'react';
import { notify } from 'Utils/helpers/createNotify';
import { RootState } from 'Redux/reducers/rootReducer';
import partial from 'lodash/fp/partial';

export const SET_NOTIFICATION = 'SET_NOTIFICATION';

type TNotify = (
  type: 'success' | 'warning' | 'error',
  message: string,
  time?: number
) => (dispatch: Dispatch<any>, getState: () => RootState) => void;

export const createNotify: TNotify = (type, message, time = 2200) => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    dispatch({
      type: SET_NOTIFICATION,
      payload: notify(type, message, time),
    });
  };
};

export const notifySuccess = partial(createNotify, ['success']);
export const notifyWarning = partial(createNotify, ['warning']);
export const notifyError = partial(createNotify, ['error']);