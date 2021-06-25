import React, { ChangeEvent, FocusEvent, useState, useEffect } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { TimeType } from 'Types/tasks';
import trashIcon from 'Images/icons/trash.svg';
import taskAPI from 'Api/tasks';
import { sort } from 'Utils/Sort';
import { time } from 'Utils/Time';
import playBtn from 'Images/icons/play.svg';
import { RootState } from 'Redux/index';
import { taskInstance } from 'Utils/Task';
import { useUnmounting } from 'Utils/hooks/useUnmounting';


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
    <div className='task-panel__time-wrapper'>
      <span className='task-panel__time task-panel__time--range'>
        {time.createTemplateTime(start)}&nbsp;-&nbsp;{time.createTemplateTime(stop)}
      </span>
      <span className='task-panel__time task-panel__time--total'>
        {time.countTotalTime(new Date(stop).getTime() - new Date(start).getTime())}
      </span>
    </div>
  );
};

const Task: React.FC<Task> = ({ name, start, stop, _id }) => {
  const dispatch = useDispatch();
  const activeTask = useSelector((state: RootState) => state.activeTask);
  const store = useStore();
  const [value, setValue] = useState(name);
  const [isUnmounting, startUnmount] = useUnmounting();

  useEffect(() => {
    setValue(name);
  }, [name]);

  useEffect(() => {
    console.log('GONDES RENDER');
  }, [activeTask]);

  // Todo рефактор - вынести логику в отдельный хук
  async function deleteTaskByID() {
    const response = await taskAPI.deleteTaskByID(_id);

    if (response.status === 'success') {
      if (typeof startUnmount !== 'boolean') {
        // * Почему он считает, что startUnmount - bool?
        startUnmount(() => dispatch({ type: 'DELETE_TASKS_BY_ID', payload: sort.sortData(response.data.tasks) }));
        console.log(response.message); // Todo выводить в всплывашки
      }
    } else {
      console.error('Ошибка. Таск не удален по какой-то причине');
    }
  }

  async function updateTask(event: FocusEvent<HTMLInputElement>) {
    const val = event.target.value.trim();

    try {
      if (val !== name) {
        const response = await taskAPI.updateTask(_id, {
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

 function startTask() {
    dispatch({ type: 'UPDATE_ACTIVE_TASK_NAME', payload: name });
    // * При первоначальном клике, когда поле пустое, мы передаем activeTask без обновленного
    if (activeTask.name !== '') {
      taskInstance.taskHandler(activeTask, dispatch, store);
    } else {
      console.log('Мы не вызвали рендер и не обновили state');
    }
  }

  return (
    <div className={`task task--child ${isUnmounting ? 'task--unmounting' : ''}`} >
      <input onChange={onChange} onBlur={updateTask} type='text' value={value} />
      <div className='task-panel'>
        <div onClick={deleteTaskByID} className='task-panel__icon task-panel__icon--delete'>
          <img src={trashIcon} alt='Удалить таск' />
        </div>
        <div>
          <Time start={start} stop={stop} />
        </div>
        <div onClick={startTask} className='task-panel__icon task-panel__icon--play'>
          <img src={playBtn} alt='Продолжить задачу' />
        </div>
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
