import { Dispatch } from 'react';
import { RootState } from 'Redux/reducers/rootReducer';
import { taskAPI } from 'Scripts/main/api/tasks';
import { AppError } from 'Utils/Error';
import { errSwitchCase } from 'Utils/helpers/errSwitchCase';
import { TaskResponse, ServerResponse } from 'Types/serverResponse';
import { resetActiveTask } from 'Redux/reducers/activeTaskReducer/actionCreators';
import { createTask } from './actionCreators';

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
