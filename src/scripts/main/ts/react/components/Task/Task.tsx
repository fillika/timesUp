import React, { useState, useEffect, ChangeEvent } from 'react';
import { TaskType } from '../../../types/tasks';
import SubTasks from '../SubTasks';
import { countTotalTime } from './../../../utils/tasks/index';

type TaskData = {
  data: TaskType;
};

const Task: React.FC<TaskData> = ({ data }) => {
  const [isActive, setActive] = useState(false);
  const [task, setTask] = useState(data);
  const [value, setValue] = useState(task.name);

  const $counter = task.time.length > 1 && (
    <div className='task__counter' onClick={() => setActive(!isActive)}>
      {task.time.length}
    </div>
  );

  function onBlur(event: React.FocusEvent<HTMLInputElement>) {
    console.log(event.target.value);
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
        <div>
          <span>{countTotalTime(task.time)}</span>
        </div>
      </div>

      {isActive && task.time.length > 1 && <SubTasks name={task.name} time={task.time} />}
    </li>
  );
};

export default Task;
