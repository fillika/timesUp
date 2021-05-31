import React, { ChangeEvent, useState } from 'react';

type TimeType = {
  from: number;
  to: number;
};

type TaskType = {
  name: string;
  time: TimeType;
};

type SubTasksType = {
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
      <span>{getTime(from)}</span>-<span>{getTime(to)}</span>
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

const Task: React.FC<TaskType> = ({ name, time }) => {
  const [value, setValue] = useState(name);
  const { from, to } = time;

  return (
    <div className='task task--child'>
      <input onChange={onChange} type='text' value={value} />
      <Time from={from} to={to} />
    </div>
  );

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }
};

const SubTasks: React.FC<SubTasksType> = ({ name, time }) => {
  return (
    <>
      {time.map((time, index) => (
        <Task name={name} key={index} time={time} />
      ))}
    </>
  );
};

export default SubTasks;
