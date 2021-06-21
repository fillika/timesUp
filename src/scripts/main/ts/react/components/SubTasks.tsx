import React, { ChangeEvent, FocusEvent, useState, MouseEvent  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TimeType } from '../../types/tasks';
import { RootState } from './../../store/index';
import trashIcon from 'Images/icons/trash.svg';

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
    const hoursResult = hours < 10 ? `0${hours}` : hours;
    const minutesResult = minutes < 10 ? `0${minutes}` : minutes;

    return `${hoursResult}:${minutesResult}`;
  }
};

const Task: React.FC<Task> = ({ name, start, stop, _id }) => {
  // TODO понять, с каким таском мы работаем, возможно хранить его где-то в локальном стейте или редаксе
  // TODO или передавать сюда
  const taskArr = useSelector((state: RootState) => state.tasks.taskArr);
  const dispatch = useDispatch();
  const [value, setValue] = useState(name);

  return (
    <div className='task task--child'>
      <input onChange={onChange} onBlur={onBlur} type='text' value={value} />
      <div className='task-panel'>
        <div onClick={(event: MouseEvent<HTMLDivElement>) => console.log('Del:', _id)} className="task-panel__icon task-panel__icon--delete">
          <img src={trashIcon} alt='Удалить таск' />
        </div>
        <Time start={start} stop={stop} />
      </div>
    </div>
  );

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  function onBlur(event: FocusEvent<HTMLInputElement>) {
    const val = event.target.value;
    setValue(val);
    // TODO Фильтровать и обновлять таску если отличается name
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
