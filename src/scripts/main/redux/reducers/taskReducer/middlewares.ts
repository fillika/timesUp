import { Dispatch } from 'react';
import { RootState } from 'Redux/reducers/rootReducer';
import { taskAPI } from 'Scripts/main/api/tasks';
import { AppError } from 'Utils/Error';
import { errSwitchCase } from 'Utils/helpers/errSwitchCase';
import { TaskResponse, ServerResponse } from 'Types/serverResponse';
import { resetActiveTask } from 'Redux/reducers/activeTaskReducer/actionCreators';
import { createTask, updateTaskByIDAC, updateTaskByNameAC } from './actionCreators';
import { TaskType } from 'Types/tasks';

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

export const updateTaskByName = (val: string, token: string, currentTask: TaskType) => {
  return async (dispatch: Dispatch<any>, getState: () => RootState) => {
    const queryReq = {
      name: currentTask.name,
      date: currentTask.at,
      set: {
        name: val,
      },
    };

    await taskAPI
      .updateTaskByName(queryReq, token)
      .then(() => dispatch(updateTaskByNameAC(val, currentTask)))
      .catch((err: AppError) => errSwitchCase(err, dispatch));
  };
};

export const updateTaskByID = (id: string, val: string, token: string) => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    taskAPI
      .updateTask(id, { name: val }, token)
      .then(() => dispatch(updateTaskByIDAC(id, val)))
      .catch((err: AppError) => errSwitchCase(err, dispatch));
  };
};