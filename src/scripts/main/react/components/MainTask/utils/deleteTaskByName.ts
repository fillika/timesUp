import { TaskType } from 'Types/tasks';
import { Dispatch } from 'react';
import { taskAPI } from 'Scripts/main/api/tasks';
import { asyncCatcher } from 'Utils/helpers/asyncCatcher';

export const deleteTaskByName = asyncCatcher(async (data: TaskType, token: string, dispatch: Dispatch<any>) => {
  await taskAPI.deleteTaskByName({ name: data.name, date: data.at }, token);
  dispatch({ type: 'DELETE_TASKS_BY_NAME', payload: { date: data.at, name: data.name } });
});
