import _ from 'lodash';
import { SortedTask, TaskType } from 'Types/tasks';

class Sort {
  constructor() {}

  /**
   * Функция сортировки полученных с сервера данных. Мы принимаем данные в "сыром" виде
   * сортированный список тасков по убыванию. В этой функции мы создаем массив объектов, которые объеденены по дате
   */
  sortData(taskArr: TaskType[]): SortedTask[] {
    const tasks: SortedTask[] = [];

    taskArr.forEach((el: TaskType) => {
      const date = new Date(el.at).toLocaleDateString();

      if (!tasks.length) {
        const sortedTask = this.createFirstSortedTask(el);
        tasks.push(sortedTask);
      } else {
        const index = _.findIndex(tasks, ['date', date]);

        if (index === -1) {
          const sortedTask = this.createFirstSortedTask(el);
          tasks.push(sortedTask);
        } else {
          this.findDuplicatesPush(tasks[index].tasks, el);
        }
      }
    });

    return tasks;
  }

  createFirstSortedTask(el: TaskType): SortedTask {
    const date = new Date(el.at).toLocaleDateString();

    const tempObj: SortedTask = {
      date: '',
      dateISO: '',
      tasks: [],
    };

    tempObj.date = date;
    tempObj.dateISO = el.at;
    tempObj.tasks.push(el);

    return tempObj;
  }

  /**
   * Логика функции в том, что когда мы формирует массив объектов с уникальными ключами в виде даты
   * мы можем встретить одинаковые таски внутри одной даты (например пользователь приступал к одной
   * и той же задаче в течении дня несколько раз)
   * поэтому, мы добавляем поле time, в котором перечисляем все время для тасков с одинаковыми именами и суммируем
   * duration, чтобы меньше вычислений делать при рендере
   */
  findDuplicatesPush(taskArr: TaskType[], el: TaskType) {
    const index = _.findIndex(taskArr, ['name', el.name]);
    const task = taskArr[index];

    if (index !== -1) {
      if (task.time === undefined) {
        task.time = [];

        task.time.push(this.createTask(task));
        task.time.push(this.createTask(el));

        task.duration += el.duration;
      } else {
        task.time.push(this.createTask(el));
        task.duration += el.duration;
      }
    } else {
      taskArr.push(el);
    }
  }

  findDuplicatesUnshift(taskArr: TaskType[], el: TaskType) {
    const index = _.findIndex(taskArr, ['name', el.name]);
    const task = taskArr[index];

    if (index !== -1) {
      if (task.time === undefined) {
        task.time = [];

        task.time.unshift(this.createTask(task));
        task.time.unshift(this.createTask(el));

        task.duration += el.duration;
      } else {
        task.time.unshift(this.createTask(el));
        task.duration += el.duration;
      }
    } else {
      taskArr.unshift(el);
    }
  }

  createTask(el: TaskType) {
    return {
      _id: el._id,
      start: el.start,
      stop: el.stop,
    };
  }
}
const sort = new Sort();

export { sort };
