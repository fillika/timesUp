import { Dispatch } from 'react';
import { activeTaskState } from 'Redux/reducers/activeTaskReducer';
import { DatabaseTask } from 'Types/tasks';
import { taskAPI } from 'Api/tasks';
import { asyncCatcher } from 'Utils/helpers/asyncCatcher';



export const createTask = asyncCatcher(
  async (
    task: activeTaskState,
    dispatch: Dispatch<{ type: string; payload: { newTask: DatabaseTask } }>,
    token: string
  ) => {
    const result = await taskAPI.createTask(task, token);
    let payload;

    if (Array.isArray(result.data.task)) payload = result.data.task;
    else payload = [result.data.task];

    if (result.status === 'success') {
      switch (result.action) {
        case 'CREATE':
          dispatch({ type: 'CREATE_TASK', payload: { newTask: payload } });
          break;
        default:
          break;
      }
    } else {
      throw new Error(result);
    }
  }
);
