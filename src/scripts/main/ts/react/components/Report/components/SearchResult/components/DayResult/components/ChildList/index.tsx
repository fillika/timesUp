import React from 'react';
import { ChildTask } from '../ChildTask/index';
import { TimeType } from 'Types/tasks';

export const ChildList: React.FC<{ name: string; time?: TimeType[] }> = ({ name, time }) => {
  if (time === undefined) return null;
  console.log(time);

  return (
    <div>
      {time.map(subTask => (
        <ChildTask name={name} key={subTask._id} />
      ))}
    </div>
  );
};
