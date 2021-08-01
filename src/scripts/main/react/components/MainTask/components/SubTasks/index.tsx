import React from 'react';
import { TimeType } from 'Types/tasks';
import { Task } from './components/Task';

type SubTask = {
  name: string;
  data?: TimeType[];
};

export const SubTasks: React.FC<SubTask> = ({ data, name }) => {
  if (data === undefined) return null;

  return (
    <>
      {data.map(timeTypeData => (
        <Task name={name} data={timeTypeData} key={timeTypeData._id} />
      ))}
    </>
  );
};
