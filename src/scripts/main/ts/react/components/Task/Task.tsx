import React, { useState, useEffect, ChangeEvent } from 'react';
import { TaskType } from '../../../types/tasks';
import SubTasks from '../SubTasks';
import { countTotalTime } from './../../../utils/tasks/index';

type TaskData = {
  data: TaskType;
};

const Task: React.FC<TaskData> = ({ data }) => {
  const [isActive, setActive] = useState(false);
  const [value, setValue] = useState(data.name);

  const $counter = data.time.length > 1 && (
    <div className='task__counter' onClick={() => setActive(!isActive)}>
      {data.time.length}
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
          <span>{countTotalTime(data.time)}</span>
        </div>
      </div>

      {isActive && data.time.length > 1 && <SubTasks name={data.name} time={data.time} />}
    </li>
  );
};

export default Task;
