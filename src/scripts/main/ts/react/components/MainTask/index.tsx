import React, { memo } from 'react';
import _isEqual from 'lodash/isEqual';
import { SubTasks } from './components/SubTasks';
import { Counter } from './components/Counter';
import { TaskInput } from './components/TaskInput';
import { TaskPanel } from './components/TaskPanel';
import { TaskType } from 'Types/tasks';
import { useHandlers } from './hooks/useHandlers';
import { useStyles } from './hooks/useStyles';

type TaskData = {
  data: TaskType;
};

export const MainTask = memo<TaskData>(
  ({ data }) => {
    const [isActive, isTyping, name, setActive, setTyping, deleteTask] = useHandlers(data);
    const classes = useStyles();

    return (
      <li className={classes.task}>
        <div className={classes.taskParent}>
          <Counter isActive={isActive} time={data.time} onClick={setActive} />
          <TaskInput data={data} setActive={setActive} setTyping={setTyping} />
          <TaskPanel data={data} isTyping={isTyping} name={name} deleteTask={deleteTask} />
        </div>

        <SubTasks isActive={isActive} data={data.time} name={data.name} />
      </li>
    );
  },
  (prev, next) => _isEqual(prev.data, next.data)
);
