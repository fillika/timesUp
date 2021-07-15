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

    if (result.status === 'success') {
      switch (result.action) {
        case 'CREATE':
          dispatch({ type: 'CREATE_TASK', payload: { newTask: result.data.task } });
          break;
        default:
          break;
      }
    } else {
      throw new Error(result);
    }
  }
);
