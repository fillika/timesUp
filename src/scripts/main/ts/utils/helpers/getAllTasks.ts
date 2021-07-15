import { Dispatch } from 'react';
import { taskAPI } from 'Api/tasks';
import { asyncCatcher } from 'Utils/helpers/asyncCatcher';

export const getAllTasks = asyncCatcher(async (token: string, dispatch: Dispatch<any>) => {
  // Todo сортировать таски перед рендером, а в state хранить обычный список с сервера
  const response = await taskAPI.getAllTask(token);

  dispatch({
    type: 'GET_ALL_TASKS',
    payload: {
      databaseTaskList: response.data.tasks,
    },
  });
  dispatch({ type: 'APP_LOG_IN', payload: token });
});
