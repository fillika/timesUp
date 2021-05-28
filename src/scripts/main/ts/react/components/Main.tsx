import React from 'react';
import Task from './Task';

const Main: React.FC = () => {
  return (
    <main className='main'>
      <ul className='task-list'>
        <Task />
        <Task />
        <Task />
        <Task />
      </ul>
    </main>
  );
};

export default Main;
