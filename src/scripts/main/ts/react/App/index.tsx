import React from 'react';
import { Login } from 'App/components/Login';
import Greetings from 'App/components/Greetings';
import { Preloader } from 'App/components/Preloader';
import { Notifications } from 'App/components/Notifications';
import { useLoggin } from './hooks/useLoggin';

const App: React.FC = () => {
  const [isLoggin, isLoading] = useLoggin();

  if (isLoading) return <Preloader />;

  return (
    <div className='timer'>
      {isLoggin ? <Login /> : <Greetings />}
      <Notifications />
    </div>
  );
};

export default App;
