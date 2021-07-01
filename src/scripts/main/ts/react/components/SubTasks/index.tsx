import React from 'react';
import { TimeType } from 'Types/tasks';
import { Task } from './Task';

type SubTask = {
  name: string;
  data: TimeType[];
};

export const SubTasks: React.FC<SubTask> = ({ data, name }) => {
  return (
    <>
      {data.map(({ start, stop, _id }) => (
        <Task key={_id} name={name} start={start} stop={stop} _id={_id} />
      ))}
    </>
  );
};