import { useEffect, ChangeEvent, KeyboardEvent, Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeTaskState } from 'Scripts/main/ts/redux/activeTask';
import { RootState } from 'Redux/rootReducer';
import { time } from 'Utils/Time';
import { taskHandler } from 'Utils/TaskHandler';
import { sort } from 'Utils/Sort';
import { SortedTask } from 'Types/tasks';
import { taskAPI } from 'Api/tasks';
import activeTaskAPI from 'Api/activeTask';
import _ from 'lodash';

export function useHeader() {
  const dispatch = useDispatch();
  const { activeTask, app } = useSelector((state: RootState) => state);

  useEffect(() => {
    if (app.token) {
      getActiveTask(app.token, dispatch);
    }
  }, []);

  useEffect(() => {
    if (app.token) {
      if (activeTask.isTimeActive) {
        taskHandler.updateActiveTask(app.token, activeTask);
      }
    }
  }, [activeTask.isTimeActive]);

  useEffect(() => {
    if (activeTask.duration > 0 && app.token) {
      createTask(activeTask, dispatch, app.token);
      dispatch({ type: 'RESET_ACTIVE_TASK_PROPS', payload: { totalTime: '00:00:00', name: '', duration: 0 } });
    }
  }, [activeTask.duration]);

  useEffect(() => {
    let timeoutID = setTimeout(() => {
      if (activeTask.isTimeActive) {
        const diff = new Date().getTime() - new Date(activeTask.start).getTime();
        dispatch({ type: 'SET_ACTIVE_TASK_TOTAL_TIME', payload: time.countTotalTime(diff) });
      } else {
        clearTimeout(timeoutID);
      }
    }, 1000);

    return () => {
      clearTimeout(timeoutID);
    };
  }, [activeTask.isTimeActive, activeTask.totalTime]);

  const toggleTimer = () => app.token && taskHandler.toggleTimer(activeTask, dispatch, app.token);

  const onKeyPress = (event: KeyboardEvent) => event.key === 'Enter' && toggleTimer();

  const onInput = (event: ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: 'UPDATE_ACTIVE_TASK_NAME', payload: event.target.value });

  return {
    onInput,
    toggleTimer,
    activeTask,
    onKeyPress,
  };
}

// utils handlers
async function createTask(
  task: activeTaskState,
  dispatch: Dispatch<{ type: string; payload: SortedTask[] }>,
  token: string
) {
  try {
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
  } catch (error) {
    console.error(error);
  }
}

async function getActiveTask(token: string, dispatch: Dispatch<{ type: string; payload: activeTaskState }>) {
  const result = await activeTaskAPI.getActiveTask(token);
  const activeTask: activeTaskState = result.data.activeTask;

  if (activeTask) {
    if (activeTask.isTimeActive) dispatch({ type: 'SET_ACTIVE_TASK', payload: activeTask });
  }
}
