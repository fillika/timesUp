import React, { useState } from 'react';
import { StyledCounter, StyledParentTask } from './style';
import { TaskType } from 'Types/tasks';
import { ChildList } from '../ChildList/index';
import Collapse from '@material-ui/core/Collapse';

export const ParentTask: React.FC<{ task: TaskType }> = ({ task }) => {
  const [isActive, setActive] = useState(false);
  const clickHandler = () => setActive(!isActive);

  return (
    <li>
      <StyledParentTask>
        {task.time === undefined ? null : <StyledCounter onClick={clickHandler}>{task.time.length}</StyledCounter>}

        <div className='name'>{task.name}</div>
        <div>
          <span className='timeRange'>10:20:06&nbsp;-&nbsp;11:04:07</span>
          <span className='totalTime'>00:24:09</span>
        </div>
      </StyledParentTask>

      <Collapse in={isActive} timeout='auto' unmountOnExit>
        <ChildList name={task.name} time={task.time} />
      </Collapse>
    </li>
  );
};
