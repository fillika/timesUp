import { taskAPI } from 'Api/tasks';
import { Dispatch } from 'react';
import { asyncCatcher } from 'Utils/helpers/asyncCatcher';

async function del(
  id: string,
  token: string | undefined,
  startUnmount: (cb: any) => void,
  dispatch: Dispatch<{ type: string; payload: { taskID: string } }>
) {
  if (token) {
    const response = await taskAPI.deleteTaskByID(id, token);
    startUnmount(() => dispatch({ type: 'DELETE_TASKS_BY_ID', payload: { taskID: id } }));
  }
}

export const deleteTaskByID = asyncCatcher(del);
