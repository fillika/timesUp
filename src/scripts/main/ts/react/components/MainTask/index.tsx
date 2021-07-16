import React, { memo } from 'react';
import { TaskType } from 'Types/tasks';
import { SubTasks } from 'App/components/SubTasks';
import { RangeTime } from 'App/components/RangeTime';
import { DeleteIcon } from 'App/components/DeleteIcon';
import { ContinueButton } from 'App/components/ContinueButton';
import { useHandlers } from './hooks/useHandlers';
import { Counter } from './Counter';

type TaskData = {
  data: TaskType;
};

export const MainTask = memo<TaskData>(
  ({ data }) => {
    const [isUnmounting, isActive, isTyping, name, setActive, deleteTask, updateTask, onChange, onKeyPress] =
      useHandlers(data);

    return (
      <li className={`task-list__task ${isUnmounting ? 'task-list__task--unmounting' : ''}`}>
        <div className='task task--parent'>
          <Counter isActive={isActive} time={data.time} onClick={setActive} />

          <div className='task__input-wrapper'>
            <input type='text' onBlur={updateTask} onChange={onChange} onKeyPress={onKeyPress} defaultValue={name} />
          </div>

          <div className='task-panel'>
            <DeleteIcon isTyping={isTyping} onClickHandler={deleteTask} />
            <RangeTime data={data} />
            <ContinueButton name={name} />
          </div>
        </div>

        {isActive && data.time !== undefined && data.time.length > 1 && <SubTasks data={data.time} name={name} />}
      </li>
    );
  },
  (prev, next) => (prev.data === next.data ? true : false)
);
