import React from 'react';
import Task from '../Task/Task';
import { useGetTasks } from './useGetTasks';
import { time } from 'Utils/Time';
import { TaskType } from 'Types/tasks';

const Main: React.FC = () => {
  const { taskArr } = useGetTasks();

  return (
    <main className='main'>
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
                <Task data={task} key={task._id} />
              ))}
            </ul>
          </div>
        );
      })}
    </main>
  );
};

export default Main;

// Utils
function getTotalDayTime(tasks: TaskType[]): string {
  let result = 0;
  tasks.forEach(el => (result += el.duration));
  return time.countTotalTime(result);
}
