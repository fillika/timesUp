
import { TaskType } from 'Types/tasks';
import { AppState } from 'Redux/app';
import { Dispatch } from 'react';
import { taskAPI } from 'Api/tasks';
import { sort } from 'Utils/Sort';

export const updateTaskByName = async (
  event: React.FocusEvent<HTMLInputElement>,
  data: TaskType,
  state: AppState,
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

      if (!state.token) return console.error('Токена нет');
      const response = await taskAPI.updateTaskByName(queryReq, state.token);

      dispatch({ type: 'UPDATE_TASK_LIST', payload: sort.sortData(response.data.tasks) });
    } catch (error) {
      console.log(error);
    }
  }
};
