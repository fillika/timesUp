import React from 'react';

import { ParentTask } from './components/ParentTask';
import { DayResultHead } from './components/DayResultHead';
import { StyledDayResult } from './style';
import { SortedTask } from 'Types/tasks';

export const DayResult: React.FC<{ sortedTask: SortedTask }> = ({ sortedTask }) => {
  return (
    <StyledDayResult>
      <DayResultHead date={sortedTask.date} />

      <ul>
        {sortedTask.mainTaskList.map(task => (
          <ParentTask key={task._id} task={task} />
        ))}
      </ul>
    </StyledDayResult>
  );
};
