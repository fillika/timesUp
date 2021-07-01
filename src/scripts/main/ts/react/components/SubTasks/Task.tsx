import React from 'react';
import { Time } from './Time';
import trashIcon from 'Images/icons/trash.svg';
import playBtn from 'Images/icons/play.svg';
import { useStateTask } from './hooks/useStateTask';

type Task = {
  _id: string;
  name: string;
  start: string;
  stop: string;
};

export const Task: React.FC<Task> = ({ name, start, stop, _id }) => {
  const [isUnmounting, value, updateTask, deleteTaskByID, startTask, onChange] = useStateTask(name, _id);

  return (
    <div className={`task task--child ${isUnmounting ? 'task--unmounting' : ''}`}>
      <input onChange={onChange} onBlur={updateTask} type='text' value={value} />
      <div className='task-panel'>
        <div onClick={deleteTaskByID} className='task-panel__icon task-panel__icon--delete'>
          <img src={trashIcon} alt='Удалить таск' />
        </div>
        <div>
          <Time start={start} stop={stop} />
        </div>
        <div onClick={startTask} className='task-panel__icon task-panel__icon--play'>
          <img src={playBtn} alt='Продолжить задачу' />
        </div>
      </div>
    </div>
  );

};
