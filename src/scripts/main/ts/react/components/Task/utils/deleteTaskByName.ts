import { TaskType } from 'Types/tasks';
import { Dispatch } from 'react';
import { taskAPI } from 'Api/tasks';
import { asyncCatcher } from 'Utils/helpers/asyncCatcher';

export const deleteTaskByName = asyncCatcher(async (
  data: TaskType,
  token: string,
  startUnmount: (cb: any) => void,
  dispatch: Dispatch<any>
) => {
  const response = await taskAPI.deleteTaskByName({ name: data.name, date: data.at }, token);
  startUnmount(() => dispatch({ type: 'DELETE_TASKS_BY_NAME', payload: { date: data.at, name: data.name } }));
});
