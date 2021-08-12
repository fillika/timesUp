import reject from 'ramda/src/reject';
import clone from 'ramda/src/clone';
import curry from 'ramda/src/curry';

import { TaskState } from './types';
import { DatabaseTask } from 'Types/tasks';

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
  // Найти все таски по имени и дате. Дата нужна, чтобы одноименные таски не были удалены из других дней
  const { date, name } = payload;

  const filterPredicate = (task: DatabaseTask) =>
    task.name === name && new Date(date).toLocaleDateString() === new Date(task.at).toLocaleDateString();

  const result = reject(filterPredicate, clone(state.databaseTaskList));

  return result;
};

