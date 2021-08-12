import React, { FC, useState } from 'react';
import { DeleteDialog } from 'App/components/Dialog/components/DeleteDialog';
import { RangeTime } from './components/RangeTime';
import { DeleteIcon } from './components/DeleteIcon';
import { ContinueButton } from './components/ContinueButton';
import { TaskType, TimeType } from 'Types/tasks';
import { useStyles } from '../../hooks/useStyles';

type TaskPanel = {
  isTyping: boolean;
  name: string;
  data: TaskType | TimeType;
  deleteTask: () => void;
  setActive?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TaskPanel: FC<TaskPanel> = ({ isTyping, name, data, deleteTask, setActive }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // useEffect(() => console.log('Render[TaskPanel]'));

  return (
    <>
      <div className={classes.taskPanel}>
        {/* <DeleteIcon isTyping={isTyping} onClickHandler={deleteTask} /> */}
        <DeleteIcon isTyping={isTyping} onClickHandler={handleOpen} />
        <RangeTime data={data} setActive={setActive} />
        <ContinueButton name={name} />
      </div>
      <DeleteDialog open={open} name={name} closeHandler={handleClose} deleteHandler={deleteTask} />
    </>
  );
};
