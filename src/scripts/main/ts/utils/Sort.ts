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
        this.createFirstSortedTask(tasks, el);
      } else {
        const index = _.findIndex(tasks, ['date', date]);

        if (index === -1) {
          this.createFirstSortedTask(tasks, el);
        } else {
          this.findDuplicatesPush(tasks[index].tasks, el);
        }
      }
    });

    return tasks;
  }

  createFirstSortedTask(tasks: SortedTask[], el: TaskType): void {
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
  findDuplicatesPush(taskArr: TaskType[], el: TaskType) {
    const index = _.findIndex(taskArr, ['name', el.name]);

    if (index !== -1) {
      if (taskArr[index].time === undefined) {
        taskArr[index].time = [];

        taskArr[index].time!.push(this.createTask(taskArr[index]));
        taskArr[index].time!.push(this.createTask(el));

        taskArr[index].duration += el.duration;
      } else {
        taskArr[index].time!.push(this.createTask(el));
        taskArr[index].duration += el.duration;
      }
    } else {
      taskArr.push(el);
    }
  }

  findDuplicatesUnshift(taskArr: TaskType[], el: TaskType) {
    const index = _.findIndex(taskArr, ['name', el.name]);

    if (index !== -1) {
      if (taskArr[index].time === undefined) {
        taskArr[index].time = [];

        taskArr[index].time!.unshift(this.createTask(taskArr[index]));
        taskArr[index].time!.unshift(this.createTask(el));

        taskArr[index].duration += el.duration;
      } else {
        taskArr[index].time!.unshift(this.createTask(el));
        taskArr[index].duration += el.duration;
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
