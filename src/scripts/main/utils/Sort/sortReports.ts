import uniqueId from 'lodash/uniqueId';
import clone from 'ramda/src/clone';
import compose from 'ramda/src/compose';
import path from 'ramda/src/path';
import { ExtendedDBTask, SortedReport } from 'Redux/reducers/reportReducer/types';
import { DatabaseTask } from 'Types/tasks';

// Сгрупировать таски с одинаковым именем
const groupDatabaseTask = (arr: ExtendedDBTask[]) => {
  const result: SortedReport = {};

  
  arr.forEach(task => {
    // Найти есть ли подобный таск в массиве с именем
    if (result[task.name] === undefined) {
      // path([task.name], result)
      result[task.name] = {
        taskList: [],
        total: 0,
        // Create uniq name for each group task
        name: uniqueId('task-name-'),
      };
      result[task.name].taskList = [];
      result[task.name].total += task.duration;
      result[task.name].taskList.push(task);
    } else {
      result[task.name].total += task.duration;
      result[task.name].taskList.push(task);
    }
  });

  return result;
};

// Меняю местами имя таска и его уникальный ключ name, который будет использоваться как часть URL
const renameTaskObject = (taskObj: SortedReport) => {
  const renamedResult: SortedReport = {};

  for (const name in taskObj) {
    if (Object.prototype.hasOwnProperty.call(taskObj, name)) {
      const element = taskObj[name];

      renamedResult[element.name] = element;
      renamedResult[element.name].name = name;
    }
  }

  return renamedResult;
};

export const sortReports: (arr: DatabaseTask[]) => SortedReport = compose(
  renameTaskObject,
  groupDatabaseTask,
  clone
);
