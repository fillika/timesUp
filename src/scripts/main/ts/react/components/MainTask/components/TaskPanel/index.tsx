import React, { FC, memo, useContext, useEffect } from 'react';
import { RangeTime } from 'Scripts/main/ts/react/components/MainTask/components/TaskPanel/components/RangeTime';
import { DeleteIcon } from 'App/components/DeleteIcon';
import { ContinueButton } from 'App/components/ContinueButton';
import { useStyles } from '../../hooks/useStyles';

type TaskPanel = {
  isTyping: boolean;
  name: string;
  deleteTask: () => void;
};

export const TaskPanel: FC<TaskPanel> = ({ isTyping, name, deleteTask }) => {
  const classes = useStyles();

  // useEffect(() => console.log('Render[TaskPanel]'));

  return (
    <div className={classes.taskPanel}>
      <DeleteIcon isTyping={isTyping} onClickHandler={deleteTask} />
      <RangeTime />
      <ContinueButton name={name} />
    </div>
  );
};
