import { activeTaskAPI } from 'Api/activeTask';
import { Dispatch } from 'react';
import { RootState } from '../rootReducer';
import { activeTaskState } from 'Redux/reducers/activeTaskReducer';
import { AppError } from 'Utils/Error';
import { ActiveTaskResponse, ServerResponse } from 'Types/serverResponse';
import { errSwitchCase } from 'Utils/helpers/errSwitchCase';

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
    activeTaskAPI
      .getActiveTask(token)
      .then((response: ServerResponse<ActiveTaskResponse>) => {
        const activeTask: activeTaskState = response.data.activeTask;

        if (activeTask) {
          if (activeTask.isTimeActive) dispatch(setActiveTask(activeTask));
        }
      })
      .catch((err: AppError) => errSwitchCase(err, dispatch));
  };
};

export const updateActiveTaskFetch = (token: string) => {
  return async (dispatch: Dispatch<any>, getState: () => RootState) => {
    const { activeTask } = getState();
    await activeTaskAPI.updateActiveTask(token, activeTask).catch((err: AppError) => errSwitchCase(err, dispatch));
  };
};
