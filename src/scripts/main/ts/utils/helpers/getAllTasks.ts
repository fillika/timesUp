import { Dispatch } from 'react';
import { taskAPI } from 'Api/tasks';
import { sort } from 'Utils/Sort';
import { asyncCatcher } from 'Utils/helpers/asyncCatcher';

export const getAllTasks = asyncCatcher(async (token: string, dispatch: Dispatch<any>) => {
  const tasksQuery = await taskAPI.getAllTask(token);
  const tasks = sort.sortData(tasksQuery.data.tasks);

  dispatch({ type: 'GET_ALL_TASKS', payload: tasks });
  dispatch({ type: 'APP_LOG_IN', payload: token });
});
