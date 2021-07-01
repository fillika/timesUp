import { FocusEvent, useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { RootState } from 'Redux/rootReducer';
import { taskHandler } from 'Utils/TaskHandler';
import { sort } from 'Utils/Sort';
import taskAPI from 'Api/tasks';
import { useUnmounting } from 'App/hooks/useUnmounting';

type useStateTaskType = [
  boolean,
  string,
  (event: FocusEvent<HTMLInputElement>) => Promise<void>,
  () => Promise<void>,
  () => void,
  (event: ChangeEvent<HTMLInputElement>) => void
];

export function useStateTask(name: string, _id: string): useStateTaskType {
  const dispatch = useDispatch();
  const { activeTask, app } = useSelector((state: RootState) => state);
  const [value, setValue] = useState(name);
  const [isUnmounting, startUnmount] = useUnmounting();

  useEffect(() => {
    setValue(name);

    if (activeTask.name !== '') {
      console.log('У задачи есть имя');
    } else {
      console.log('Имени нет');
    }
  }, [activeTask.name]);


  // Todo привязка к статусу
  // useEffect(() => {
  //   if (activeTask.isTimeActive) {
  //     taskInstance.taskHandler(activeTask, dispatch, store);
  //   }
  // }, [activeTask.isTimeActive]);


  // Todo рефактор - вынести логику в отдельный хук
  async function deleteTaskByID() {
    if (app.token) {
      const response = await taskAPI.deleteTaskByID(_id, app.token);

      if (response.status === 'success') {
        if (typeof startUnmount !== 'boolean') {
          // * Почему он считает, что startUnmount - bool?
          startUnmount(() => dispatch({ type: 'DELETE_TASKS_BY_ID', payload: sort.sortData(response.data.tasks) }));
          console.log(response.message); // Todo выводить в всплывашки
        }
      } else {
        console.error('Ошибка. Таск не удален по какой-то причине');
      }
    } else {
      console.log('Нет токена');
    }
  }

  async function updateTask(event: FocusEvent<HTMLInputElement>) {
    const val = event.target.value.trim();

    try {
      if (val !== name && app.token) {
        const response = await taskAPI.updateTask(_id, { name: val }, app.token);
        dispatch({ type: 'UPDATE_TASK_LIST', payload: sort.sortData(response.data.tasks) });
      }
    } catch (error) {
      console.error(error);
      // Todo обработать ошибку
    }
  }

  // Todo - вынести функцию taskHandler в useEffect. Она должна запускаться, когда статус у таска изменился.
  function startTask() {
    dispatch({ type: 'UPDATE_ACTIVE_TASK_NAME', payload: name });
    // taskHandler.taskHandler(activeTask, dispatch, store);
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

  return [isUnmounting, value, updateTask, deleteTaskByID, startTask, onChange];
}
