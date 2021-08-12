import { Dispatch } from 'react';
import { notify } from 'Utils/helpers/createNotify';
import { RootState } from 'Redux/reducers/rootReducer';
import partial from 'ramda/src/partial';

export const SET_NOTIFICATION = 'SET_NOTIFICATION';

type TMessage = 'success' | 'warning' | 'error';

type TNotify = (
  type: TMessage,
  message: string,
) => (dispatch: Dispatch<any>, getState: () => RootState) => void;

export const createNotify: TNotify = (type, message) => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    dispatch({
      type: SET_NOTIFICATION,
      payload: notify(type, message),
    });
  };
};

export const notifySuccess = partial(createNotify, ['success']);
export const notifyWarning = partial(createNotify, ['warning']);
export const notifyError = partial(createNotify, ['error']);
