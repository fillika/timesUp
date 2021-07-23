import { Dispatch } from 'react';
import { taskAPI } from 'Api/tasks';
import { DispatchProps, GetState } from 'Redux/types/dispatch';

export const getAllTasks = (token: string) => (dispatch: Dispatch<DispatchProps>, getState: GetState) => {
  taskAPI
    .getAllTask(token)
    .then(response =>
      dispatch({
        type: 'GET_ALL_TASKS',
        payload: {
          databaseTaskList: response.data.tasks,
          isLoadMore: response.data.isLoadMore,
        },
      })
    )
    .then(() => dispatch({ type: 'APP_LOG_IN', payload: token }))
    .catch(() => dispatch({ type: 'APP_LOG_OUT' }));
};
