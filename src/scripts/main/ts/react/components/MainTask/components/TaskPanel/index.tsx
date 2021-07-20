import React, { FC, memo, useEffect } from 'react';
import { RangeTime } from 'Scripts/main/ts/react/components/MainTask/components/TaskPanel/components/RangeTime';
import { DeleteIcon } from 'App/components/DeleteIcon';
import { ContinueButton } from 'App/components/ContinueButton';
import { TimeType } from 'Types/tasks';
import { useStyles } from '../../hooks/useStyles';

type TaskPanel = {
  isTyping: boolean;
  name: string;
  start: string;
  stop: string;
  duration?: number;
  timeArr?: TimeType[];
  deleteTask: () => void;
};

export const TaskPanel: FC<TaskPanel> = ({ isTyping, name, start, stop, duration, timeArr, deleteTask }) => {
  const classes = useStyles();

  // useEffect(() => console.log('Render[TaskPanel]'));

  return (
    <div className={classes.taskPanel}>
      <DeleteIcon isTyping={isTyping} onClickHandler={deleteTask} />
      <RangeTime start={start} stop={stop} duration={duration} timeArr={timeArr} />
      <ContinueButton name={name} />
    </div>
  );
};
