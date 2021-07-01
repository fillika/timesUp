import { taskAPI } from 'Api/tasks';
import { sort } from 'Utils/Sort';
import { Dispatch } from 'react';
import { SortedTask } from 'Types/tasks';
import { asyncCatcher } from 'Utils/helpers/asyncCatcher';

async function del(
  id: string,
  token: string | undefined,
  startUnmount: (cb: any) => void,
  dispatch: Dispatch<{ type: string; payload: SortedTask[] }>
) {
  if (token) {
    const response = await taskAPI.deleteTaskByID(id, token);
    startUnmount(() => dispatch({ type: 'DELETE_TASKS_BY_ID', payload: sort.sortData(response.data.tasks) }));
  }
}

export const deleteTaskByID = asyncCatcher(del);
