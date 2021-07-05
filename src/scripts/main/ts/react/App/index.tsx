import React, { useEffect } from 'react';
import { Login } from 'App/components/Login';
import Greetings from 'App/components/Greetings';
import { Preloader } from 'App/components/Preloader';
import { Notifications } from 'App/components/Notifications';
import { useLoggin } from './hooks/useLoggin';
import { Switch, Route, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'Redux/rootReducer';

const App: React.FC = () => {
  const [isLoggin, isLoading] = useLoggin();
  const { app } = useSelector((state: RootState) => state);
  let history = useHistory();

  useEffect(() => {
    console.log(app.isLoggin);
    
    if (!app.isLoggin) {
      history.push('/login');
    }
  }, []);

  if (isLoading) return <Preloader />;

  return (
    <div className='timer'>
      <Switch>
        <Route path='/'>
          <Login />
        </Route>

        <Route path='/login'>
          <Greetings />
        </Route>
      </Switch>
      <Notifications />
    </div>
  );
};

export default App;
