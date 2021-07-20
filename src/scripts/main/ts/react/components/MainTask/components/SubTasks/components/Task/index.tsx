import React from 'react';
import { useStateTask } from '../../hooks/useStateTask';
import { useStyles } from 'App/components/MainTask/hooks/useStyles';
import { TaskPanel } from '../../../TaskPanel';

type Task = {
  _id: string;
  name: string;
  start: string;
  stop: string;
};

export const Task: React.FC<Task> = ({ name, start, stop, _id }) => {
  const [isTyping, value, updateTask, deleteTask, onChange, onKeyPress] = useStateTask(name, _id);

  const classes = useStyles();

  return (
    <div className={classes.taskChild}>
      <input onChange={onChange} onBlur={updateTask} onKeyPress={onKeyPress} type='text' value={value} />

      <TaskPanel isTyping={isTyping} name={name} start={start} stop={stop} deleteTask={deleteTask} />
    </div>
  );
};
