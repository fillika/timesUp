import { Dispatch } from 'react';
import { RootState } from 'Redux/reducers/rootReducer';
import { taskAPI } from 'Api/tasks';
import { createNotify } from 'Redux/reducers/notifyReducer/actionCreators';
import { activeTaskAPI } from 'Api/activeTask';

const defaultData = {
  at: 0,
  name: '',
  start: 0,
  stop: 0,
  duration: 0,
  isTimeActive: false,
  totalTime: '0:00:00',
};

const CREATE_TASK = 'CREATE_TASK',
  RESET_ACTIVE_TASK_PROPS = 'RESET_ACTIVE_TASK_PROPS',
  UPDATE_ACTIVE_TASK_START = 'UPDATE_ACTIVE_TASK_START',
  UPDATE_ACTIVE_TASK_TIME = 'UPDATE_ACTIVE_TASK_TIME';

const createTask = (payload: []) => ({ type: CREATE_TASK, payload: { newTask: payload } });

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

export const createTaskFetch = (token: string) => {
  return async (dispatch: Dispatch<any>, getState: () => RootState) => {
    let payload;
    const activeTask = getState().activeTask;
    const result = await taskAPI.createTask(activeTask, token).catch(err => console.log(`Some err: ${err}`));

    if (Array.isArray(result.data.task)) payload = result.data.task;
    else payload = [result.data.task];

    if (result.status === 'success') {
      switch (result.action) {
        case 'CREATE':
          dispatch(createTask(payload));
          dispatch(resetActiveTask());
          break;
        default:
          break;
      }
    }
  };
};

export const startTimer = () => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    const { activeTask } = getState();

    if (activeTask.name.trim() === '') {
      return dispatch(createNotify('warning', 'У задачи должно быть имя :)'));
    }

    const start = new Date().getTime();
    dispatch(updateActiveTaskStartTime(start));
  };
};

export const stopTimer = (token: string) => {
  return async (dispatch: Dispatch<any>, getState: () => RootState) => {
    const { activeTask } = getState();
    const endTime = new Date().getTime();

    dispatch(updateActiveTaskTotalTime(activeTask.start, endTime));
    await activeTaskAPI.updateActiveTask(token, defaultData).catch(err => console.log(`Some err: ${err}`));
  };
};

export const toggleTimer = (token: string) => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    const { activeTask } = getState();

    !activeTask.isTimeActive
      ? dispatch(startTimer())
      : dispatch(stopTimer(token));
  };
};
