import { Dispatch } from 'react';
import { taskAPI } from 'Api/tasks';
import { asyncCatcher } from 'Utils/helpers/asyncCatcher';

export const getAllTasks = asyncCatcher(async (token: string, dispatch: Dispatch<any>) => {
  const response = await taskAPI.getAllTask(token);

  dispatch({
    type: 'GET_ALL_TASKS',
    payload: {
      databaseTaskList: response.data.tasks,
      isLoadMore: response.data.isLoadMore
    },
  });
  dispatch({ type: 'APP_LOG_IN', payload: token });
});
