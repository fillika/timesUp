import { Dispatch } from 'react';
import { taskAPI } from 'Scripts/main/api/tasks';
import { DispatchProps, GetState } from 'Redux/types/dispatch';
interface ResponseWithTask extends Response {
  data: {
    tasks: [];
    isLoadMore: boolean;
  };
}

export const getAllTasks = (token: string) => (dispatch: Dispatch<DispatchProps>, getState: GetState) => {
  const getResponseWIthTask = (response: ResponseWithTask) =>
    dispatch({
      type: 'GET_ALL_TASKS',
      payload: {
        databaseTaskList: response.data.tasks,
        isLoadMore: response.data.isLoadMore,
      },
    });

  const logIn = () => dispatch({ type: 'APP_LOG_IN', payload: token });
  const logOut = () => dispatch({ type: 'APP_LOG_OUT' });

  taskAPI.getAllTask(token).then(getResponseWIthTask).then(logIn).catch(logOut);
};
