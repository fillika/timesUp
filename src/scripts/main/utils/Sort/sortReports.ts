import uniqueId from 'lodash/uniqueId';
import clone from 'ramda/src/clone';
import compose from 'ramda/src/compose';
import { ExtendedDBTask, SortedReport } from 'Redux/reducers/reportReducer/types';
import { DatabaseTask } from 'Types/tasks';

// Сгрупировать таски с одинаковым именем
const groupDatabaseTask = (arr: ExtendedDBTask[]) => {
  return arr.reduce((result: SortedReport, currentDBTask: ExtendedDBTask) => {
    // Найти есть ли подобный таск в массиве с именем
    if (result[currentDBTask.name] === undefined) {
      result[currentDBTask.name] = {
        taskList: [currentDBTask],
        total: currentDBTask.duration,
        name: uniqueId('task-name-'),
      };
    } else {
      result[currentDBTask.name].total += currentDBTask.duration;
      result[currentDBTask.name].taskList.push(currentDBTask);
    }

    return result;
  }, {})
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
