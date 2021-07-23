import React from 'react';
import { TaskListInsideOneDay } from './components/TaskListInsideOneDay';
import { SortedTask } from 'Types/tasks';

export const DayList: React.FC<{ taskList: SortedTask[] }> = ({ taskList }) => {
  return (
    <div>
      {taskList.map(({ dateISO, mainTaskList }) => {
        if (!mainTaskList.length) {
          return null;
        }

        return <TaskListInsideOneDay key={dateISO} taskList={mainTaskList} dateISO={dateISO} />;
      })}
    </div>
  );
};
