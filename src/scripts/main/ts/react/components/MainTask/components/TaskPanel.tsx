import React, { memo, useEffect } from 'react';
import { RangeTime } from 'App/components/RangeTime';
import { DeleteIcon } from 'App/components/DeleteIcon';
import { ContinueButton } from 'App/components/ContinueButton';
import { TaskType } from 'Types/tasks';

type TaskPanel = {
  isTyping: boolean;
  name: string;
  data: TaskType;
  deleteTask: () => void;
};

export const TaskPanel = memo<TaskPanel>(({ isTyping, name, data, deleteTask }) => {
  // useEffect(() => console.log('Render[TaskPanel]'));

  return (
    <div className='task-panel'>
      <DeleteIcon isTyping={isTyping} onClickHandler={deleteTask} />
      <RangeTime data={data} />
      <ContinueButton name={name} />
    </div>
  );
});
