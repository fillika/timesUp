import { Dispatch } from 'react';
import { activeTaskState } from 'Redux/activeTask';
import { activeTaskAPI } from 'Api/activeTask';
import { asyncCatcher } from 'Utils/helpers/asyncCatcher';

export const getActiveTask = asyncCatcher(async (token: string, dispatch: Dispatch<{ type: string; payload: activeTaskState }>) => {
  const result = await activeTaskAPI.getActiveTask(token);
  const activeTask: activeTaskState = result.data.activeTask;

  if (activeTask) {
    if (activeTask.isTimeActive) dispatch({ type: 'SET_ACTIVE_TASK', payload: activeTask });
  }
});
