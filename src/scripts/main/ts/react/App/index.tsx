import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IsLogged from 'App/components/isLogged';
import Greetings from 'App/components/Greetings';
import { Preloader } from 'App/components/Preloader/index';
import { RootState } from 'Redux/rootReducer';
import { getAllTasks } from 'Utils/helpers/getAllTasks';
import { AppError } from 'Utils/Error';
import { Notifications } from 'Scripts/main/ts/react/components/Notifications/index';
import { createNotify } from 'Utils/helpers/createNotify';

const App: React.FC = () => {
  const { isLoggin, isLoading } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();

  // Todo - доработать обрабочик ошибок
  const errHadler = (err: AppError) => {
    if (err.statusCode === 404) {
      const message = 'Ошибка подключения к серверу. Приносим свои извинения :(';
      dispatch({ type: 'APP_LOG_OUT' });
      createNotify('error', message, dispatch);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('JWT');

    if (token) {
      getAllTasks(errHadler, token, dispatch);
    } else {
      dispatch({ type: 'APP_LOG_OUT' });
    }
  }, []);

  if (isLoading) return <Preloader />;

  return (
    <div className='timer'>
      {isLoggin ? <IsLogged /> : <Greetings />}
      <Notifications />
    </div>
  );
};

export default App;
