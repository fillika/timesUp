import React from 'react';
import Header from 'App/components/Header';
import { TaskList } from 'App/components/TaskList';
import Sidebar from 'App/components/Sidebar';

export const Login = () => {
  return (
    <div className='timer__wrapper'>
      <Header />
      <Sidebar />
      <TaskList />
    </div>
  );
};