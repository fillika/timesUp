import { SortedTaskList, TimeType } from '../../types/tasks';
import { TaskType } from 'Scripts/main/ts/types/tasks';
import _ from 'lodash';

type Time = {
  hours: number | string;
  minutes: number | string;
  seconds: number | string;
};

export function countTotalTime(timeArr: TimeType[]): string {
  let result = 0;

  timeArr.forEach(timeObj => {
    result += new Date(timeObj.end).getTime() - new Date(timeObj.start).getTime();
  });

  return convertToStringFormat(createTimeObj(result));
}

export function createTimeObj(result: number): Time {
  const time: Time = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  time.seconds = Math.floor(result / 1000) % 60;
  time.minutes = Math.floor(result / 1000 / 60) % 60;
  time.hours = Math.floor(result / 1000 / 60 / 60);

  return time;
}

export function convertToStringFormat(time: Time): string {
  if (time.seconds.toString().length === 1) {
    time.seconds = `0${time.seconds}`;
  }

  if (time.minutes.toString().length === 1) {
    time.minutes = `0${time.minutes}`;
  }

  return `${time.hours}:${time.minutes}:${time.seconds}`;
}

/**
 * Функция сортировки полученных с сервера данных. Мы принимаем данные в "сыром" виде
 * сортированный список тасков по убыванию. В этой функции мы создаем массив объектов, которые объеденены по дате
 */
export function sortData(taskArr: TaskType[]): SortedTaskList[] {
  const tasks: SortedTaskList[] = [];

  taskArr.forEach((el: TaskType) => {
    const date = new Date(el.at).toLocaleDateString();

    if (!tasks.length) {
      createFirstSortedTask(tasks, date, el);
    } else {
      const index = _.findIndex(tasks, ['date', date]);

      if (index === -1) {
        createFirstSortedTask(tasks, date, el);
      } else {
        tasks[index].tasks.push(el);
      }
    }
  });

  return tasks;
}

function createFirstSortedTask(tasks: SortedTaskList[], date: string, el: TaskType): void {
  const tempObj: SortedTaskList = {
    date: '',
    tasks: [],
  };

  tempObj.date = date;
  tempObj.tasks.push(el);
  tasks.push(tempObj);
}
