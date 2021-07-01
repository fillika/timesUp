import { FocusEvent, Dispatch } from 'react';
import { asyncCatcher } from 'Utils/helpers/asyncCatcher';
import { taskAPI } from 'Api/tasks';
import { sort } from 'Utils/Sort';
import { SortedTask } from 'Types/tasks';

async function upd(
  id: string,
  token: string | undefined,
  name: string,
  event: FocusEvent<HTMLInputElement>,
  dispatch: Dispatch<{ type: string; payload: SortedTask[] }>
) {
  const val = event.target.value.trim();

  if (val !== name && token) {
    const response = await taskAPI.updateTask(id, { name: val }, token);
    dispatch({ type: 'UPDATE_TASK_LIST', payload: sort.sortData(response.data.tasks) });
  }
}

export const updateTaskByID = asyncCatcher(upd);
