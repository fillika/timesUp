import React from 'react';
import Task from '../Task/Task';
import { useGetTasks } from './useGetTasks';

const Main: React.FC = () => {
  const url = 'http://localhost:22222/api/v1/tasks';
  const taskArr = useGetTasks(url);

  return (
    <main className='main'>
      <ul className='task-list'>
        {taskArr.map(task => (
          <Task data={task} key={task._id} />
        ))}
      </ul>
    </main>
  );
};

export default Main;
