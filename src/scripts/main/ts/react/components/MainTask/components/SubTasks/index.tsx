import React from 'react';
import { TimeType } from 'Types/tasks';
import { Task } from './components/Task';

type SubTask = {
  name: string;
  data: TimeType[];
};

export const SubTasks: React.FC<SubTask> = ({ data, name }) => {
  return (
    <>
      {data.map(timeTypeData => (
        <Task key={timeTypeData._id} name={name} data={timeTypeData} />
      ))}
    </>
  );
};
