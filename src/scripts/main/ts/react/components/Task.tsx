import React, { useState, ChangeEvent } from 'react';
import SubTasks from './SubtTasks';

type TimeType = {
  from: number;
  to: number;
};

type TaskType = {
  tasks: {
    name: string;
    time: TimeType[];
  };
};

const Task: React.FC<TaskType> = ({ tasks }) => {
  const { name, time } = tasks;
  const [isActive, setActive] = useState(false);
  const [value, setValue] = useState(name);

  const $counter = time.length > 1 && (
    <div className='task__counter' onClick={() => setActive(!isActive)}>
      {time.length}
    </div>
  );

  return (
    <li className='task-list__task'>
      <div className='task task--parent'>
        {$counter}
        <div className="task__input-wrapper">
          <input
            onChange={(event: ChangeEvent<HTMLInputElement>) => setValue(event?.target.value)}
            type='text'
            value={value}
          />
        </div>
      </div>

      {isActive && <SubTasks name={name} time={time} />}
    </li>
  );
};

export default Task;
