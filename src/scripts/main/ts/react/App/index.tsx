import React, { useEffect, useState, KeyboardEvent } from 'react';
import { Root } from 'Scripts/main/ts/react/components/Root';
import Greetings from 'App/components/Greetings';
import { Preloader } from 'App/components/Preloader';
import { Notifications } from 'App/components/Notifications';
import { ForgotPassword } from 'App/components/ForgotPassword';
import { ConfirmRegister } from 'App/components/ConfirmRegister';
import { useLoggin } from './hooks/useLoggin';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Cookie } from 'App/components/Cookie';
import { useStyles } from 'App/components/Timer/hooks/useStyles';

const App: React.FC = () => {
  const [isLoggin, isLoading] = useLoggin();
  const classes = useStyles();

  useEffect(() => {}, [isLoggin]);

  if (isLoading) return <Preloader />;

  return (
    <div className={classes.root}>
      <Switch>
        <Route path='/login'>{!isLoggin ? <Greetings /> : <Redirect to='/' />}</Route>

        <Route path='/updatePassword/:id'>{!isLoggin ? <ForgotPassword /> : <Redirect to='/' />}</Route>

        <Route path='/confirmRegister/:token'>{!isLoggin ? <ConfirmRegister /> : <Redirect to='/' />}</Route>

        <Route path='/forgotPassword'>{!isLoggin ? <ForgotPassword /> : <Redirect to='/' />}</Route>

        <Route path='/'>{isLoggin ? <Root /> : <Redirect to='/login' />}</Route>

        <Redirect to='/' />
      </Switch>

      <Notifications />
      <Cookie />
    </div>
  );
};

export default App;
