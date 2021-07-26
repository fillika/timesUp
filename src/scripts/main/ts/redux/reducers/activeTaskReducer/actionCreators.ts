import { activeTaskAPI } from 'Api/activeTask';
import { Dispatch } from 'react';
import { RootState } from '../rootReducer';
import { activeTaskState } from 'Redux/reducers/activeTaskReducer';
import { AppError } from 'Utils/Error';
import { createNotify } from 'Redux/reducers/notifyReducer/actionCreators';
import { ActiveTaskResponse, ServerResponse } from 'Types/serverResponse';

export const SET_ACTIVE_TASK = 'SET_ACTIVE_TASK',
  SET_ACTIVE_TASK_TOTAL_TIME = 'SET_ACTIVE_TASK_TOTAL_TIME',
  UPDATE_ACTIVE_TASK_NAME = 'UPDATE_ACTIVE_TASK_NAME',
  UPDATE_ACTIVE_TASK_START = 'UPDATE_ACTIVE_TASK_START',
  UPDATE_ACTIVE_TASK_TIME = 'UPDATE_ACTIVE_TASK_TIME',
  RESET_ACTIVE_TASK_PROPS = 'RESET_ACTIVE_TASK_PROPS',
  SET_DEFAULT_ACTIVE_TASK_PROPS = 'SET_DEFAULT_ACTIVE_TASK_PROPS';

const setActiveTask = (activeTask: activeTaskState) => ({ type: SET_ACTIVE_TASK, payload: activeTask });

export const getActiveTask = (token: string) => {
  return async (dispatch: Dispatch<any>, getState: () => RootState) => {
    const getResponse = (response: ServerResponse<ActiveTaskResponse>) => {
      const activeTask: activeTaskState = response.data.activeTask;

      if (activeTask) {
        if (activeTask.isTimeActive) dispatch(setActiveTask(activeTask));
      }
    };

    const errHadnler = (err: AppError) => {
      let message = 'Ошибка подключения к серверу. Приносим свои извинения :(';

      switch (err.statusCode) {
        case 401:
          message = 'Пожалуйста, залогиньтесь заново';
          dispatch(createNotify('warning', message));
          localStorage.removeItem('JWT');
          break;
        case 404:
          dispatch(createNotify('error', message));
          break;
        case 500:
          dispatch(createNotify('error', `Ошибка сервера: ${err.message}`));
          break;
        default:
          dispatch(createNotify('error', err.message));
          break;
      }

      return err.status;
    };

    activeTaskAPI.getActiveTask(token).then(getResponse).catch(errHadnler);
  };
};
