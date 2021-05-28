import React, { ChangeEvent, useState } from 'react';

type TaskType = {
  text: string;
};

type SubTasksType = {
  subTasks: string[];
};

/**
 * Локально в файле создал. Изолировал рендер внутри функции, чтобы не было проблем с оптимизацией
 */
const Task: React.FC<TaskType> = ({ text }) => {
  const [value, setValue] = useState(text);

  return (
    <div className='task task--child'>
      <input onChange={onChange} type='text' value={value} />
    </div>
  );

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }
};

const SubTasks: React.FC<SubTasksType> = ({ subTasks }) => {
  return (
    <>
      {subTasks.map((text, index) => (
        <Task text={text} key={index} />
      ))}
    </>
  );
};

export default SubTasks;
