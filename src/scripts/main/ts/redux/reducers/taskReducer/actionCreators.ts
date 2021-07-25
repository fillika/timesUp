import { Dispatch } from 'react';
import { RootState } from 'Redux/reducers/rootReducer';
import { taskAPI } from 'Api/tasks';

const createTask = (payload: []) => ({ type: 'CREATE_TASK', payload: { newTask: payload } });

const resetActiveTask = () => ({
  type: 'RESET_ACTIVE_TASK_PROPS',
  payload: { totalTime: '00:00:00', name: '', duration: 0 },
});

export const createTaskFetch = (token: string) => {
  return async (dispatch: Dispatch<any>, getState: () => RootState) => {
    let payload;
    const activeTask = getState().activeTask;
    const result = await taskAPI.createTask(activeTask, token).catch(err => console.log(`Some err: ${err}`));

    if (Array.isArray(result.data.task)) payload = result.data.task;
    else payload = [result.data.task];

    if (result.status === 'success') {
      switch (result.action) {
        case 'CREATE':
          dispatch(createTask(payload));
          dispatch(resetActiveTask());
          break;
        default:
          break;
      }
    }
  };
};
