import { Dispatch } from 'react';
import { activeTaskState } from 'Scripts/main/ts/redux/activeTask';
import activeTaskAPI from 'Api/activeTask';
import { Store } from 'redux';
import { createNotify } from 'Utils/helpers/createNotify';

class Task {
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

  startTimer(activeTask: activeTaskState, dispatch: Dispatch<any>, token: string) {
    if (activeTask.name.trim() === '') {
      createNotify('warning', 'У задачи должно быть имя :)', dispatch);
      return;
    }

    const start = new Date().getTime();
    dispatch({ type: 'UPDATE_ACTIVE_TASK_START', payload: start });
    // Тут статус isTimeActive равняется false. Нужно решить проблему 
    this.updateActiveTask(token, activeTask);
  }

  stopTimer(activeTask: activeTaskState, dispatch: Dispatch<any>, token: string) {
    const endTime = new Date().getTime();

    dispatch({
      type: 'UPDATE_ACTIVE_TASK_TIME',
      payload: {
        stop: endTime,
        duration: endTime - new Date(activeTask.start).getTime(),
        at: endTime + 1000,
        isTimeActive: false
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

const taskInstance = new Task();

export { taskInstance };
