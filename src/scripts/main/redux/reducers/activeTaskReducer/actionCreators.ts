import { activeTaskState } from 'Redux/reducers/activeTaskReducer';

export const SET_ACTIVE_TASK = 'SET_ACTIVE_TASK',
  SET_ACTIVE_TASK_TOTAL_TIME = 'SET_ACTIVE_TASK_TOTAL_TIME',
  UPDATE_ACTIVE_TASK_NAME = 'UPDATE_ACTIVE_TASK_NAME',
  UPDATE_ACTIVE_TASK_START = 'UPDATE_ACTIVE_TASK_START',
  UPDATE_ACTIVE_TASK_TIME = 'UPDATE_ACTIVE_TASK_TIME',
  RESET_ACTIVE_TASK_PROPS = 'RESET_ACTIVE_TASK_PROPS',
  SET_DEFAULT_ACTIVE_TASK_PROPS = 'SET_DEFAULT_ACTIVE_TASK_PROPS';

export const setActiveTask = (activeTask: activeTaskState) => ({ type: SET_ACTIVE_TASK, payload: activeTask });

export const updateActiveTaskStartTime = (start: number) => ({ type: UPDATE_ACTIVE_TASK_START, payload: start });

export const updateActiveTaskTotalTime = (start: number, end: number) => ({
  type: UPDATE_ACTIVE_TASK_TIME,
  payload: {
    stop: end,
    duration: end - new Date(start).getTime(),
    at: end + 1000,
    isTimeActive: false,
  },
});
export const updateActiveTaskName = (name: string) => ({ type: UPDATE_ACTIVE_TASK_NAME, payload: name });

export const setActiveTaskTotalTime = (totalTime: string, diff: number) => ({
  type: SET_ACTIVE_TASK_TOTAL_TIME,
  payload: { totalTime, diff },
});

export const resetActiveTask = () => ({
  type: RESET_ACTIVE_TASK_PROPS,
  payload: { totalTime: '00:00:00', name: '', duration: 0 },
});
