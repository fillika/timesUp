import React from 'react';
import { Time } from './Time';
import trashIcon from 'Images/icons/trash.svg';
import { useStateTask } from './hooks/useStateTask';
import { ContinueButton } from 'App/components/ContinueButton';

type Task = {
  _id: string;
  name: string;
  start: string;
  stop: string;
};

export const Task: React.FC<Task> = ({ name, start, stop, _id }) => {
  const [isUnmounting, value, updateTask, deleteTask, onChange, onKeyPress] = useStateTask(name, _id);

  return (
    <div className={`task task--child ${isUnmounting ? 'task--unmounting' : ''}`}>
      <input onChange={onChange} onBlur={updateTask} onKeyPress={onKeyPress} type='text' value={value} />

      <div className='task-panel'>
        <div onClick={deleteTask} className='task-panel__icon task-panel__icon--delete'>
          <img src={trashIcon} alt='Удалить таск' />
        </div>
        <div>
          <Time start={start} stop={stop} />
        </div>

        <ContinueButton name={name} />
      </div>
    </div>
  );
};
