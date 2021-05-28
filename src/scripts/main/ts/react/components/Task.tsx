import React, { useState, ChangeEvent } from 'react';
import SubTasks from './SubtTasks';

type TaskType = {
  tasks: string[];
};

const Task: React.FC<TaskType> = ({ tasks }) => {
  const [initName] = tasks;
  const [isActive, setActive] = useState(false);
  const [value, setValue] = useState(initName);

  const $counter = tasks.length > 1 && (
    <div className='task__counter' onClick={() => setActive(!isActive)}>
      {tasks.length}
    </div>
  );

  return (
    <li className='task-list__task'>
      <div className='task task--parent'>
        {$counter}
        <div>
          <input
            onChange={(event: ChangeEvent<HTMLInputElement>) => setValue(event?.target.value)}
            type='text'
            value={value}
          />
        </div>
      </div>

      {isActive && <SubTasks subTasks={tasks} />}
    </li>
  );
};

export default Task;
