import { Dispatch } from 'react';
import taskAPI from 'Api/tasks';
import { sort } from 'Utils/Sort';

export async function getAllTasks(token: string, dispatch: Dispatch<any>) {
  const tasksQuery = await taskAPI.getAllTask(token);
  const tasks = sort.sortData(tasksQuery.data.tasks);
  dispatch({ type: 'GET_ALL_TASKS', payload: tasks });
}