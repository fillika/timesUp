import React, { ChangeEvent, useState } from 'react';

type TimeType = {
  from: number;
  to: number;
};

type TaskType = {
  name: string;
};

type SubTasksType = {
  name: string,
  time: TimeType[];
};

/**
 * Локально в файле создал. Изолировал рендер внутри функции, чтобы не было проблем с оптимизацией
 */
const Task: React.FC<TaskType> = ({ name }) => {
  const [value, setValue] = useState(name);

  return (
    <div className='task task--child'>
      <input onChange={onChange} type='text' value={value} />
    </div>
  );

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }
};

const SubTasks: React.FC<SubTasksType> = ({ name, time }) => {
  return (
    <>
      {time.map((_, index) => (
        <Task name={name} key={index} />
      ))}
    </>
  );
};

export default SubTasks;
