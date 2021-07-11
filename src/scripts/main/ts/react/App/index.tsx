import React, { useEffect } from 'react';
import { Root } from 'Scripts/main/ts/react/components/Root';
import Greetings from 'App/components/Greetings';
import { Preloader } from 'App/components/Preloader';
import { Notifications } from 'App/components/Notifications';
import { ForgotPassword } from 'App/components/ForgotPassword';
import { useLoggin } from './hooks/useLoggin';
import { Switch, Route, Redirect } from 'react-router-dom';

const App: React.FC = () => {
  const [isLoggin, isLoading] = useLoggin();

  useEffect(() => {}, [isLoggin]);

  if (isLoading) return <Preloader />;

  return (
    <div className='timer'>
      <Switch>
        <Route path='/login'>
          {!isLoggin ? <Greetings /> : <Redirect to='/' />}
        </Route>

        <Route path='/forgotPassword/:id'>
          {!isLoggin ? <ForgotPassword /> : <Redirect to='/' />}
        </Route> 

        <Route path='/forgotPassword'>
          {!isLoggin ? <ForgotPassword /> : <Redirect to='/' />}
        </Route>  

        <Route path='/'>{isLoggin ? <Root /> : <Redirect to='/login' />}</Route>

        <Redirect to='/' />
      </Switch>

      <Notifications />
    </div>
  );
};

export default App;
