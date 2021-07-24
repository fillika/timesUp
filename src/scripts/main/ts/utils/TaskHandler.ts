import { Dispatch } from 'react';
import { activeTaskState } from 'Redux/reducers/activeTaskReducer';
import { activeTaskAPI } from 'Api/activeTask';
import { createNotify } from 'Redux/reducers/notifyReducer/actionCreators';

class TaskHandler {
  defaultData: activeTaskState;

  constructor() {
    this.defaultData = {
      at: 0,
      name: '',
      start: 0,
      stop: 0,
      duration: 0,
      isTimeActive: false,
      totalTime: '0:00:00',
    };
  }

  toggleTimer(activeTask: activeTaskState, dispatch: Dispatch<any>, token: string) {
    !activeTask.isTimeActive
      ? this.startTimer(activeTask, dispatch, token)
      : this.stopTimer(activeTask, dispatch, token);
  }

  startTimer(activeTask: activeTaskState, dispatch: Dispatch<any>, token: string) {
    if (activeTask.name.trim() === '') {
      dispatch(createNotify('warning', 'У задачи должно быть имя :)'));
      return;
    }

    const start = new Date().getTime();
    dispatch({ type: 'UPDATE_ACTIVE_TASK_START', payload: start });
  }

  stopTimer(activeTask: activeTaskState, dispatch: Dispatch<any>, token: string) {
    const endTime = new Date().getTime();

    dispatch({
      type: 'UPDATE_ACTIVE_TASK_TIME',
      payload: {
        stop: endTime,
        duration: endTime - new Date(activeTask.start).getTime(),
        at: endTime + 1000,
        isTimeActive: false,
      },
    });

    this.updateActiveTask(token, this.defaultData); // fetch на обновление таска. Скидывает до дефолтных значений
  }

  async updateActiveTask(token: string, data: activeTaskState) {
    try {
      await activeTaskAPI.updateActiveTask(token, data);
    } catch (error) {
      console.error(error);
    }
  }
}

const taskHandler = new TaskHandler();

export { taskHandler };
