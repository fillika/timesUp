import React from 'react';
import Header from 'App/components/Header';
import Main from 'App/components/Main';
import Sidebar from 'App/components/Sidebar';

export const Login = () => {
  return (
    <div className='timer__wrapper'>
      <Header />
      <Sidebar />
      <Main />
    </div>
  );
};