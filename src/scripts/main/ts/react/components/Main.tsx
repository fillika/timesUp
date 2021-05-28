import React from 'react';
import Task from './Task';

const Main: React.FC = () => {
  return (
    <main className='main'>
      <ul className='task-list'>
        <Task />

        <li className='task-list__task'>
          <div className='task task--parent'>Имя таска (родитель)</div>
        </li>
        <li className='task-list__task'>
          <div className='task task--parent'>Имя таска (родитель)</div>
        </li>
        <li className='task-list__task'>
          <div className='task task--parent'>Имя таска (родитель)</div>
        </li>
      </ul>
    </main>
  );
};

export default Main;
