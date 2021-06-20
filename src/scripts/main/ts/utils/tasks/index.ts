import { SortedTask } from '../../types/tasks';
import { TaskType } from 'Scripts/main/ts/types/tasks';
import _ from 'lodash';

type Time = {
  hours: number | string;
  minutes: number | string;
  seconds: number | string;
};

export function countTotalTime(result: number): string {
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
export function sortData(taskArr: TaskType[]): SortedTask[] {
  const tasks: SortedTask[] = [];

  // todo где то здесь надо дополнительно объединять таски

  taskArr.forEach((el: TaskType) => {
    const date = new Date(el.at).toLocaleDateString();

    if (!tasks.length) {
      createFirstSortedTask(tasks, el);
    } else {
      const index = _.findIndex(tasks, ['date', date]);

      if (index === -1) {
        createFirstSortedTask(tasks, el);
      } else {
        findDuplicatesPush(tasks[index].tasks, el);
      }
    }
  });

  return tasks;
}

function createFirstSortedTask(tasks: SortedTask[], el: TaskType): void {
  const date = new Date(el.at).toLocaleDateString();

  const tempObj: SortedTask = {
    date: '',
    dateISO: '',
    tasks: [],
  };

  tempObj.date = date;
  tempObj.dateISO = el.at;
  tempObj.tasks.push(el);

  tasks.push(tempObj);
}

/**
 * Логика функции в том, что когда мы формирует массив объектов с уникальными ключами в виде даты
 * мы можем встретить одинаковые таски внутри одной даты (например пользователь приступал к одной
 * и той же задаче в течении дня несколько раз)
 * поэтому, мы добавляем поле time, в котором перечисляем все время для тасков с одинаковыми именами и суммируем
 * duration, чтобы меньше вычислений делать при рендере
 */
export function findDuplicatesPush(taskArr: TaskType[], el: TaskType) {
  const index = _.findIndex(taskArr, ['name', el.name]);

  if (index !== -1) {
    if (taskArr[index].time === undefined) {
      taskArr[index].time = [];

      taskArr[index].time!.push({
        start: taskArr[index].start,
        stop: taskArr[index].stop,
      });
      taskArr[index].time!.push({
        start: el.start,
        stop: el.stop,
      });

      taskArr[index].duration += el.duration;
    } else {
      taskArr[index].time!.push({
        start: el.start,
        stop: el.stop,
      });
      taskArr[index].duration += el.duration;
    }
  } else {
    taskArr.push(el);
  }
}

export function findDuplicatesUnshift(taskArr: TaskType[], el: TaskType) {
  const index = _.findIndex(taskArr, ['name', el.name]);

  if (index !== -1) {
    if (taskArr[index].time === undefined) {
      taskArr[index].time = [];

      taskArr[index].time!.unshift({
        start: taskArr[index].start,
        stop: taskArr[index].stop,
      });
      taskArr[index].time!.unshift({
        start: el.start,
        stop: el.stop,
      });

      taskArr[index].duration += el.duration;
    } else {
      taskArr[index].time!.unshift({
        start: el.start,
        stop: el.stop,
      });
      taskArr[index].duration += el.duration;
    }
  } else {
    taskArr.unshift(el);
  }
}
