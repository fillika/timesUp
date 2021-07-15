import React from 'react';
import { MainTask } from 'App/components/MainTask';
import { TaskType } from 'Types/tasks';
import { time } from 'Utils/Time';
import { useGetTasks } from './useGetTasks';
import { sort } from 'Utils/Sort';

// Utils
const getTotalDayTime = (tasks: TaskType[]): string => {
  let result = 0;
  tasks.forEach(el => (result += el.duration));
  return time.countTotalTime(result);
};

const Timer: React.FC = () => {
  const { databaseTaskList } = useGetTasks();
  const taskArr = sort.sortData(databaseTaskList);

  return (
    <div>
      {taskArr.map(({ date, dateISO, tasks }) => {
        const dateString = new Date(dateISO).toUTCString().slice(0, 12);
        const totalDayTime = getTotalDayTime(tasks);

        if (!tasks.length) {
          return null;
        }

        return (
          <div className='task-section' key={date}>
            <div className='task-section__wrapper'>
              <div>{dateString}</div>

              <div className='task-section__panel'>
                <div className='task-section__total-time'>{totalDayTime}</div>
                <div className='task-section__menu'>...</div>
              </div>
            </div>

            <ul className='task-list'>
              {tasks.map(task => (
                <MainTask data={task} key={task._id} />
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Timer;
