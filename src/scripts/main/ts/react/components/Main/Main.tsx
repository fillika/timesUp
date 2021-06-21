import React from 'react';
import Task from '../Task/Task';
import { useGetTasks } from './useGetTasks';

const Main: React.FC = () => {
  const taskArr = useGetTasks();

  return (
    <main className='main'>
      {taskArr.map(({ date, dateISO, tasks }) => {
        const dateString = new Date(dateISO).toUTCString().slice(0, 12);

        if (!tasks.length) {
          return null;
        }

        return (
          <div className='task-section' key={date}>
            <div className='task-section__wrapper'>
              <div>{dateString}</div>
              <div>...</div>
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
