import React, { memo } from 'react';
import { TaskType } from 'Types/tasks';
import { SubTasks } from 'App/components/SubTasks';
import { useHandlers } from './hooks/useHandlers';
import { Counter } from './components/Counter';
import { TaskInput } from './components/TaskInput';
import { TaskPanel } from './components/TaskPanel';
import _ from 'lodash';

type TaskData = {
  data: TaskType;
};

export const MainTask = memo<TaskData>(
  ({ data }) => {
    const [isUnmounting, isActive, isTyping, name, setActive, setTyping, deleteTask] = useHandlers(data);

    return (
      <li className={`task-list__task ${isUnmounting ? 'task-list__task--unmounting' : ''}`}>
        <div className='task task--parent'>
          <Counter isActive={isActive} time={data.time} onClick={setActive} />
          <TaskInput data={data} setActive={setActive} setTyping={setTyping} />
          <TaskPanel isTyping={isTyping} name={name} data={data} deleteTask={deleteTask} />
        </div>

        {isActive && data.time !== undefined && data.time.length > 1 && <SubTasks data={data.time} name={data.name} />}
      </li>
    );
  },
  (prev, next) => {
    return _.isEqual(prev.data, next.data);
  }
);
