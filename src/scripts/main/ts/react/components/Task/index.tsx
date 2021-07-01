import React, { useState, ChangeEvent, Dispatch, useEffect } from 'react';
import { TaskType } from 'Types/tasks';
import { SubTasks } from 'App/components/SubTasks';
import trashIcon from 'Images/icons/trash.svg';
import { RangeTime } from 'App/components/RangeTime';
import { ContinueButton } from 'App/components/ContinueButton';
import { useHandlers } from './hooks/useHandlers';

type TaskData = {
  data: TaskType;
};

const Task: React.FC<TaskData> = ({ data }) => {
  const [isUnmounting, isActive, name, setActive, deleteTask, updateTask, onChange] = useHandlers(data);

  function counter() {
    if (data.time !== undefined) {
      if (data.time.length > 1) {
        return (
          <div className='task__counter' onClick={() => setActive(!isActive)}>
            {data.time.length}
          </div>
        );
      } else {
        setActive(false);
        return null;
      }
    }
  }

  return (
    <li className={`task-list__task ${isUnmounting ? 'task-list__task--unmounting' : ''}`}>
      <div className='task task--parent'>
        {counter()}
        <div className='task__input-wrapper'>
          <input onBlur={updateTask} onChange={onChange} type='text' defaultValue={name} />
        </div>
        <div className='task-panel'>
          <div onClick={deleteTask} className='task-panel__icon task-panel__icon--delete'>
            <img src={trashIcon} alt='Удалить таск' />
          </div>
          <RangeTime data={data} />
          <ContinueButton name={name} />
        </div>
      </div>

      {isActive && data.time !== undefined && data.time?.length > 1 && <SubTasks data={data.time} name={name} />}
    </li>
  );
};

export default Task;
