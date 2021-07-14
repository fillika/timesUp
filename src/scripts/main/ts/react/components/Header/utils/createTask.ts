import { Dispatch } from 'react';
import { activeTaskState } from 'Redux/activeTask';
import { SortedTask } from 'Types/tasks';
import { taskAPI } from 'Api/tasks';
import { sort } from 'Utils/Sort';
import { asyncCatcher } from 'Utils/helpers/asyncCatcher';

export const createTask = asyncCatcher(
  async (task: activeTaskState, dispatch: Dispatch<{ type: string; payload: SortedTask[] }>, token: string) => {
    const result = await taskAPI.createTask(task, token);

    if (result.status === 'success') {
      switch (result.action) {
        case 'CREATE':
          dispatch({ type: 'CREATE_TASK', payload: sort.sortData(result.data.tasks) });
          break;
        default:
          break;
      }
    } else {
      throw new Error(result);
    }
  }
);
