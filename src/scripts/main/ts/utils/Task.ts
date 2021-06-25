import { Dispatch } from 'react';
import { activeTaskState } from 'Redux/activeTask';
import activeTaskAPI from 'Api/activeTask';
import { Store } from 'redux';

class Task {
  defaultData: activeTaskState;

  constructor() {
    this.defaultData = {
      at: 0,
      userID: '60c8be578a7a1e9f8c8edecb',
      name: '',
      start: 0,
      stop: 0,
      duration: 0,
      isTimeActive: false,
      totalTime: '0:00:00',
    };
  }

  taskHandler(activeTask: activeTaskState, dispatch: Dispatch<any>, store: Store) {
    if (activeTask.name.trim() === '') {
      // TODO создать модалку с оповещалкой
      console.log('Напишите имя задачи');
      return;
    }

    dispatch({ type: 'UPDATE_ACTIVE_TASK_STATUS', payload: !activeTask.isTimeActive });
    // * Тут нет рендера

    if (store.getState().activeTask.isTimeActive) {
      const start = new Date().getTime();
      dispatch({ type: 'UPDATE_ACTIVE_TASK_START', payload: start });
      this.updateActiveTask(store.getState().activeTask);
    } else {
      this.stopTimer(activeTask, dispatch);
    }
  }

  stopTimer(activeTask: activeTaskState, dispatch: Dispatch<any>) {
    const endTime = new Date().getTime();

    dispatch({
      type: 'UPDATE_ACTIVE_TASK_TIME',
      payload: {
        stop: endTime,
        duration: endTime - new Date(activeTask.start).getTime(),
        at: endTime + 1000,
      },
    });

    this.updateActiveTask(this.defaultData); // fetch на обновление таска. Скидывает до дефолтных значений
  }

  async updateActiveTask(data: activeTaskState) {
    try {
      await activeTaskAPI.updateActiveTask(data.userID, data);
    } catch (error) {
      console.error(error);
    }
  }

  
}

const taskInstance = new Task();

export { taskInstance };
