import React, { ChangeEvent, FocusEvent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TaskType, TimeType } from '../../types/tasks';
import { RootState } from './../../store/index';

type Task = {
  name: string;
  time: TimeType;
};

type SubTask = {
  name: string;
  time: TimeType[];
};

type TimeComponent = {
  from: number;
  to: number;
};

/**
 * Локально в файле создал. Изолировал рендер внутри функции, чтобы не было проблем с оптимизацией
 */

const Time: React.FC<TimeComponent> = ({ from, to }) => {
  return (
    <div>
      <span>{getTime(from)}</span>&nbsp;-&nbsp;<span>{getTime(to)}</span>
    </div>
  );

  function getTime(num: number): string {
    const hours = new Date(num).getHours();
    const minutes = new Date(num).getMinutes();
    const hoursResult = hours < 10 ? `0${hours}` : hours;
    const minutesResult = minutes < 10 ? `0${minutes}` : minutes;

    return `${hoursResult}:${minutesResult}`;
  }
};

const Task: React.FC<Task> = ({ name, time }) => {
  // TODO понять, с каким таском мы работаем, возможно хранить его где-то в локальном стейте или редаксе
  // TODO или передавать сюда
  const taskArr = useSelector((state: RootState) => state.tasks.taskArr);
  const dispatch = useDispatch();
  const [value, setValue] = useState(name);

  return (
    <div className='task task--child'>
      <input onChange={onChange} onBlur={onBlur} type='text' value={value} />
      <Time from={time.start} to={time.end} />
    </div>
  );

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  function onBlur(event: FocusEvent<HTMLInputElement>) {
    const val = event.target.value;
    setValue(val);


    // TODO Фильтровать и обновлять таску если отличается name
    // dispatch({ type: 'UPDATE_TASK', payload: taskArrCopy }); // Меняю state
  }
};

const SubTasks: React.FC<SubTask> = ({ name, time }) => {
  return (
    <>
      {time.map(time => (
        <Task name={name} key={time._id} time={time} />
      ))}
    </>
  );
};

export default SubTasks;
