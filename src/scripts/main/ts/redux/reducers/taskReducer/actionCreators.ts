import { Dispatch } from 'react';
import { RootState } from 'Redux/reducers/rootReducer';
import { taskAPI } from 'Api/tasks';
import { createNotify } from 'Redux/reducers/notifyReducer/actionCreators';
import { activeTaskAPI } from 'Api/activeTask';
import { setDocumentTitle, setDocumentDefaultTitle } from 'Utils/helpers/setDocumentTitle';
import { time } from 'Utils/Time';
import { defaultData } from './utils';
import { AppError } from 'Utils/Error';
import { errSwitchCase } from 'Utils/helpers/errSwitchCase';
import { TaskResponse, ServerResponse } from 'Types/serverResponse';
import { DatabaseTask } from 'Types/tasks';

const CREATE_TASK = 'CREATE_TASK',
  RESET_ACTIVE_TASK_PROPS = 'RESET_ACTIVE_TASK_PROPS',
  UPDATE_ACTIVE_TASK_START = 'UPDATE_ACTIVE_TASK_START',
  SET_ACTIVE_TASK_TOTAL_TIME = 'SET_ACTIVE_TASK_TOTAL_TIME',
  UPDATE_ACTIVE_TASK_TIME = 'UPDATE_ACTIVE_TASK_TIME';

const createTask = (payload: DatabaseTask[]) => ({ type: CREATE_TASK, payload: { newTask: payload } });

const resetActiveTask = () => ({
  type: RESET_ACTIVE_TASK_PROPS,
  payload: { totalTime: '00:00:00', name: '', duration: 0 },
});

const updateActiveTaskStartTime = (start: number) => ({ type: UPDATE_ACTIVE_TASK_START, payload: start });
const updateActiveTaskTotalTime = (start: number, end: number) => ({
  type: UPDATE_ACTIVE_TASK_TIME,
  payload: {
    stop: end,
    duration: end - new Date(start).getTime(),
    at: end + 1000,
    isTimeActive: false,
  },
});
const setActiveTaskTotalTime = (totalTime: string) => ({ type: SET_ACTIVE_TASK_TOTAL_TIME, payload: totalTime });

export const createTaskFetch = (token: string) => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    const activeTask = getState().activeTask;

    taskAPI
      .createTask(activeTask, token)
      .then((result: ServerResponse<TaskResponse>) => {
        let payload;

        if (Array.isArray(result.data.task)) payload = result.data.task;
        else payload = [result.data.task];

        dispatch(createTask(payload));
        dispatch(resetActiveTask());
      })
      .catch((err: AppError) => errSwitchCase(err, dispatch));
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
    dispatch({ type: 'UPDATE_ACTIVE_TASK_NAME', payload: name });
    dispatch(toggleHeaderTimer(token));
  };
};
