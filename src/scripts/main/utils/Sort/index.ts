import { SortedTask, TaskType, DatabaseTask } from 'Types/tasks';
import clone from 'ramda/src/clone';
import reduce from 'ramda/src/reduce';
import compose from 'ramda/src/compose';
import findIndex from 'ramda/src/findIndex';
import prop from 'ramda/src/prop';
import propEq from 'ramda/src/propEq';
import sortWith from 'ramda/src/sortWith';
import descend from 'ramda/src/descend';
import { calcDuration } from 'Utils/Date';
class Sort {
  constructor() {}

  /**
   * Функция сортировки полученных с сервера данных. Мы принимаем данные в "сыром" виде
   * сортированный список тасков по убыванию. В этой функции мы создаем массив объектов, которые объеденены по дате
   */
  sortData(taskArr: DatabaseTask[]): SortedTask[] {
    const propAt = prop('at');
    const sortDESCByAt = sortWith([descend<DatabaseTask>(propAt)]);

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
    const sortList = compose(reducedList, sortDESCByAt, clone);

    return sortList(taskArr);
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
   * и той же задаче в течении дня несколько раз) поэтому, мы добавляем поле time,
   * в котором перечисляем все время для тасков с одинаковыми именами и суммируем duration
   */
  findDuplicatesAndPush(taskArr: TaskType[], el: TaskType) {
    const index = findIndex(propEq('name', el.name))(taskArr);

    const task = taskArr[index];

    if (index !== -1) {
      if (task.time === undefined) {
        task.time = [
          this.createTask(task),
          this.createTask(el)
        ];

        task.duration += el.duration;
      } else {
        task.time.push(this.createTask(el));
        task.duration += el.duration;
      }
    } else {
      taskArr.push(el);
    }
  }

  createTask(el: TaskType) {
    return {
      _id: el._id,
      start: el.start,
      stop: el.stop,
      duration: calcDuration(el.stop, el.start),
    };
  }
}
export const sort = new Sort();
