import { TaskType } from 'Types/tasks';
import { Dispatch } from 'react';
import { taskAPI } from 'Api/tasks';
import { asyncCatcher } from 'Utils/helpers/asyncCatcher';

export const updateTaskByName = asyncCatcher(
  async (event: React.FocusEvent<HTMLInputElement>, data: TaskType, token: string, dispatch: Dispatch<any>) => {
    const val = event.target.value.trim();


    console.log('blur');
    console.log('val', val);
    console.log('val', data.name);

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
        await taskAPI.updateTaskByName(queryReq, token);

        dispatch({
          type: 'UPDATE_TASK_LIST_BY_NAME',
          payload: {
            name: data.name,
            date: data.at,
            newName: val,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
);
