import React, { useState, ChangeEvent } from 'react';
import { TaskType } from '../../types/tasks';
import SubTasks from './SubTasks';

type TaskData = {
  data: TaskType;
};

const Task: React.FC<TaskData> = ({ data }) => {
  const { name, time, _id } = data;
  const [isActive, setActive] = useState(false);
  const [value, setValue] = useState(name);

  const $counter = time.length > 1 && (
    <div className='task__counter' onClick={() => setActive(!isActive)}>
      {time.length}
    </div>
  );

  function onBlur(event: React.FocusEvent<HTMLInputElement>) {
    console.log(event.target.value);
    console.log("Task _id:", _id);
  }

  return (
    <li className='task-list__task'>
      <div className='task task--parent'>
        {$counter}
        <div className='task__input-wrapper'>
          <input
            onChange={(event: ChangeEvent<HTMLInputElement>) => setValue(event?.target.value)}
            onBlur={onBlur}
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
