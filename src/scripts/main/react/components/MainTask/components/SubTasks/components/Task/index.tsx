import React, { useState } from 'react';
import { useStateTask } from '../../hooks/useStateTask';
import { useStyles } from 'App/components/MainTask/hooks/useStyles';
import { TaskPanel } from '../../../TaskPanel';
import { TimeType } from 'Types/tasks';
import Collapse from '@material-ui/core/Collapse';

type Task = {
  name: string;
  data: TimeType;
};

export const Task: React.FC<Task> = ({ name, data }) => {
  const [isTyping, value, updateTask, deleteTask, onChange, onKeyPress] = useStateTask(name, data._id);
  const [isActive, setIsACtive] = useState(true);
  const classes = useStyles();

  // console.log(data);

  return (
    <Collapse in={isActive} onExited={deleteTask} timeout={isActive ? 0 : 400} unmountOnExit>
      <div className={classes.taskChild}>
        <input onChange={onChange} onBlur={updateTask} onKeyPress={onKeyPress} type='text' value={value} />
        <TaskPanel data={data} isTyping={isTyping} name={name} deleteTask={() => setIsACtive(false)} />
      </div>
    </Collapse>
  );
};
