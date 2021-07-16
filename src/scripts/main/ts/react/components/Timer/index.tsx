import React, { FC, useMemo } from 'react';
import { MainTask } from 'App/components/MainTask';
import { TaskType } from 'Types/tasks';
import { time } from 'Utils/Time';
import { useGetTasks } from './useGetTasks';
import _ from 'lodash';

// Utils
const getTotalDayTime = (tasks: TaskType[]): string => {
  let result = 0;
  tasks.forEach(el => (result += el.duration));
  return time.countTotalTime(result);
};

const DayList: FC<{ dateString: string; totalDayTime: string; taskList: TaskType[] }> = ({
  dateString,
  totalDayTime,
  taskList,
}) => {
  return (
    <div className='task-section'>
      <div className='task-section__wrapper'>
        <div>{dateString}</div>

        <div className='task-section__panel'>
          <div className='task-section__total-time'>{totalDayTime}</div>
          <div className='task-section__menu'>
            ...
          </div>
        </div>
      </div>

      <ul className='task-list'>
        {taskList.map(task => {
          const memorizedTask = useMemo(() => task, []);
          return <MainTask data={memorizedTask} key={task._id} />;
        })}
      </ul>
    </div>
  );
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
