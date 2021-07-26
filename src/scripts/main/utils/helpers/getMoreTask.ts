import { Dispatch } from 'react';
import { taskAPI } from 'Scripts/main/api/tasks';
import { asyncCatcher } from 'Utils/helpers/asyncCatcher';

export const getMoreTask = asyncCatcher(async (page: number, token: string, dispatch: Dispatch<any>) => {
  const response = await taskAPI.getMoreTask(page, token);

  dispatch({
    type: 'GET_MORE_TASKS',
    payload: {
      page,
      isLoadMore: response.data.isLoadMore,
      databaseTaskList: response.data.tasks,
    },
  });

  if (response.status === 'success') {
    return true;
  }

  return false;
});
