import React from 'react';
import IsLogged from 'App/components/isLogged';
import Greetings from 'App/components/Greetings';
import { Preloader } from 'App/components/Preloader/index';
import { Notifications } from 'Scripts/main/ts/react/components/Notifications/index';
import { useLoggin } from './hooks/useLoggin';

const App: React.FC = () => {
  const [isLoggin, isLoading] = useLoggin();

  if (isLoading) return <Preloader />;

  return (
    <div className='timer'>
      {isLoggin ? <IsLogged /> : <Greetings />}
      <Notifications />
    </div>
  );
};

export default App;
