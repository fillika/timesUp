import { SortedTask, TaskType, DatabaseTask } from 'Types/tasks';
import clone from 'ramda/src/clone';
import reduce from 'ramda/src/reduce';
import compose from 'ramda/src/compose';
import findIndex from 'ramda/src/findIndex';
import propEq from 'ramda/src/propEq';
class Sort {
  constructor() {}

  /**
   * Функция сортировки полученных с сервера данных. Мы принимаем данные в "сыром" виде
   * сортированный список тасков по убыванию. В этой функции мы создаем массив объектов, которые объеденены по дате
   */
  sortData(taskArr: DatabaseTask[]): SortedTask[] {
    const reduceIterator = (result: SortedTask[], el: DatabaseTask) => {
      const date = new Date(el.at).toLocaleDateString();

      // Тут Я создаю самый первый таск
      if (!result.length) {
        const sortedTask = this.createFirstSortedTask(el);
        result.push(sortedTask);
      } else {
        // Ищу таски с одинаковой датой
        const index = findIndex(propEq('date', date))(result);

        if (index === -1) {
          const sortedTask = this.createFirstSortedTask(el);
          result.push(sortedTask);
        } else {
          this.findDuplicatesAndPush(result[index].mainTaskList, el);
        }
      }

      return result;
    };

    const reducedList = reduce(reduceIterator, []);

    return compose(reducedList, clone)(taskArr);
  }

  createFirstSortedTask(el: TaskType): SortedTask {
    return {
      date: new Date(el.at).toLocaleDateString(),
      dateISO: el.at,
      mainTaskList: [el],
    };
  }

  /**
   * Логика функции в том, что когда мы формирует массив объектов с уникальными ключами в виде даты
   * мы можем встретить одинаковые таски внутри одной даты (например пользователь приступал к одной
   * и той же задаче в течении дня несколько раз)
   * поэтому, мы добавляем поле time, в котором перечисляем все время для тасков с одинаковыми именами и суммируем
   * duration, чтобы меньше вычислений делать при рендере
   */
  findDuplicatesAndPush(taskArr: TaskType[], el: TaskType) {
    const index = findIndex(propEq('name', el.name))(taskArr);

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
    const index = findIndex(propEq('name', el.name))(taskArr);
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
export const sort = new Sort();
