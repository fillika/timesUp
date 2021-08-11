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

// update task date by ID
type TDatePickerData = {
  _id: string;
  start: string;
  stop: string;
  startDate: string;
};

const getHours = (time: string) => Number(time.slice(0, 2));
const getMinutes = (time: string) => Number(time.slice(3));
const toISOString = (time: number) => new Date(time).toISOString();
const calcTimeTemplate = curry((day: string, time: string) =>
  new Date(day).setHours(getHours(time), getMinutes(time), 0, 0)
);

export const getResult = (data: TDatePickerData) => {
  const calcTime = calcTimeTemplate(data.startDate);

  const start = calcTime(data.start);
  const stop = calcTime(data.stop) <= start ? start + 1000 : calcTime(data.stop); // TODO Защита от дурака. Убрать позже
  const at = start + 1000;
  const duration = stop - start;

  return {
    _id: data._id,
    start: toISOString(start),
    stop: toISOString(stop),
    at: toISOString(at),
    duration,
  };
};