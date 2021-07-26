import remove from 'lodash/remove';
import { TaskState } from './types';

export const defaultData = {
  at: 0,
  name: '',
  start: 0,
  stop: 0,
  duration: 0,
  isTimeActive: false,
  totalTime: '0:00:00',
};

export const updateTaskByName = (state: TaskState, payload: { name: string; date: string; newName: string }) => {
  const { name, date, newName } = payload;

  return state.databaseTaskList.map(task => {
    const isDateEqual = new Date(date).toLocaleDateString() === new Date(task.at).toLocaleDateString();

    if (task.name === name && isDateEqual) {
      task.name = newName;
      return task;
    }

    return task;
  });
};
export const updateTaskByID = (state: TaskState, payload: { newName: string; taskID: string }) => {
  const { newName, taskID } = payload;

  return state.databaseTaskList.map(task => {
    if (task._id === taskID) {
      task.name = newName;
      return task;
    }

    return task;
  });
};
export const deleteTaskByName = (state: TaskState, payload: { date: string; name: string }) => {
  const newArr = [...state.databaseTaskList];
  const { date, name } = payload;

  remove(newArr, task => {
    return task.name === name && new Date(date).toLocaleDateString() === new Date(task.at).toLocaleDateString();
  });

  return newArr;
};
