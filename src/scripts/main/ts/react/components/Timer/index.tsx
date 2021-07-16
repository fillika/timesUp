import React from 'react';
import _ from 'lodash';
import { TaskType } from 'Types/tasks';
import { time } from 'Utils/Time';
import { useGetTasks } from './useGetTasks';
import { DayList } from './components/DayList';

// Utils
const getTotalDayTime = (tasks: TaskType[]): string => {
  let result = 0;
  tasks.forEach(el => (result += el.duration));
  return time.countTotalTime(result);
};

const Timer: React.FC = () => {
  const { sortedTaskList } = useGetTasks();

  return (
    <div>
      {sortedTaskList.map(({ dateISO, mainTaskList }) => {
        if (!mainTaskList.length) {
          return null;
        }

        const keyID = _.uniqueId('dayTask_');
        const dateString = new Date(dateISO).toUTCString().slice(0, 12);
        const totalDayTime = getTotalDayTime(mainTaskList);

        return <DayList key={keyID} taskList={mainTaskList} dateString={dateString} totalDayTime={totalDayTime} />;
      })}
    </div>
  );
};

export default Timer;
