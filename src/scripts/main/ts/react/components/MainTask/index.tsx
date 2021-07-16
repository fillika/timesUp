import React, { memo } from 'react';
import { TaskType } from 'Types/tasks';
import { SubTasks } from 'App/components/SubTasks';
import { useHandlers } from './hooks/useHandlers';
import { Counter } from './Counter';
import { TaskInput } from './components/TaskInput';
import { TaskPanel } from './components/TaskPanel';

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

        {isActive && data.time !== undefined && data.time.length > 1 && <SubTasks data={data.time} name={name} />}
      </li>
    );
  },
  (prev, next) => (prev.data === next.data ? true : false)
);
