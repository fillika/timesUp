import { activeTaskAPI } from 'Api/activeTask';
import { Dispatch } from 'react';
import { RootState } from '../rootReducer';
import { AppError } from 'Utils/Error';
import { ActiveTaskResponse, ServerResponse } from 'Types/serverResponse';
import { errSwitchCase } from 'Utils/helpers/errSwitchCase';
import { defaultData } from './utils';
import { createNotify } from 'Redux/reducers/notifyReducer/actionCreators';
import { setDocumentTitle, setDocumentDefaultTitle } from 'Utils/helpers/setDocumentTitle';
import { time } from 'Utils/Time';
import { activeTaskState } from 'Redux/reducers/activeTaskReducer';
import {
  setActiveTask,
  updateActiveTaskStartTime,
  updateActiveTaskTotalTime,
  setActiveTaskTotalTime,
  updateActiveTaskName,
} from './actionCreators';

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

export const startHeaderTimer = () => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    const { activeTask } = getState();

    if (activeTask.name.trim() === '') {
      return dispatch(createNotify('warning', 'У задачи должно быть имя :)'));
    }

    setDocumentTitle(`${'00:00:00'}-${activeTask.name}`);
    const start = new Date().getTime();
    dispatch(updateActiveTaskStartTime(start));
  };
};
export const stopHeaderTimer = (token: string) => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    const { activeTask } = getState();
    const endTime = new Date().getTime();

    setDocumentDefaultTitle();
    dispatch(updateActiveTaskTotalTime(activeTask.start, endTime));
    activeTaskAPI.updateActiveTask(token, defaultData).catch((err: AppError) => errSwitchCase(err, dispatch));
  };
};
export const toggleHeaderTimer = (token: string) => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    const { activeTask } = getState();

    !activeTask.isTimeActive ? dispatch(startHeaderTimer()) : dispatch(stopHeaderTimer(token));
  };
};
export const updateActiveTime = () => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    const { isTimeActive, start, name } = getState().activeTask;

    if (isTimeActive) {
      const diff = new Date().getTime() - new Date(start).getTime();
      const totalTime = time.countTotalTime(diff);
      setDocumentTitle(`${totalTime}-${name}`);
      dispatch(setActiveTaskTotalTime(totalTime));
    }
  };
};
export const continueTaskHadnler = (name: string, token: string) => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    dispatch(updateActiveTaskName(name));
    dispatch(toggleHeaderTimer(token));
  };
};
