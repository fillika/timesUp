import React from 'react';
import { useStateTask } from '../../hooks/useStateTask';
import { useStyles } from 'App/components/MainTask/hooks/useStyles';
import { TaskPanel } from '../../../TaskPanel';
import { TimeType } from 'Types/tasks';

type Task = {
  name: string;
  data: TimeType
};

export const Task: React.FC<Task> = ({ name, data }) => {
  const [isTyping, value, updateTask, deleteTask, onChange, onKeyPress] = useStateTask(name, data._id);

  const classes = useStyles();

  return (
    <div className={classes.taskChild}>
      <input onChange={onChange} onBlur={updateTask} onKeyPress={onKeyPress} type='text' value={value} />
      <TaskPanel data={data} isTyping={isTyping} name={name} deleteTask={deleteTask} />
    </div>
  );
};
