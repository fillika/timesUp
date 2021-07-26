import React from 'react';
import { TimeType } from 'Types/tasks';
import { Task } from './components/Task';

type SubTask = {
  isActive: boolean;
  name: string;
  data?: TimeType[];
};

export const SubTasks: React.FC<SubTask> = ({ isActive, data, name }) => {
  if (data === undefined) return null;

  return (
    <>
      {data.map(timeTypeData => (
        <Task name={name} data={timeTypeData} key={timeTypeData._id} />
      ))}
    </>
  );
};
