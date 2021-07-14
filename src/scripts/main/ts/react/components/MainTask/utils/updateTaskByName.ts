
import { TaskType } from 'Types/tasks';
import { Dispatch } from 'react';
import { taskAPI } from 'Api/tasks';
import { sort } from 'Utils/Sort';
import { asyncCatcher } from 'Utils/helpers/asyncCatcher';


export const updateTaskByName = asyncCatcher(async (
  event: React.FocusEvent<HTMLInputElement>,
  data: TaskType,
  token: string,
  dispatch: Dispatch<any>
) => {
  const val = event.target.value.trim();

  if (val !== data.name) {
    try {
      const queryReq = {
        name: data.name,
        date: data.at,
        set: {
          name: val,
        },
      };

      if (!token) return console.error('Токена нет');
      const response = await taskAPI.updateTaskByName(queryReq, token);

      dispatch({ type: 'UPDATE_TASK_LIST', payload: sort.sortData(response.data.tasks) });
    } catch (error) {
      console.log(error);
    }
  }
});
