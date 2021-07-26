import { taskAPI } from 'Scripts/main/api/tasks';
import { Dispatch } from 'react';
import { asyncCatcher } from 'Utils/helpers/asyncCatcher';

async function del(
  id: string,
  token: string | undefined,
  dispatch: Dispatch<{ type: string; payload: { taskID: string } }>
) {
  if (token) {
    await taskAPI.deleteTaskByID(id, token);
    dispatch({ type: 'DELETE_TASKS_BY_ID', payload: { taskID: id } })
  }
}

export const deleteTaskByID = asyncCatcher(del);
