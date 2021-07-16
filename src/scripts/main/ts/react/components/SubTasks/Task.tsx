import React from 'react';
import { Time } from './Time';
import { useStateTask } from './hooks/useStateTask';
import { ContinueButton } from 'App/components/ContinueButton';
import { DeleteIcon } from '../DeleteIcon';

type Task = {
  _id: string;
  name: string;
  start: string;
  stop: string;
};

export const Task: React.FC<Task> = ({ name, start, stop, _id }) => {
  const [isUnmounting, isTyping, value, updateTask, deleteTask, onChange, onKeyPress] = useStateTask(
    name,
    _id
  );

  return (
    <div className={`task task--child ${isUnmounting ? 'task--unmounting' : ''}`}>
      <input onChange={onChange} onBlur={updateTask} onKeyPress={onKeyPress} type='text' value={value} />

      <div className='task-panel'>
        <DeleteIcon isTyping={isTyping} onClickHandler={deleteTask} />
        <div>
          <Time start={start} stop={stop} />
        </div>
        <ContinueButton name={name} />
      </div>
    </div>
  );
};
