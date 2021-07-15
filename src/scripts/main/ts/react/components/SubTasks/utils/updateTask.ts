import { FocusEvent, Dispatch } from 'react';
import { asyncCatcher } from 'Utils/helpers/asyncCatcher';
import { taskAPI } from 'Api/tasks';

async function upd(
  id: string,
  token: string | undefined,
  name: string,
  event: FocusEvent<HTMLInputElement>,
  dispatch: Dispatch<{ type: string; payload: { taskID: string; newName: string } }>
) {
  const val = event.target.value.trim();

  if (val !== name && token) {
    await taskAPI.updateTask(id, { name: val }, token);
    dispatch({ type: 'UPDATE_TASK_LIST_BY_ID', payload: { taskID: id, newName: val } });
  }
}

export const updateTaskByID = asyncCatcher(upd);
