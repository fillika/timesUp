import React, { FC } from 'react';
import { RangeTime } from './components/RangeTime';
import { DeleteIcon } from './components/DeleteIcon';
import { ContinueButton } from './components/ContinueButton';
import { useStyles } from '../../hooks/useStyles';
import { TaskType, TimeType } from 'Types/tasks';

type TaskPanel = {
  isTyping: boolean;
  name: string;
  data: TaskType | TimeType;
  deleteTask: () => void;
  setActive?: React.Dispatch<React.SetStateAction<boolean>>;
};


export const TaskPanel: FC<TaskPanel> = ({ isTyping, name, data, deleteTask, setActive }) => {
  const classes = useStyles();

  // useEffect(() => console.log('Render[TaskPanel]'));

  return (
    <div className={classes.taskPanel}>
      <DeleteIcon isTyping={isTyping} onClickHandler={deleteTask} />
      <RangeTime data={data} setActive={setActive} />
      <ContinueButton name={name} />
    </div>
  );
};
