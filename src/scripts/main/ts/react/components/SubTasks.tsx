import React, { ChangeEvent, FocusEvent, useState, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { TimeType } from 'Types/tasks';
import trashIcon from 'Images/icons/trash.svg';
import api from 'Api/index';
import { sort } from 'Utils/Sort';

type Task = {
  _id: string;
  name: string;
  start: string;
  stop: string;
};

type SubTask = {
  name: string;
  data: TimeType[];
};

type TimeComponent = {
  start: string;
  stop: string;
};

/**
 * Локально в файле создал. Изолировал рендер внутри функции, чтобы не было проблем с оптимизацией
 */

const Time: React.FC<TimeComponent> = ({ start, stop }) => {
  return (
    <div>
      <span>{getTime(start)}</span>&nbsp;-&nbsp;<span>{getTime(stop)}</span>
    </div>
  );

  function getTime(num: number | string): string {
    const hours = new Date(num).getHours();
    const minutes = new Date(num).getMinutes();
    const seconds = new Date(num).getSeconds();

    const hoursResult = hours < 10 ? `0${hours}` : hours;
    const minutesResult = minutes < 10 ? `0${minutes}` : minutes;
    const secondResult = seconds < 10 ? `0${seconds}` : seconds;

    return `${hoursResult}:${minutesResult}:${secondResult}`;
  }
};

const Task: React.FC<Task> = ({ name, start, stop, _id }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(name);

  console.log(name);

  async function deleteTaskByID() {
    const date = new Date(stop).toLocaleDateString();
    const response = await api.deleteTaskByID(_id);

    if (response?.status) {
      dispatch({ type: 'DELETE_TASKS_BY_ID', payload: { _id, date, name } });
      console.log(response.message); // Todo выводить в всплывашки
    } else {
      console.error('Ошибка. Таск не удален по какой-то причине');
    }
  }

  async function updateTask(event: FocusEvent<HTMLInputElement>) {
    const val = event.target.value.trim();

    try {
      if (val !== name) {
        const response = await api.updateTask(_id, {
          name: val,
        });

        // ! Добавил 2 диспатча, так как при одном сортированный массив некорректно заменял данные.
        // Todo пофиксить
        dispatch({ type: 'UPDATE_TASK_LIST', payload: [] }); 
        dispatch({ type: 'UPDATE_TASK_LIST', payload: sort.sortData(response.data.tasks) });
      }
    } catch (error) {
      console.error(error);
      // Todo обработать ошибку
    }
  }

  return (
    <div className='task task--child'>
      <input onChange={onChange} onBlur={updateTask} type='text' value={value} />
      <div className='task-panel'>
        <div onClick={deleteTaskByID} className='task-panel__icon task-panel__icon--delete'>
          <img src={trashIcon} alt='Удалить таск' />
        </div>
        <Time start={start} stop={stop} />
      </div>
    </div>
  );

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }
};

const SubTasks: React.FC<SubTask> = ({ data, name }) => {
  return (
    <>
      {data.map(({ start, stop, _id }) => (
        <Task key={_id} name={name} start={start} stop={stop} _id={_id} />
      ))}
    </>
  );
};

export default SubTasks;
